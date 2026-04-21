"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ENQUIRY_WEBHOOK_URL } from "@/lib/webhooks";

const initialForm = { name: "", email: "", enquiry: "" };

const inputStyle = {
  background: 'rgba(17,17,17,0.6)',
  border: '1px solid var(--border)',
  color: 'var(--fg)',
  borderRadius: '0.75rem',
  width: '100%',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  outline: 'none',
};

export default function Enquiry() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, value) => { setForm((f) => ({ ...f, [key]: value })); setErrors((e) => ({ ...e, [key]: undefined })); setStatus(null); };
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email.";
    if (!form.enquiry.trim()) next.enquiry = "Enquiry is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true); setStatus(null);
    try {
      const payload = { name: form.name.trim(), email: form.email.trim(), message: form.enquiry.trim(), source: "enquiry-form" };
      const res = await fetch(ENQUIRY_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { let msg = "Request failed"; try { const data = await res.json(); msg = data?.error || msg; if (data?.details) msg = `${msg} (${data.details})`; } catch { /* ignore */ } throw new Error(msg); }
      setStatus({ type: "success", text: "Thanks for reaching out — I've received your enquiry. I'll get back to you soon." });
      setForm(initialForm);
    } catch (e) {
      setStatus({ type: "error", text: e?.message || "Something went wrong. Try again or email robinrawat37@gmail.com directly." });
    } finally { setSubmitting(false); }
  };

  return (
    <section id="enquiry" className="py-24 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight" style={{ color: 'var(--fg)' }}>Enquiry</h2>
        <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
        <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--fg-muted)' }}>
          Have a quick question? Send it here and you&apos;ll get a confirmation email right away.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
        <div className="glass-card p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-6">
              {[{ id: "enquiry2-name", label: "Name", field: "name", type: "text", auto: "name", ph: "Your name", err: errors.name, errId: "enq2-err-name" },
                { id: "enquiry2-email", label: "Email", field: "email", type: "email", auto: "email", ph: "you@example.com", err: errors.email, errId: "enq2-err-email" }
              ].map(({ id, label, field, type, auto, ph, err, errId }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium mb-2" style={{ color: 'var(--fg-muted)' }}>{label} <span className="text-red-400">*</span></label>
                  <input id={id} type={type} autoComplete={auto} value={form[field]} onChange={(e) => setField(field, e.target.value)} style={inputStyle} placeholder={ph} aria-invalid={err ? "true" : "false"} aria-describedby={err ? errId : undefined}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(217,255,0,0.4)'; e.target.style.boxShadow = '0 0 0 2px rgba(217,255,0,0.08)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = ''; }}
                  />
                  {err && <p id={errId} className="mt-1.5 text-sm text-red-400" role="alert">{err}</p>}
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="enquiry2-text" className="block text-sm font-medium mb-2" style={{ color: 'var(--fg-muted)' }}>Enquiry <span className="text-red-400">*</span></label>
              <textarea id="enquiry2-text" rows={5} value={form.enquiry} onChange={(e) => setField("enquiry", e.target.value)} style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }} placeholder="What would you like to ask?" aria-invalid={errors.enquiry ? "true" : "false"} aria-describedby={errors.enquiry ? "enq2-err-enquiry" : undefined}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(217,255,0,0.4)'; e.target.style.boxShadow = '0 0 0 2px rgba(217,255,0,0.08)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = ''; }}
              />
              {errors.enquiry && <p id="enq2-err-enquiry" className="mt-1.5 text-sm text-red-400" role="alert">{errors.enquiry}</p>}
            </div>

            <AnimatePresence mode="wait">
              {status && (
                <motion.div key={status.type} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="rounded-xl px-4 py-3 text-sm"
                  style={status.type === "success" ? { background: 'rgba(0,255,133,0.08)', color: '#a3ffcb', border: '1px solid rgba(0,255,133,0.2)' } : { background: 'rgba(239,68,68,0.08)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}
                >{status.text}</motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center pt-2">
              <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 min-h-[48px] px-10 py-4 rounded-lg font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2"
                style={{ background: 'var(--neon-yellow)', color: '#000', boxShadow: '0 0 20px rgba(217,255,0,0.35)', '--tw-ring-color': 'var(--neon-yellow)' }}
                onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.boxShadow = '0 0 28px rgba(217,255,0,0.55)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(217,255,0,0.35)'; }}
              >
                {submitting ? (<><span className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" aria-hidden />Sending…</>) : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
