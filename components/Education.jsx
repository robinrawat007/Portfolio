"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight" style={{ color: 'var(--fg)' }}>
          Education
        </h2>
        <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
        <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--fg-muted)' }}>
          Academic background and foundational knowledge.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass-card p-8 group relative overflow-hidden">
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full blur-3xl opacity-8 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" style={{ background: 'var(--neon-yellow)' }} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold tracking-wider uppercase font-mono" style={{ color: 'var(--neon-green)' }}>
                  Aug 2016 – May 2019
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--fg)' }}>
                Bachelor of Computer Applications
              </h3>
              <p className="text-xl font-medium" style={{ color: 'var(--neon-yellow)' }}>
                Hindu Institute of Management
              </p>
            </div>

            <div className="hidden md:flex flex-shrink-0 items-center justify-center w-16 h-16 rounded-full shadow-inner" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <span className="text-2xl">🎓</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
