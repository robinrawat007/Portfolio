"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import AtlasChatIcon from "@/components/AtlasChatIcon";
import { API_CHAT_URL, ATLAS_WEBHOOK_URL, USE_WEBHOOKS } from "@/lib/webhooks";

const GREETING =
  "Hey! I'm Atlas — Robin's AI assistant. Ask me anything about his work, skills, or services.";

const SUGGESTED_PROMPTS = [
  "Who is Robin and what does he do?",
  "What can Robin build for me?",
  "What’s his experience with AI?",
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

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, open]);

  const openPanel = () => {
    if (open) return;
    setOpen(true);
    setShowUnreadDot(false);
    ensureSession();
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [
        {
          role: "atlas",
          text: GREETING,
          t: new Date(),
        },
      ];
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
      // Optimistic assistant message to stream into (keeps UI/styling intact).
      const assistantMsg = { role: "atlas", text: "", t: new Date() };
      setMessages((m) => [...m, assistantMsg]);

      const apiPayload = {
        message: text,
        session_id: ensureSession(),
        messages: messages
          .filter((m) => m.role === "user" || m.role === "atlas")
          .slice(-10)
          .map((m) => ({
            role: m.role === "atlas" ? "assistant" : "user",
            content: m.text,
          })),
      };

      const webhookPayload = { message: text, session_id: ensureSession() };

      // Prefer in-app API when available; fall back to webhook only if needed.
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
          // Fallback for static exports / environments without API routes.
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
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      if (USE_WEBHOOKS || res.url?.includes("n8n.cloud/webhook")) {
        const reply = await parseAtlasResponse(res);
        if (!reply) throw new Error("no reply");

        setMessages((m) => {
          const next = [...m];
          // Replace the last empty assistant message (if present), otherwise append.
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
              if (next[i]?.role === "atlas") {
                next[i] = { ...next[i], text: full };
                break;
              }
            }
            return next;
          });
        }
        if (!full.trim()) throw new Error("empty reply");
      }
    } catch (e) {
      setErrorBanner(
        e?.message ||
          "Something went wrong. Try again, or reach Robin directly at robinrawat37@gmail.com"
      );
      // Remove the optimistic assistant message if it stayed empty.
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div
      className="fixed right-6 z-50 flex flex-col-reverse items-end gap-3 pointer-events-none [&>*]:pointer-events-auto bottom-6 pb-[max(0px,env(safe-area-inset-bottom))]"
    >
      <motion.button
        type="button"
        onClick={openPanel}
        title="Ask Atlas anything about Robin"
        aria-label="Open AI assistant chat"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="group relative flex min-h-[52px] min-w-[52px] items-center justify-center rounded-2xl border-0 bg-transparent p-1 text-cyan-400 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:min-h-[60px] sm:min-w-[60px]"
        whileTap={{ scale: 0.94 }}
      >
        <span
          className={`relative z-10 block text-cyan-400 transition-[filter,transform] duration-300 group-hover:scale-110 group-hover:!animate-none group-hover:drop-shadow-[0_0_22px_rgba(34,211,238,1)] ${
            !open ? "animate-atlas-fab-idle" : "drop-shadow-[0_0_14px_rgba(34,211,238,0.85)]"
          }`}
        >
          <AtlasChatIcon className="h-[3.25rem] w-[3.25rem] sm:h-16 sm:w-16" />
        </span>
        {showUnreadDot && !open && (
          <span
            className="absolute -right-0.5 top-0 z-20 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] ring-2 ring-slate-950"
            aria-hidden
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="atlas-dialog-title"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2 flex h-[min(85vh,560px)] w-[calc(100vw-32px)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#0a0a0c] shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_24px_48px_rgba(0,0,0,0.65)]"
          >
            {/* Top bar — reference: thin nav */}
            <div className="flex shrink-0 items-center gap-3 border-b border-cyan-500/15 bg-[#08080a] px-3 py-2.5">
              <span className="text-slate-600" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              </span>
              <span className="flex-1 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                AI assistant
              </span>
              <span
                className="rounded-full border border-cyan-500/20 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-400/90"
                title="Assistant"
              >
                Atlas
              </span>
            </div>

            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-cyan-500/10 bg-gradient-to-b from-cyan-500/8 to-transparent px-4 py-3">
              <div className="min-w-0 pt-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-500/70">
                  Need help?
                </p>
                <h2
                  id="atlas-dialog-title"
                  className="font-heading text-lg font-bold tracking-tight text-cyan-100"
                >
                  Atlas
                </h2>
                <p className="text-xs text-slate-500">Robin&apos;s AI assistant</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full border border-cyan-500/25 text-cyan-300/90 transition-colors hover:bg-cyan-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Close chat"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={listRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#060608] px-3 py-4"
            >
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}-${msg.t?.getTime?.() ?? i}`}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md border border-cyan-400/35 bg-gradient-to-br from-cyan-600/25 to-cyan-500/10 text-cyan-50 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                        : "rounded-bl-md border border-white/[0.08] bg-[#111114] text-slate-200"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p
                      className={`mt-1.5 text-[10px] tabular-nums ${
                        msg.role === "user" ? "text-cyan-200/60" : "text-slate-500"
                      }`}
                    >
                      {formatTime(msg.t instanceof Date ? msg.t : new Date(msg.t))}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-cyan-500/15 bg-[#111114] px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:140ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:280ms]" />
                  </div>
                </div>
              )}

              {errorBanner && (
                <p
                  className="rounded-xl border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-200"
                  role="alert"
                >
                  {errorBanner}
                </p>
              )}
            </div>

            {!suggestedHidden && messages.length <= 1 && (
              <div className="flex shrink-0 flex-wrap gap-2 border-t border-cyan-500/10 bg-[#08080a] px-3 py-2.5">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => sendMessage(p)}
                    disabled={loading}
                    className="rounded-full border border-cyan-500/25 bg-[#0f1114] px-3 py-1.5 text-xs text-cyan-100/85 transition-colors hover:border-cyan-400/45 hover:bg-cyan-500/10 disabled:opacity-50"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            <div className="flex shrink-0 gap-2 border-t border-cyan-500/15 bg-[#08080a] p-3">
              <label htmlFor="atlas-input" className="sr-only">
                Message to Atlas
              </label>
              <input
                ref={inputRef}
                id="atlas-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={loading}
                placeholder="Message…"
                className="min-w-0 flex-1 rounded-xl border border-cyan-500/20 bg-[#121214] px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-cyan-400/45 focus:outline-none focus:ring-2 focus:ring-cyan-500/25"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-500 text-[#0a0a0c] shadow-[0_0_18px_rgba(34,211,238,0.35)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-35 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                aria-label="Send message"
              >
                <FaPaperPlane className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
