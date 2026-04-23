"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ENQUIRY_WEBHOOK_URL } from "@/lib/webhooks";
import { Magnetic, Spotlight, GlassShapes } from '@/components/motion';

const inputStyle = "w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-neon-yellow/40 focus:bg-white/[0.05] transition-all duration-300";

export default function Contact() {
  const initialForm = { name: "", email: "", enquiry: "" };
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
    if (!form.name.trim()) next.name = "Req";
    if (!form.email.trim()) next.email = "Req";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Invalid";
    if (!form.enquiry.trim()) next.enquiry = "Req";
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
      if (!res.ok) throw new Error("Failed");
      setStatus({ type: "success", text: "Received." });
      setForm(initialForm);
    } catch (err) {
      setStatus({ type: "error", text: "Retry shortly." });
    } finally { setSubmitting(false); }
  };

  const contactInfo = [
    { icon: <FaEnvelope />, label: "Email", value: "robinrawat37@gmail.com", href: "mailto:robinrawat37@gmail.com", color: "var(--neon-cyan)" },
    { icon: <FaPhoneAlt />, label: "Phone", value: "+91-9416149624", href: "tel:+919416149624", color: "var(--neon-green)" },
    { icon: <FaMapMarkerAlt />, label: "Location", value: "Sonipat, Haryana, India", href: null, color: "var(--neon-yellow)" },
  ];

  const socialLinks = [
    { href: "https://www.linkedin.com/in/robinrawat1/", icon: <FaLinkedin /> },
    { href: "https://github.com/robinrawat007", icon: <FaGithub /> },
    { href: "https://x.com/robinrawat37", icon: <FaXTwitter /> },
    { href: "https://www.instagram.com/robinrawat01/", icon: <FaInstagram /> },
    { href: "https://wa.me/919416149624", icon: <FaWhatsapp /> },
  ];

  return (
    <section id="contact" className="py-16 md:py-20 relative z-10 w-full overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <GlassShapes />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-3 tracking-tighter text-white">
            Let&apos;s Build the Future
          </h2>
          <p className="max-w-2xl mx-auto text-base text-slate-400 font-medium leading-relaxed">
            AI Integration & Senior Full Stack roles. 
            <span className="text-neon-green ml-2">Let&apos;s discuss your vision.</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Info Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5">
            <div className="relative h-full rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-8 flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
              
              <h3 className="text-xl font-bold mb-8 text-white tracking-tight flex items-center gap-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_8px_var(--neon-green)]" />
                 Connect
              </h3>

              <div className="space-y-6 flex-1">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.03] transition-all group-hover:scale-110" style={{ color: info.color }}>
                      {React.cloneElement(info.icon, { size: 18 })}
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/20 mb-1">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-base font-bold text-slate-200 hover:text-white transition-colors">{info.value}</a>
                      ) : (
                        <p className="text-base font-bold text-slate-200">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 mt-8 border-t border-white/5">
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, idx) => (
                    <Magnetic key={idx}>
                      <a href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.03] text-slate-400 hover:text-neon-yellow hover:border-neon-yellow/30 transition-all">
                        {React.cloneElement(social.icon, { size: 16 })}
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Enquiry Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7">
            <div className="relative h-full rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-8 lg:p-10 overflow-hidden">
              <Spotlight fill="rgba(217, 255, 0, 0.04)" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-white tracking-tight">Enquiry</h3>
                  <div className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Fast Response Guaranteed</div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 ml-2">Name</label>
                      <input type="text" value={form.name} onChange={(e) => setField("name", e.target.value)} className={inputStyle} placeholder="John Doe" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 ml-2">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} className={inputStyle} placeholder="john@email.com" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 ml-2">Message</label>
                    <textarea rows={4} value={form.enquiry} onChange={(e) => setField("enquiry", e.target.value)} className={`${inputStyle} resize-none min-h-[120px]`} placeholder="Tell me about your project..." />
                  </div>

                  <div className="flex items-center justify-between gap-6 pt-2">
                    <AnimatePresence mode="wait">
                      {status && (
                        <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`text-[10px] font-bold uppercase tracking-widest ${status.type === 'success' ? 'text-neon-green' : 'text-red-400'}`}>
                          {status.text}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <button type="submit" disabled={submitting} className="ml-auto px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] bg-neon-yellow text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(217,255,0,0.3)] disabled:opacity-50 transition-all flex items-center gap-3">
                      {submitting ? "Sending..." : "Submit"}
                      <FaPaperPlane size={10} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
