"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ENQUIRY_WEBHOOK_URL } from "@/lib/webhooks";

const SocialLink3 = ({ href, icon, hoverBg, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    style={{ background: 'var(--surface)', color: 'var(--fg-muted)', border: '1px solid var(--border)', '--tw-ring-color': 'var(--neon-yellow)' }}
    onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = hoverBg; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
  >
    <div className="text-xl">{icon}</div>
  </a>
);

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

export default function Contact() {
  const initialForm = { name: "", email: "", enquiry: "" };
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
      const payload = { name: form.name.trim(), email: form.email.trim(), enquiry: form.enquiry.trim(), source: "enquiry-form" };
      const res = await fetch(ENQUIRY_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { let msg = "Request failed"; try { const data = await res.json(); msg = data?.error || msg; if (data?.details) msg = `${msg} (${data.details})`; } catch { /* ignore */ } throw new Error(msg); }
      setStatus({ type: "success", text: "Thanks — I've received your message. I'll get back to you shortly." });
      setForm(initialForm);
    } catch (err) {
      setStatus({ type: "error", text: err?.message || "Something went wrong. Try again or email robinrawat37@gmail.com directly." });
    } finally { setSubmitting(false); }
  };

  const contactInfo = [
    { icon: <FaEnvelope className="text-xl" />, label: "Email", value: "robinrawat37@gmail.com", href: "mailto:robinrawat37@gmail.com" },
    { icon: <FaPhoneAlt className="text-xl" />, label: "Phone", value: "+91-9416149624", href: "tel:+919416149624" },
    { icon: <FaMapMarkerAlt className="text-xl" />, label: "Location", value: "Sonipat, Haryana, India", href: null },
  ];

  return (
    <section id="contact" className="py-24 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight" style={{ color: 'var(--fg)' }}>
          Let&apos;s Build the Future
        </h2>
        <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
        <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--fg-muted)' }}>
          Currently open for AI Integration and Senior Full Stack roles. Let&apos;s discuss how we can build something intelligent together.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6 h-full">
          <div className="space-y-8 glass-card p-8 h-full min-h-[400px]">
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--fg)' }}>Connect with Me</h3>

            {contactInfo.map((info, idx) => (
              <div key={idx} className="flex items-start gap-4 content-center group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--neon-yellow)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(217,255,0,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface)'; }}
                >
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: 'var(--fg-muted)' }}>{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="text-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded px-1" style={{ color: 'var(--fg)', '--tw-ring-color': 'var(--neon-yellow)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--neon-green)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg)'; }}
                    >{info.value}</a>
                  ) : (
                    <p className="text-lg font-medium" style={{ color: 'var(--fg)' }}>{info.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-8 mt-2 flex flex-wrap gap-4" style={{ borderTop: '1px solid var(--border)' }}>
              <SocialLink3 href="https://www.linkedin.com/in/robinrawat1/" icon={<FaLinkedin />} hoverBg="#0077b5" ariaLabel="LinkedIn profile" />
              <SocialLink3 href="https://github.com/robinrawat007" icon={<FaGithub />} hoverBg="#333" ariaLabel="GitHub profile" />
              <SocialLink3 href="https://x.com/robinrawat37" icon={<FaXTwitter />} hoverBg="#111" ariaLabel="X profile" />
              <SocialLink3 href="https://www.instagram.com/robinrawat01/" icon={<FaInstagram />} hoverBg="#e1306c" ariaLabel="Instagram profile" />
              <SocialLink3 href="https://wa.me/919416149624" icon={<FaWhatsapp />} hoverBg="#25d366" ariaLabel="WhatsApp" />
              <SocialLink3 href="https://thestackshift.beehiiv.com" icon={<span className="text-xs font-bold">NEWS</span>} hoverBg="var(--neon-yellow)" ariaLabel="Newsletter" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative h-full">
          <div className="glass-card p-1 h-full">
            <div className="rounded-xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--surface), var(--bg), var(--surface))', border: '1px solid var(--border)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" style={{ background: 'rgba(0,255,133,0.06)' }} />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" style={{ background: 'rgba(217,255,0,0.06)' }} />

              <div className="relative z-10 w-full max-w-md text-left">
                <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center rotate-12 shadow-2xl mb-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span className="text-4xl" aria-hidden="true">✉️</span>
                </div>
                <h3 className="text-2xl font-bold text-center" style={{ color: 'var(--fg)' }}>Enquiry</h3>
                <p className="text-center mt-2 mb-6" style={{ color: 'var(--fg-muted)' }}>Send a message here and you&apos;ll get a confirmation email right away.</p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[{ id: "contact-enquiry-name", label: "Name", field: "name", type: "text", auto: "name", ph: "Your name", err: errors.name, errId: "contact-enquiry-err-name" },
                      { id: "contact-enquiry-email", label: "Email", field: "email", type: "email", auto: "email", ph: "you@example.com", err: errors.email, errId: "contact-enquiry-err-email" }
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
                    <label htmlFor="contact-enquiry-text" className="block text-sm font-medium mb-2" style={{ color: 'var(--fg-muted)' }}>Enquiry <span className="text-red-400">*</span></label>
                    <textarea id="contact-enquiry-text" rows={5} value={form.enquiry} onChange={(e) => setField("enquiry", e.target.value)} style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }} placeholder="What would you like to ask?" aria-invalid={errors.enquiry ? "true" : "false"} aria-describedby={errors.enquiry ? "contact-enquiry-err-enquiry" : undefined}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(217,255,0,0.4)'; e.target.style.boxShadow = '0 0 0 2px rgba(217,255,0,0.08)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = ''; }}
                    />
                    {errors.enquiry && <p id="contact-enquiry-err-enquiry" className="mt-1.5 text-sm text-red-400" role="alert">{errors.enquiry}</p>}
                  </div>

                  <AnimatePresence mode="wait">
                    {status && (
                      <motion.div key={status.type} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="rounded-xl px-4 py-3 text-sm"
                        style={status.type === "success" ? { background: 'rgba(0,255,133,0.08)', color: '#a3ffcb', border: '1px solid rgba(0,255,133,0.2)' } : { background: 'rgba(239,68,68,0.08)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}
                      >{status.text}</motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-center pt-2">
                    <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-4 rounded-lg font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-1 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2"
                      style={{ background: 'var(--neon-yellow)', color: '#000', boxShadow: '0 0 20px rgba(217,255,0,0.35)', '--tw-ring-color': 'var(--neon-yellow)' }}
                      onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.boxShadow = '0 0 32px rgba(217,255,0,0.55)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(217,255,0,0.35)'; }}
                    >
                      {submitting ? (<><svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Sending…</>) : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
