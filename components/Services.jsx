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
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  borderRadius: "0.75rem",
  width: "100%",
  padding: "0.6rem 1rem", // Reduced height
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
    if (!form.name.trim()) next.name = "Required";
    if (!form.email.trim()) next.email = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.services.length) next.services = "Select one";
    if (!form.budget) next.budget = "Select budget";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true); setStatus(null);
    try {
      await fetch(SERVICE_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source: "start-project-form" }) });
      setStatus({ type: "success", text: "Received." });
      setForm(initialForm);
    } catch (e) {
      setStatus({ type: "error", text: "Error. Try again." });
    } finally { setSubmitting(false); }
  };

  return (
    <section id="services" className="py-20 relative z-10 w-full overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <GlassShapes />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 tracking-tighter text-white">Services</h2>
          <div className="w-20 h-1 mx-auto rounded-full mb-6 bg-gradient-to-r from-neon-yellow to-neon-green" />
          <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium leading-relaxed">
            Scalable solutions built with AI integration and engineering precision.
          </p>
        </motion.div>

        {/* Services Grid - Restored Coming Soon logic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((svc, index) => {
            const Icon = ICON_MAP[svc.icon_name];
            if (svc.disabled) {
              return (
                <motion.div key={svc.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-[2rem] p-8 opacity-40 grayscale border border-white/5 bg-white/[0.01]">
                  <span className="absolute top-6 right-6 text-[9px] font-black uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1 rounded-full bg-white/5">Coming Soon</span>
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/20">
                    {Icon && <Icon size={24} />}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white/40">{svc.title}</h3>
                  <p className="text-sm leading-relaxed text-white/20">{svc.description}</p>
                </motion.div>
              );
            }
            return (
              <motion.div 
                key={svc.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} 
                className="group"
              >
                <Tilt intensity={15} className="h-full">
                  <div className="relative h-full p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl transition-all duration-500 hover:border-neon-yellow/20 hover:bg-white/[0.04]">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] text-neon-yellow border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all">
                      {Icon && <Icon size={24} />}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{svc.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{svc.description}</p>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

        {/* Form - Restored to original layout with reduced height elements */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <div className="glass-card p-10 md:p-12 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
             <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white text-center mb-1">Start a Project</h3>
                <p className="text-center text-[10px] uppercase tracking-[0.4em] text-white/20 mb-10 font-bold">Briefly share your vision</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Name *</label>
                      <input type="text" value={form.name} onChange={(e) => setField("name", e.target.value)} style={inputStyle} placeholder="Your name" />
                      {errors.name && <p className="text-[10px] text-red-400 ml-2 uppercase font-bold">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Email *</label>
                      <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} style={inputStyle} placeholder="you@example.com" />
                      {errors.email && <p className="text-[10px] text-red-400 ml-2 uppercase font-bold">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Phone *</label>
                    <input type="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} style={inputStyle} placeholder="+91 …" />
                    {errors.phone && <p className="text-[10px] text-red-400 ml-2 uppercase font-bold">{errors.phone}</p>}
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Services Interested In *</label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {enquiryServiceOptions.map((opt) => (
                        <label key={opt.id} className="flex items-center gap-3 cursor-pointer rounded-xl px-4 py-2.5 transition-all bg-white/[0.02] border border-white/5 hover:border-white/20">
                          <input type="checkbox" checked={form.services.includes(opt.id)} onChange={() => toggleService(opt.id)} className="h-4 w-4 rounded border-white/10 bg-white/5 accent-neon-yellow" />
                          <span className="text-xs font-medium text-slate-400">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.services && <p className="text-[10px] text-red-400 ml-2 uppercase font-bold">{errors.services}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Budget Range *</label>
                    <select value={form.budget} onChange={(e) => setField("budget", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="" className="bg-neutral-900">Select Budget</option>
                      {budgetOptions.map((b) => <option key={b} value={b} className="bg-neutral-900">{b}</option>)}
                    </select>
                    {errors.budget && <p className="text-[10px] text-red-400 ml-2 uppercase font-bold">{errors.budget}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Message</label>
                    <textarea rows={3} value={form.message} onChange={(e) => setField("message", e.target.value)} style={{ ...inputStyle, resize: "none", minHeight: "80px" }} placeholder="Tell me about your project..." />
                  </div>

                  <div className="flex flex-col items-center gap-4 pt-4">
                    <AnimatePresence mode="wait">
                      {status && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className={`text-[10px] font-black uppercase tracking-widest ${status.type === 'success' ? 'text-neon-green' : 'text-red-400'}`}>
                          {status.text}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <button type="submit" disabled={submitting} className="w-full sm:w-auto px-12 py-3.5 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] bg-neon-yellow text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(217,255,0,0.3)] transition-all">
                      {submitting ? "Processing..." : "Initiate Project"}
                    </button>
                  </div>
                </form>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
