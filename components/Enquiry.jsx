"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_ENQUIRY_URL, ENQUIRY_WEBHOOK_URL, USE_WEBHOOKS } from "@/lib/webhooks";

const initialForm = { name: "", email: "", enquiry: "" };

export default function Enquiry() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setStatus(null);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email.";
    if (!form.enquiry.trim()) next.enquiry = "Enquiry is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus(null);

    try {
      const url = USE_WEBHOOKS ? ENQUIRY_WEBHOOK_URL : API_ENQUIRY_URL;
      const payload = USE_WEBHOOKS
        ? {
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.enquiry.trim(),
            source: "enquiry-form",
          }
        : {
            name: form.name.trim(),
            email: form.email.trim(),
            enquiry: form.enquiry.trim(),
          };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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

      setStatus({ type: "success", text: "Thanks! Please check your email for confirmation." });
      setForm(initialForm);
    } catch (e) {
      setStatus({
        type: "error",
        text:
          e?.message ||
          "Something went wrong. Try again or email robinrawat37@gmail.com directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="enquiry"
      className="py-24 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          Enquiry
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B4FE0] via-[#5b6ef1] to-[#2DCFCF] mx-auto rounded-full mb-6" />
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          Have a quick question? Send it here and you’ll get a confirmation email right away.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="glass-card p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="enquiry2-name" className="block text-sm font-medium text-slate-300 mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="enquiry2-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30"
                  placeholder="Your name"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "enq2-err-name" : undefined}
                />
                {errors.name && (
                  <p id="enq2-err-name" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="enquiry2-email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="enquiry2-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30"
                  placeholder="you@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "enq2-err-email" : undefined}
                />
                {errors.email && (
                  <p id="enq2-err-email" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="enquiry2-text" className="block text-sm font-medium text-slate-300 mb-2">
                Enquiry <span className="text-red-400">*</span>
              </label>
              <textarea
                id="enquiry2-text"
                rows={5}
                value={form.enquiry}
                onChange={(e) => setField("enquiry", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30 resize-y min-h-[140px]"
                placeholder="What would you like to ask?"
                aria-invalid={errors.enquiry ? "true" : "false"}
                aria-describedby={errors.enquiry ? "enq2-err-enquiry" : undefined}
              />
              {errors.enquiry && (
                <p id="enq2-err-enquiry" className="mt-1.5 text-sm text-red-400" role="alert">
                  {errors.enquiry}
                </p>
              )}
            </div>

            <AnimatePresence mode="wait">
              {status && (
                <motion.div
                  key={status.type}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className={`rounded-xl px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30"
                      : "bg-red-500/15 text-red-200 border border-red-500/30"
                  }`}
                >
                  {status.text}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-10 py-4 rounded-full bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF] text-white font-bold shadow-[0_0_20px_rgba(123,79,224,0.35)] hover:shadow-[0_0_28px_rgba(123,79,224,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {submitting ? (
                  <>
                    <span
                      className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                      aria-hidden
                    />
                    Sending…
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

