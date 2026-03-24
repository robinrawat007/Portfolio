"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AIProjectsComingSoon() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-1 rounded-[2rem] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#7B4FE0] via-[#2DCFCF] to-[#7B4FE0] animate-gradient-xy bg-[length:200%_200%] opacity-70 blur-sm group-hover:opacity-100 transition-opacity" />
          
          <div className="relative bg-slate-900 rounded-[1.9rem] p-12 md:p-20 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
                AI Projects — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF]">Coming Soon</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF] mx-auto rounded-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              Currently completing the Outskill AI Accelerator program. 
              First AI projects shipping in 30 days. Follow the journey 
              at The Stack Shift newsletter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
            >
              <a
                href="https://thestackshift.beehiiv.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to The Stack Shift newsletter"
                className="px-10 py-5 min-h-[48px] rounded-full bg-gradient-to-r from-[#7B4FE0] to-[#5b6ef1] text-white font-bold text-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(123,79,224,0.4)] transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Subscribe to Newsletter →
              </a>
              <a
                href="https://topmate.io/robin_singh_rawat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a call on Topmate"
                className="px-10 py-5 min-h-[48px] rounded-full border-2 border-[#2DCFCF]/30 bg-[#2DCFCF]/5 backdrop-blur-sm text-[#2DCFCF] font-bold text-xl hover:bg-[#2DCFCF]/10 hover:border-[#2DCFCF] hover:scale-105 transition-all flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2DCFCF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Book a Call
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#7B4FE0]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-[#2DCFCF]/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
