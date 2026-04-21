"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  {
    logo: "/builderai_logo.jpg",
    company: "Builder.AI",
    role: "Software Engineer",
    period: "Jan 2021 – Apr 2025",
  },
  {
    logo: "/arthfintech_logo.jpg",
    company: "Arth Impact",
    role: "Software Engineer",
    period: "Sep 2025 – Jan 2026",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function WorkExperience() {
  return (
    <section id="experience" className="py-24 relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold uppercase tracking-widest mb-3 font-mono" style={{ color: 'var(--neon-yellow)' }}>
          Real companies. Real impact.
        </p>
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight" style={{ color: 'var(--fg)' }}>
          Where I&apos;ve Built
        </h2>
        <div className="w-24 h-1.5 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {clients.map((c) => (
          <motion.div
            key={c.company}
            variants={card}
            whileHover={{ y: -8, transition: { duration: 0.22 } }}
            className="glass-card glass-card-hover p-8 flex flex-col items-center text-center gap-5 group cursor-default"
          >
            <div
              className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg shadow-black/40 transition-all duration-300"
              style={{ border: '1px solid var(--border)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(217,255,0,0.4)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(217,255,0,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; }}
            >
              <Image src={c.logo} alt={`${c.company} logo`} fill className="object-cover" sizes="80px" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>{c.company}</h3>
              <p className="font-medium text-sm" style={{ color: 'var(--neon-yellow)' }}>{c.role}</p>
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(0,255,133,0.7)' }}>
                {c.period}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
