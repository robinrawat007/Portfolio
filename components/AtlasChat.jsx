"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import AtlasChatIcon from "@/components/AtlasChatIcon";
import { API_CHAT_URL, ATLAS_WEBHOOK_URL, USE_WEBHOOKS } from "@/lib/webhooks";

const GREETING =
  "Hey, I’m Atlas — Robin’s AI assistant. I know everything he does… probably better than he does. Go ahead, ask me anything.";

const SUGGESTED_PROMPTS = [
  "Who is Robin and what does he do?",
  "What can Robin build for me?",
  "What's his experience with AI?",
  "How do I get in touch with Robin?",
];

const FETCH_TIMEOUT_MS = 15_000;

function formatTime(d) {
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

async function parseAtlasResponse(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    const data = JSON.parse(text);
    if (typeof data?.reply === "string") return data.reply;
    if (typeof data?.data?.reply === "string") return data.data.reply;
    if (typeof data?.message === "string") return data.message;
  } catch {
    return text.trim() || null;
  }
  return null;
}
export default function AtlasChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [suggestedHidden, setSuggestedHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState(null);
  const [showUnreadDot, setShowUnreadDot] = useState(true);
  const sessionIdRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target)) {
        // Only close if we didn't click the FAB
        const fab = document.getElementById('atlas-fab');
        if (fab && fab.contains(e.target)) return;
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const ensureSession = useCallback(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    return sessionIdRef.current;
  }, []);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    });
  };

  useEffect(() => { scrollToBottom(); }, [messages, loading, open]);

  const openPanel = () => {
    if (open) return;
    setOpen(true);
    setShowUnreadDot(false);
    ensureSession();
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [{ role: "atlas", text: GREETING, t: new Date() }];
    });
  };

  const sendMessage = async (raw) => {
    const text = typeof raw === "string" ? raw.trim() : input.trim();
    if (!text || loading) return;

    setSuggestedHidden(true);
    setErrorBanner(null);
    setInput("");

    const userMsg = { role: "user", text, t: new Date() };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const assistantMsg = { role: "atlas", text: "", t: new Date() };
      setMessages((m) => [...m, assistantMsg]);

      const apiPayload = {
        message: text,
        session_id: ensureSession(),
        messages: messages
          .filter((m) => m.role === "user" || m.role === "atlas")
          .slice(-10)
          .map((m) => ({ role: m.role === "atlas" ? "assistant" : "user", content: m.text })),
      };
      const webhookPayload = { message: text, session_id: ensureSession() };

      const tryFetch = async (url, payload) =>
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

      let res;
      if (USE_WEBHOOKS) {
        res = await tryFetch(ATLAS_WEBHOOK_URL, webhookPayload);
      } else {
        try {
          res = await tryFetch(API_CHAT_URL, apiPayload);
          if (res.status === 404) throw new Error("api route missing");
        } catch {
          res = await tryFetch(ATLAS_WEBHOOK_URL, webhookPayload);
        }
      }

      clearTimeout(timeoutId);

      if (!res.ok) {
        let msg = "Request failed";
        try {
          const data = await res.json();
          msg = data?.error || msg;
          if (data?.details) msg = `${msg} (${data.details})`;
        } catch { /* ignore */ }
        throw new Error(msg);
      }

      if (USE_WEBHOOKS || res.url?.includes("n8n.cloud/webhook")) {
        const reply = await parseAtlasResponse(res);
        if (!reply) throw new Error("no reply");
        setMessages((m) => {
          const next = [...m];
          for (let i = next.length - 1; i >= 0; i--) {
            if (next[i]?.role === "atlas" && next[i]?.text === "") {
              next[i] = { ...next[i], text: reply, t: new Date() };
              return next;
            }
          }
          next.push({ role: "atlas", text: reply, t: new Date() });
          return next;
        });
      } else {
        if (!res.body) throw new Error("no stream");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let full = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;
          full += chunk;
          setMessages((m) => {
            const next = [...m];
            for (let i = next.length - 1; i >= 0; i--) {
              if (next[i]?.role === "atlas") { next[i] = { ...next[i], text: full }; break; }
            }
            return next;
          });
        }
        if (!full.trim()) throw new Error("empty reply");
      }
    } catch (e) {
      setErrorBanner(
        e?.message || "Something went wrong. Try again, or reach Robin directly at robinrawat37@gmail.com"
      );
      setMessages((m) => {
        const next = [...m];
        const last = next[next.length - 1];
        if (last?.role === "atlas" && last?.text === "") next.pop();
        return next;
      });
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const [isHovered, setIsHovered] = useState(false);
  const blinkTimeline = useRef(null);

  // Reset hover state when panel opens/closes to prevent stale hover UI
  useEffect(() => {
    if (open) setIsHovered(false);
  }, [open]);

  useEffect(() => {
    if (isHovered && !open) {
      // Trigger eye blink periodically
      blinkTimeline.current = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      blinkTimeline.current
        .to(".atlas-eyes", { scaleY: 0, duration: 0.1, transformOrigin: "center 24px" })
        .to(".atlas-eyes", { scaleY: 1, duration: 0.1 });
    } else {
      blinkTimeline.current?.kill();
    }
    return () => blinkTimeline.current?.kill();
  }, [isHovered, open]);

  return (
    <div className="fixed right-6 z-50 flex flex-col-reverse items-end gap-3 pointer-events-none [&>*]:pointer-events-auto bottom-6 pb-[max(0px,env(safe-area-inset-bottom))]">
      {/* FAB */}
      <motion.button
        id="atlas-fab"
        type="button"
        onClick={openPanel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Ask Atlas anything about Robin"
        aria-label="Open AI assistant chat"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="group relative flex min-h-[52px] min-w-[52px] items-center justify-center rounded-2xl border-0 bg-transparent p-1 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 sm:min-h-[60px] sm:min-w-[60px]"
        style={{ color: 'var(--neon-yellow)', '--tw-ring-color': 'var(--neon-yellow)' }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence>
          {isHovered && !open && (
            <motion.div
              initial={{ opacity: 0, x: -10, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, y: -40, scale: 1 }}
              exit={{ opacity: 0, x: -5, y: -20, scale: 0.8 }}
              className="absolute right-full mr-4 pointer-events-none drop-shadow-[0_0_15px_rgba(217,255,0,0.4)]"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <Image
                  src="/joey.png"
                  alt="Joey - How you doin?"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <span
          className={`relative z-10 block transition-[filter,transform] duration-300 group-hover:scale-110 group-hover:!animate-none ${!open ? "animate-atlas-fab-idle" : ""
            }`}
          style={open ? { filter: 'drop-shadow(0 0 14px rgba(217,255,0,0.85))' } : {}}
        >
          <AtlasChatIcon className="h-[3.25rem] w-[3.25rem] sm:h-16 sm:w-16" />
        </span>
        {showUnreadDot && !open && (
          <span
            className="absolute -right-0.5 top-0 z-20 h-2.5 w-2.5 rounded-full ring-2"
            style={{ background: 'var(--neon-green)', boxShadow: '0 0 10px var(--neon-green)', ringColor: 'var(--bg)' }}
            aria-hidden
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="atlas-dialog-title"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2 flex h-[min(85vh,560px)] w-[calc(100vw-32px)] max-w-[400px] flex-col overflow-hidden rounded-3xl"
            style={{
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(217,255,0,0.15)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.8)',
            }}
          >
            {/* Minimal Header */}
            <div className="flex shrink-0 items-center justify-between gap-3 px-5 py-4 pb-2">
              <div className="min-w-0">
                <h2 id="atlas-dialog-title" className="font-heading text-lg font-bold tracking-tight text-white">
                  Atlas
                </h2>
                <p className="text-[11px] font-medium tracking-wide uppercase" style={{ color: 'rgba(217,255,0,0.6)' }}>AI Assistant</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2"
                style={{ border: '1px solid rgba(217,255,0,0.2)', color: 'rgba(217,255,0,0.8)', '--tw-ring-color': 'var(--neon-yellow)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(217,255,0,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                aria-label="Close chat"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4 scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  key={`${msg.role}-${i}-${msg.t?.getTime?.() ?? i}`}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[88%] rounded-[1.25rem] px-4 py-3 text-[13px] leading-relaxed shadow-sm"
                    style={msg.role === "user"
                      ? { background: 'rgba(217,255,0,0.15)', color: 'white', borderRadius: '1.25rem 1.25rem 0.25rem 1.25rem' }
                      : { background: 'rgba(255,255,255,0.05)', color: '#d4d4d4', borderRadius: '1.25rem 1.25rem 1.25rem 0.25rem' }
                    }
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className="mt-2 text-[9px] tabular-nums tracking-wider" style={{ color: msg.role === "user" ? 'rgba(217,255,0,0.6)' : '#666' }}>
                      {formatTime(msg.t instanceof Date ? msg.t : new Date(msg.t))}
                    </p>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3 bg-white/5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: 'var(--neon-yellow)' }} />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:150ms]" style={{ background: 'var(--neon-yellow)' }} />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:300ms]" style={{ background: 'var(--neon-yellow)' }} />
                  </div>
                </motion.div>
              )}

              {errorBanner && (
                <p className="rounded-xl border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-200" role="alert">
                  {errorBanner}
                </p>
              )}
            </div>

            {/* Suggested prompts - Made completely minimal */}
            {!suggestedHidden && messages.length <= 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex shrink-0 flex-wrap gap-2 px-5 py-2 pb-4">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => sendMessage(p)}
                    disabled={loading}
                    className="rounded-full px-4 py-2 text-[11px] font-medium transition-all hover:bg-white/10 disabled:opacity-50"
                    style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {p}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Input */}
            <div className="flex shrink-0 gap-2 px-5 pb-5 pt-2">
              <label htmlFor="atlas-input" className="sr-only">Message to Atlas</label>
              <input
                ref={inputRef}
                id="atlas-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={loading}
                placeholder="Ask Atlas..."
                className="min-w-0 flex-1 rounded-full px-5 py-3 text-[13px] focus:outline-none transition-all placeholder:text-neutral-500"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  caretColor: 'var(--neon-yellow)',
                }}
                onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.08)'; }}
                onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
                style={{
                  background: 'var(--neon-yellow)',
                  color: '#000',
                  boxShadow: '0 0 15px rgba(217,255,0,0.2)',
                }}
                aria-label="Send message"
              >
                <FaPaperPlane className="h-3.5 w-3.5 ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
