"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
import { ATLAS_WEBHOOK_URL } from "@/lib/webhooks";

const GREETING =
  "Hey! I'm Atlas — Robin's AI assistant. Ask me anything about his work, skills, or services.";

const SUGGESTED_PROMPTS = [
  "What does Robin build?",
  "See services & pricing",
  "Is Robin available?",
  "Tell me about his projects",
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
  const pulseDone = useRef(false);

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
      const res = await fetch(ATLAS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          session_id: ensureSession(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("bad status");

      const reply = await parseAtlasResponse(res);
      if (!reply) throw new Error("no reply");

      setMessages((m) => [...m, { role: "atlas", text: reply, t: new Date() }]);
    } catch {
      setErrorBanner(
        "Something went wrong. Try again, or reach Robin directly at robinrawat37@gmail.com"
      );
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
    <div className="fixed right-6 z-[55] flex flex-col-reverse items-end gap-3 bottom-28 max-[1023px]:bottom-36 pointer-events-none [&>*]:pointer-events-auto">
      <motion.button
        type="button"
        onClick={openPanel}
        title="Ask Atlas anything about Robin"
        aria-label="Open Atlas chat"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="relative w-14 h-14 min-w-[56px] min-h-[56px] rounded-full bg-gradient-to-br from-[#7B4FE0] to-[#2DCFCF] text-white shadow-lg shadow-[#7B4FE0]/30 flex items-center justify-center hover:scale-105 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        whileTap={{ scale: 0.95 }}
      >
        {!pulseDone.current && !open && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#2DCFCF]/60 pointer-events-none"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.35 }}
            transition={{ duration: 1.2, repeat: 2, ease: "easeOut" }}
            onAnimationComplete={() => {
              pulseDone.current = true;
            }}
          />
        )}
        <FaRobot className="w-7 h-7" aria-hidden />
        {showUnreadDot && !open && (
          <span
            className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950"
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
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-1 w-[calc(100vw-32px)] max-w-[380px] h-[min(85vh,520px)] md:h-[520px] md:w-[380px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 flex flex-col bg-slate-950"
          >
            <div className="flex-shrink-0 flex items-start justify-between gap-3 px-4 py-4 bg-gradient-to-r from-[#7B4FE0] to-[#5b6ef1] text-white">
              <div className="min-w-0">
                <h2 id="atlas-dialog-title" className="font-heading font-bold text-lg leading-tight">
                  Atlas
                </h2>
                <p className="text-sm text-white/85">Robin&apos;s AI assistant</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close chat"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={listRef}
              className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-3 bg-slate-900/80"
            >
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}-${msg.t?.getTime?.() ?? i}`}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-[#7B4FE0] to-[#5b6ef1] text-white rounded-br-md"
                        : "bg-slate-800/90 border border-slate-700 text-slate-200 rounded-bl-md"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p
                      className={`text-[10px] mt-1.5 tabular-nums ${
                        msg.role === "user" ? "text-white/70" : "text-slate-500"
                      }`}
                    >
                      {formatTime(msg.t instanceof Date ? msg.t : new Date(msg.t))}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/90 border border-slate-700 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {errorBanner && (
                <p
                  className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2"
                  role="alert"
                >
                  {errorBanner}
                </p>
              )}
            </div>

            {!suggestedHidden && messages.length <= 1 && (
              <div className="flex-shrink-0 px-3 pb-2 flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => sendMessage(p)}
                    disabled={loading}
                    className="text-xs px-3 py-1.5 rounded-full border border-slate-600 bg-slate-800/80 text-slate-300 hover:border-[#7B4FE0]/50 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            <div className="flex-shrink-0 border-t border-slate-800 p-3 bg-slate-950/95 flex gap-2">
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
                placeholder="Ask anything…"
                className="flex-1 min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#7B4FE0] to-[#2DCFCF] text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Send message"
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
