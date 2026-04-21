"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight" style={{ color: 'var(--fg)' }}>
          Certifications
        </h2>
        <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
        <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--fg-muted)' }}>
          Continuous learning to stay at the forefront of technology.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass-card p-8 relative overflow-hidden group border-l-4" style={{ borderLeftColor: 'var(--neon-yellow)' }}>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full blur-3xl opacity-8 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" style={{ background: 'var(--neon-yellow)' }} />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold tracking-wider uppercase px-3 py-1 rounded-full font-mono" style={{ color: 'var(--neon-green)', background: 'rgba(0,255,133,0.08)', border: '1px solid rgba(0,255,133,0.2)' }}>
                  2026
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--fg)' }}>AI Accelerator Program</h3>
              <p className="text-xl font-medium mb-3" style={{ color: 'var(--neon-yellow)' }}>Outskill</p>
              <p style={{ color: 'var(--fg-muted)' }}>
                Intensive specialization in AI integration, focusing on LLM orchestration, RAG architectures, and building production-ready AI applications.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="glass-card p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full blur-3xl opacity-8 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" style={{ background: 'var(--neon-yellow)' }} />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold tracking-wider uppercase px-3 py-1 rounded-full font-mono" style={{ color: 'var(--neon-green)', background: 'rgba(0,255,133,0.08)', border: '1px solid rgba(0,255,133,0.2)' }}>
                  July 2020
                </span>
                <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>216 Hours</span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--fg)' }}>
                Advance Program in Full Stack Software Engineering
              </h3>
              <p className="text-xl font-medium mb-3" style={{ color: 'var(--neon-yellow)' }}>NIIT</p>
              <p style={{ color: 'var(--fg-muted)' }}>
                Completed a comprehensive 216-hour program covering end-to-end full stack development, including frontend frameworks, backend architecture, and database management.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
