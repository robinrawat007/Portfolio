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
    <section
      id="experience"
      className="py-24 relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3">
          Real companies. Real impact.
        </p>
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          Where I&apos;ve Built
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B4FE0] via-[#5b6ef1] to-[#2DCFCF] mx-auto rounded-full" />
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
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-1 ring-white/10 group-hover:ring-purple-500/50 transition-all duration-300 shadow-lg shadow-black/40 group-hover:shadow-purple-500/10 group-hover:shadow-xl">
              <Image
                src={c.logo}
                alt={`${c.company} logo`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-100">{c.company}</h3>
              <p className="text-purple-400 font-medium text-sm">{c.role}</p>
              <p className="text-emerald-400/80 text-xs font-semibold tracking-widest uppercase">
                {c.period}
              </p>
            </div>

          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
