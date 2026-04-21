"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AIProjectsComingSoon() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-0.5 rounded-[2rem] overflow-hidden group"
          style={{ background: 'linear-gradient(135deg, var(--neon-yellow), var(--neon-green))' }}
        >
          <div className="relative rounded-[1.85rem] p-12 md:p-20 text-center space-y-8" style={{ background: 'var(--bg)' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
                AI Projects — <span className="text-gradient">Coming Soon</span>
              </h2>
              <div className="w-24 h-1.5 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Currently completing the Outskill AI Accelerator program.
              First AI projects shipping in 30 days. Follow the journey
              at The Stack Shift newsletter.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <a
                href="https://thestackshift.beehiiv.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to The Stack Shift newsletter"
                className="px-10 py-5 min-h-[48px] rounded-lg font-bold text-xl transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:scale-105"
                style={{ background: 'var(--neon-yellow)', color: '#000', boxShadow: '0 0 25px rgba(217,255,0,0.3)', '--tw-ring-color': 'var(--neon-yellow)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 35px rgba(217,255,0,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(217,255,0,0.3)'; }}
              >
                Subscribe to Newsletter →
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(217,255,0,0.06)' }} />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(0,255,133,0.05)' }} />
    </section>
  );
}
