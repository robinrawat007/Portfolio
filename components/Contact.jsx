"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ENQUIRY_WEBHOOK_URL } from "@/lib/webhooks";

const SocialLink3 = ({ href, icon, bg, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className={`w-12 h-12 min-w-[48px] min-h-[48px] bg-slate-800 rounded-full flex items-center justify-center text-slate-300 ${bg} hover:text-white transition-all hover:scale-110 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`}
  >
    <div className="text-xl">{icon}</div>
  </a>
);

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
      const url = ENQUIRY_WEBHOOK_URL;
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        enquiry: form.enquiry.trim(),
        source: "enquiry-form",
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

      setStatus({
        type: "success",
        text: "Thanks — I've received your message. I’ll get back to you shortly.",
      });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        type: "error",
        text:
          err?.message ||
          "Something went wrong. Try again or email robinrawat37@gmail.com directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-xl" />,
      label: "Email",
      value: "robinrawat37@gmail.com",
      href: "mailto:robinrawat37@gmail.com"
    },
    {
      icon: <FaPhoneAlt className="text-xl" />,
      label: "Phone",
      value: "+91-9416149624",
      href: "tel:+919416149624"
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      label: "Location",
      value: "Sonipat, Haryana, India",
      desc: "Open to Remote",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-24 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          Let&apos;s Build the Future
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B4FE0] via-[#5b6ef1] to-[#2DCFCF] mx-auto rounded-full mb-6"></div>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          Currently open for AI Integration and Senior Frontend roles. Let&apos;s discuss how we can build something intelligent together.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 h-full"
        >
          <div className="space-y-8 glass-card p-8 h-full min-h-[400px]">
            <h3 className="text-2xl font-bold text-slate-100 mb-6">Connect with Me</h3>

            {contactInfo.map((info, idx) => (
              <div key={idx} className="flex items-start gap-4 content-center group">
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-[#7B4FE0] group-hover:bg-[#7B4FE0]/20 group-hover:text-[#7B4FE0] transition-colors shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-300 uppercase tracking-widest font-semibold">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="text-lg text-slate-200 hover:text-[#2DCFCF] transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded px-1">
                      {info.value}
                    </a>
                  ) : (
                    <div className="space-y-1 mt-0.5">
                      <p className="text-lg text-slate-200 font-medium leading-none">{info.value}</p>
                      {info.desc && <p className="text-sm text-[#7B4FE0]">{info.desc}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-8 mt-2 border-t border-slate-700/50 flex flex-wrap gap-4">
              <SocialLink3 href="https://www.linkedin.com/in/robinrawat1/" icon={<FaLinkedin />} bg="hover:bg-blue-600" ariaLabel="LinkedIn profile" />
              <SocialLink3 href="https://github.com/robinrawat007" icon={<FaGithub />} bg="hover:bg-slate-700" ariaLabel="GitHub profile" />
              <SocialLink3 href="https://x.com/robinrawat37" icon={<FaXTwitter />} bg="hover:bg-slate-600" ariaLabel="X profile" />
              <SocialLink3 href="https://www.instagram.com/robinrawat01/" icon={<FaInstagram />} bg="hover:bg-pink-600/80" ariaLabel="Instagram profile" />
              <SocialLink3 href="https://wa.me/919416149624" icon={<FaWhatsapp />} bg="hover:bg-green-600" ariaLabel="WhatsApp" />
              <SocialLink3 href="https://thestackshift.beehiiv.com" icon={<span className="text-xs font-bold">NEWS</span>} bg="hover:bg-[#7B4FE0]" ariaLabel="Newsletter" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-full"
        >
          <div className="glass-card p-1 h-full">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden border border-slate-800/50">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2DCFCF]/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7B4FE0]/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

              <div className="relative z-10 w-full max-w-md text-left">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center border border-slate-700 rotate-12 shadow-2xl mb-6">
                  <span className="text-4xl">✉️</span>
                </div>
                <h3 className="text-2xl font-bold text-white text-center">Enquiry</h3>
                <p className="text-slate-300 text-center mt-2 mb-6">
                  Send a message here and you’ll get a confirmation email right away.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-enquiry-name" className="block text-sm font-medium text-slate-300 mb-2">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-enquiry-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30"
                        placeholder="Your name"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "contact-enquiry-err-name" : undefined}
                      />
                      {errors.name && (
                        <p id="contact-enquiry-err-name" className="mt-1.5 text-sm text-red-400" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-enquiry-email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-enquiry-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30"
                        placeholder="you@example.com"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "contact-enquiry-err-email" : undefined}
                      />
                      {errors.email && (
                        <p id="contact-enquiry-err-email" className="mt-1.5 text-sm text-red-400" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-enquiry-text" className="block text-sm font-medium text-slate-300 mb-2">
                      Enquiry <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-enquiry-text"
                      rows={5}
                      value={form.enquiry}
                      onChange={(e) => setField("enquiry", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#7B4FE0] focus:outline-none focus:ring-2 focus:ring-[#7B4FE0]/30 resize-y min-h-[140px]"
                      placeholder="What would you like to ask?"
                      aria-invalid={errors.enquiry ? "true" : "false"}
                      aria-describedby={errors.enquiry ? "contact-enquiry-err-enquiry" : undefined}
                    />
                    {errors.enquiry && (
                      <p id="contact-enquiry-err-enquiry" className="mt-1.5 text-sm text-red-400" role="alert">
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
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-4 rounded-full bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF] text-white font-bold shadow-[0_0_20px_rgba(123,79,224,0.4)] hover:shadow-[0_0_30px_rgba(123,79,224,0.6)] hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      {submitting ? "Sending…" : "Submit"}
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
