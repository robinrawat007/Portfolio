"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          Education
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Academic background and foundational knowledge.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 group relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">
                  Aug 2016 – May 2019
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-1">
                Bachelor of Computer Applications
              </h3>
              <p className="text-xl text-purple-400 font-medium">
                Hindu Institute of Management
              </p>
            </div>

            <div className="hidden md:flex flex-shrink-0 items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 shadow-inner">
              <span className="text-2xl">🎓</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
