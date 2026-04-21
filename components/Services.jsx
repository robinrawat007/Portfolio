"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBolt,
  FaCommentDots,
  FaDatabase,
  FaGlobe,
  FaLayerGroup,
  FaMicrophone,
} from "react-icons/fa";
import { FaClapperboard } from "react-icons/fa6";
import { SERVICE_WEBHOOK_URL } from "@/lib/webhooks";

const enquiryServiceOptions = [
  { id: "starter-website", label: "Starter Website" },
  { id: "enterprise-web-app", label: "Enterprise Web Application" },
  { id: "ai-workflow-automation", label: "AI Workflow Automation" },
  { id: "custom-chatbot", label: "Custom Chatbot" },
  { id: "custom-voice-assistant", label: "Custom Voice Assistant" },
  { id: "rag-knowledge-base", label: "RAG System / Knowledge Base AI" },
];

const services = [
  {
    id: "starter-website",
    title: "Starter Website",
    description:
      "Clean, fast websites and landing pages for individuals and small businesses.",
    Icon: FaGlobe,
    disabled: false,
  },
  {
    id: "enterprise-web-app",
    title: "Enterprise Web Application",
    description:
      "Scalable, full-stack web apps built for complex business needs.",
    Icon: FaLayerGroup,
    disabled: false,
  },
  {
    id: "ai-workflow-automation",
    title: "AI Workflow Automation",
    description:
      "End-to-end automation pipelines that eliminate manual, repetitive work.",
    Icon: FaBolt,
    disabled: false,
  },
  {
    id: "custom-chatbot",
    title: "Custom Chatbot",
    description:
      "Intelligent chatbots for websites, WhatsApp, and customer support.",
    Icon: FaCommentDots,
    disabled: false,
  },
  {
    id: "custom-voice-assistant",
    title: "Custom Voice Assistant",
    description:
      "AI-powered voice agents for sales, support, and operations.",
    Icon: FaMicrophone,
    disabled: false,
  },
  {
    id: "rag-knowledge-base",
    title: "RAG System / Knowledge Base AI",
    description:
      "Smart document Q&A and internal knowledge search systems.",
    Icon: FaDatabase,
    disabled: false,
  },
  {
    id: "ai-content-pipeline",
    title: "AI Content Pipeline",
    description:
      "Automated content generation workflows for video, copy, and social.",
    Icon: FaClapperboard,
    disabled: true,
  },
];

const budgetOptions = [
  "Less than $500",
  "$500 – $2,000",
  "$2,000 – $5,000",
  "$5,000+",
  "Not sure yet",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  services: [],
  budget: "",
  message: "",
};

export default function Services() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setStatus(null);
  };

  const toggleService = (id) => {
    setForm((f) => {
      const set = new Set(f.services);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...f, services: [...set] };
    });
    setErrors((e) => ({ ...e, services: undefined }));
    setStatus(null);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.services.length)
      next.services = "Select at least one service.";
    if (!form.budget) next.budget = "Select a budget range.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus(null);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      services: form.services,
      budget: form.budget,
      message: form.message.trim() || undefined,
    };

    try {
      const url = SERVICE_WEBHOOK_URL;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "start-project-form" }),
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

      setStatus({
        type: "success",
        text: "Thanks for choosing my services — I’ve received your request. I’ll review the details and reach out soon with next steps.",
      });
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
      id="services"
      className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          Services
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B4FE0] via-[#5b6ef1] to-[#2DCFCF] mx-auto rounded-full mb-6" />
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          From fast marketing sites to full-stack apps and AI-powered workflows — pick what fits, then tell me about your project.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {services.map((svc, index) => {
          const Icon = svc.Icon;
          if (svc.disabled) {
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="relative rounded-2xl border border-slate-700/50 bg-slate-900/40 p-8 opacity-60 grayscale pointer-events-none select-none"
              >
                <span className="absolute top-4 right-4 z-10 rounded-full bg-slate-800/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-400 border border-slate-600">
                  Coming Soon
                </span>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-800/80 text-slate-500">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">{svc.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{svc.description}</p>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group relative h-full"
            >
              <div className="glass-card glass-card-hover h-full p-8 flex flex-col transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 text-[#7B4FE0] group-hover:bg-[#7B4FE0]/15 group-hover:border-[#7B4FE0]/40 transition-colors">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{svc.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed flex-1">{svc.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="glass-card p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-100 mb-2 text-center">
            Start a Project
          </h3>
          <p className="text-slate-400 text-center text-sm mb-8">
            Share a few details and I&apos;ll follow up shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="enquiry-name" className="block text-sm font-medium text-slate-300 mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30"
                  placeholder="Your name"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "err-name" : undefined}
                />
                {errors.name && (
                  <p id="err-name" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="enquiry-email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30"
                  placeholder="you@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "err-email" : undefined}
                />
                {errors.email && (
                  <p id="err-email" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="enquiry-phone" className="block text-sm font-medium text-slate-300 mb-2">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30"
                placeholder="+91 …"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "err-phone" : undefined}
              />
              {errors.phone && (
                <p id="err-phone" className="mt-1.5 text-sm text-red-400" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <fieldset>
              <legend className="block text-sm font-medium text-slate-300 mb-3">
                Services interested in <span className="text-red-400">*</span>
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {enquiryServiceOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-start gap-3 cursor-pointer rounded-xl border border-slate-700/80 bg-slate-900/40 px-4 py-3 hover:border-[#7B4FE0]/40 hover:bg-slate-800/40 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-400"
                  >
                    <input
                      type="checkbox"
                      checked={form.services.includes(opt.id)}
                      onChange={() => toggleService(opt.id)}
                      className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800 text-[#7B4FE0] focus:ring-[#7B4FE0]"
                    />
                    <span className="text-sm text-slate-200 leading-snug">{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.services && (
                <p className="mt-2 text-sm text-red-400" role="alert">
                  {errors.services}
                </p>
              )}
            </fieldset>

            <div>
              <label htmlFor="enquiry-budget" className="block text-sm font-medium text-slate-300 mb-2">
                Budget range <span className="text-red-400">*</span>
              </label>
              <select
                id="enquiry-budget"
                value={form.budget}
                onChange={(e) => setField("budget", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30"
                aria-invalid={errors.budget ? "true" : "false"}
                aria-describedby={errors.budget ? "err-budget" : undefined}
              >
                <option value="">Select…</option>
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p id="err-budget" className="mt-1.5 text-sm text-red-400" role="alert">
                  {errors.budget}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="enquiry-message" className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="enquiry-message"
                rows={4}
                value={form.message}
                onChange={(e) => setField("message", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30 resize-y min-h-[120px]"
                placeholder="Tell me about your project..."
              />
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
