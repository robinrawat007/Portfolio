"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { supabase } from "@/lib/supabaseClient";
import { Tilt, GlassShapes } from "@/components/motion";
import {
  FaBolt, FaCommentDots, FaDatabase, FaGlobe, FaLayerGroup, FaMicrophone,
} from "react-icons/fa";
import { FaClapperboard } from "react-icons/fa6";
import { SERVICE_WEBHOOK_URL } from "@/lib/webhooks";

const ICON_MAP = {
  FaGlobe, FaLayerGroup, FaBolt, FaCommentDots, FaMicrophone, FaDatabase, FaClapperboard,
};

const fetchServices = async () => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("display_order");
  if (error) throw error;
  return data;
};

const budgetOptions = ["Less than $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000+", "Not sure yet"];
const initialForm = { name: "", email: "", phone: "", services: [], budget: "", message: "" };

const inputStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  color: "var(--fg)",
  borderRadius: "0.75rem",
  width: "100%",
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  outline: "none",
};

export default function Services() {
  const { data: services = [] } = useSWR("services", fetchServices, { revalidateOnFocus: false });
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const activeServices = services.filter((s) => !s.disabled);
  const enquiryServiceOptions = activeServices.map((s) => ({ id: s.id, label: s.title }));

  const setField = (key, value) => { setForm((f) => ({ ...f, [key]: value })); setErrors((e) => ({ ...e, [key]: undefined })); setStatus(null); };
  const toggleService = (id) => {
    setForm((f) => { const set = new Set(f.services); if (set.has(id)) set.delete(id); else set.add(id); return { ...f, services: [...set] }; });
    setErrors((e) => ({ ...e, services: undefined })); setStatus(null);
  };
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.services.length) next.services = "Select at least one service.";
    if (!form.budget) next.budget = "Select a budget range.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true); setStatus(null);
    const payload = { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), services: form.services, budget: form.budget, message: form.message.trim() || undefined };
    try {
      const res = await fetch(SERVICE_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, source: "start-project-form" }) });
      if (!res.ok) { let msg = "Request failed"; try { const data = await res.json(); msg = data?.error || msg; if (data?.details) msg = `${msg} (${data.details})`; } catch { /* ignore */ } throw new Error(msg); }
      setStatus({ type: "success", text: "Thanks for choosing my services — I've received your request. I'll review the details and reach out soon with next steps." });
      setForm(initialForm);
    } catch (e) {
      setStatus({ type: "error", text: e?.message || "Something went wrong. Try again or email robinrawat37@gmail.com directly." });
    } finally { setSubmitting(false); }
  };

  return (
    <section id="services" className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <GlassShapes />
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight" style={{ color: "var(--fg)" }}>Services</h2>
        <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: "linear-gradient(90deg, var(--neon-yellow), var(--neon-green))" }} />
        <p className="max-w-2xl mx-auto text-lg" style={{ color: "var(--fg-muted)" }}>
          From fast marketing sites to full-stack apps and AI-powered workflows — pick what fits, then tell me about your project.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {services.map((svc, index) => {
          const Icon = ICON_MAP[svc.icon_name];
          if (svc.disabled) {
            return (
              <motion.div key={svc.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.5 }} className="relative rounded-2xl p-8 opacity-50 grayscale pointer-events-none select-none" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
                <span className="absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}>Coming Soon</span>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}>
                  {Icon && <Icon className="h-6 w-6" aria-hidden />}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--fg-muted)" }}>{svc.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{svc.description}</p>
              </motion.div>
            );
          }
          return (
            <motion.div 
              key={svc.id} 
              initial={{ opacity: 0, y: 50, rotateX: 45 }} 
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }} 
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }} 
              className="group relative h-full"
              style={{ perspective: "1200px" }}
            >
              <Tilt intensity={20} className="h-full">
                <div className="glass-card glass-card-hover h-full p-8 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(217,255,0,0.1)]">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--neon-yellow)" }}>
                    {Icon && <Icon className="h-7 w-7" aria-hidden />}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight" style={{ color: "var(--fg)" }}>{svc.title}</h3>
                  <p className="text-base leading-relaxed flex-1 opacity-80" style={{ color: "var(--fg-muted)" }}>{svc.description}</p>
                  
                  <div className="mt-6 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--neon-yellow)" }}>Learn More →</span>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
        <div className="glass-card p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-center" style={{ color: "var(--fg)" }}>Start a Project</h3>
          <p className="text-center text-sm mb-8" style={{ color: "var(--fg-muted)" }}>Share a few details and I&apos;ll follow up shortly.</p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { id: "enquiry-name", label: "Name", field: "name", type: "text", auto: "name", ph: "Your name", err: errors.name, errId: "err-name" },
                { id: "enquiry-email", label: "Email", field: "email", type: "email", auto: "email", ph: "you@example.com", err: errors.email, errId: "err-email" },
              ].map(({ id, label, field, type, auto, ph, err, errId }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium mb-2" style={{ color: "var(--fg-muted)" }}>{label} <span className="text-red-400">*</span></label>
                  <input id={id} type={type} autoComplete={auto} value={form[field]} onChange={(e) => setField(field, e.target.value)} style={inputStyle} placeholder={ph} aria-invalid={err ? "true" : "false"} aria-describedby={err ? errId : undefined}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(217,255,0,0.4)"; e.target.style.boxShadow = "0 0 0 2px rgba(217,255,0,0.08)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = ""; }}
                  />
                  {err && <p id={errId} className="mt-1.5 text-sm text-red-400" role="alert">{err}</p>}
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="enquiry-phone" className="block text-sm font-medium mb-2" style={{ color: "var(--fg-muted)" }}>Phone <span className="text-red-400">*</span></label>
              <input id="enquiry-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} style={inputStyle} placeholder="+91 …" aria-invalid={errors.phone ? "true" : "false"} aria-describedby={errors.phone ? "err-phone" : undefined}
                onFocus={(e) => { e.target.style.borderColor = "rgba(217,255,0,0.4)"; e.target.style.boxShadow = "0 0 0 2px rgba(217,255,0,0.08)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = ""; }}
              />
              {errors.phone && <p id="err-phone" className="mt-1.5 text-sm text-red-400" role="alert">{errors.phone}</p>}
            </div>

            <fieldset>
              <legend className="block text-sm font-medium mb-3" style={{ color: "var(--fg-muted)" }}>Services interested in <span className="text-red-400">*</span></legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {enquiryServiceOptions.map((opt) => (
                  <label key={opt.id} className="flex items-start gap-3 cursor-pointer rounded-xl px-4 py-3 transition-colors" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(217,255,0,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                  >
                    <input type="checkbox" checked={form.services.includes(opt.id)} onChange={() => toggleService(opt.id)} className="mt-1 h-4 w-4 rounded" style={{ accentColor: "var(--neon-yellow)" }} />
                    <span className="text-sm leading-snug" style={{ color: "var(--fg-muted)" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.services && <p className="mt-2 text-sm text-red-400" role="alert">{errors.services}</p>}
            </fieldset>

            <div>
              <label htmlFor="enquiry-budget" className="block text-sm font-medium mb-2" style={{ color: "var(--fg-muted)" }}>Budget range <span className="text-red-400">*</span></label>
              <select id="enquiry-budget" value={form.budget} onChange={(e) => setField("budget", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }} aria-invalid={errors.budget ? "true" : "false"}
                onFocus={(e) => { e.target.style.borderColor = "rgba(217,255,0,0.4)"; e.target.style.boxShadow = "0 0 0 2px rgba(217,255,0,0.08)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = ""; }}
              >
                <option value="">Select…</option>
                {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              {errors.budget && <p id="err-budget" className="mt-1.5 text-sm text-red-400" role="alert">{errors.budget}</p>}
            </div>

            <div>
              <label htmlFor="enquiry-message" className="block text-sm font-medium mb-2" style={{ color: "var(--fg-muted)" }}>Message</label>
              <textarea id="enquiry-message" rows={4} value={form.message} onChange={(e) => setField("message", e.target.value)} style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }} placeholder="Tell me about your project..."
                onFocus={(e) => { e.target.style.borderColor = "rgba(217,255,0,0.4)"; e.target.style.boxShadow = "0 0 0 2px rgba(217,255,0,0.08)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = ""; }}
              />
            </div>

            <AnimatePresence mode="wait">
              {status && (
                <motion.div key={status.type} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="rounded-xl px-4 py-3 text-sm"
                  style={status.type === "success" ? { background: "rgba(0,255,133,0.08)", color: "#a3ffcb", border: "1px solid rgba(0,255,133,0.2)" } : { background: "rgba(239,68,68,0.08)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)" }}
                >{status.text}</motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center pt-2">
              <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 min-h-[48px] px-10 py-4 rounded-lg font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                style={{ background: "var(--neon-yellow)", color: "#000", boxShadow: "0 0 20px rgba(217,255,0,0.3)", "--tw-ring-color": "var(--neon-yellow)" }}
                onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.boxShadow = "0 0 30px rgba(217,255,0,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 20px rgba(217,255,0,0.3)"; }}
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
