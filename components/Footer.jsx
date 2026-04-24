"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Firecrackers, GlassShapes, Spotlight } from '@/components/motion';

const footerLinks = [
  { name: 'Home', href: '#hero', color: '#D9FF00' },
  { name: 'About', href: '#about', color: '#00FF85' },
  { name: 'Skills', href: '#skills', color: '#FF0080' },
  { name: 'Projects', href: '#projects', color: '#7B4FE0' },
  { name: 'Services', href: '#services', color: '#FF8000' },
  { name: 'Contact', href: '#contact', color: '#80FF00' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full pt-32 pb-12 overflow-hidden bg-black">

      {/* Top Border Scanline */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-neon-yellow/40 to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Content Card */}
        <div className="relative rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 md:p-12 mb-16 overflow-hidden">
          {/* Inner Gloss */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
            {/* Branding Section */}
            <div className="flex flex-col items-center lg:items-start group">
              <a href="#hero" className="mb-6 block relative">
                <div className="relative w-40 h-14 flex items-center justify-start transition-all duration-500 group-hover:scale-105 group-hover:brightness-125 origin-left">
                  <Image
                    src="/Logo.png"
                    alt="Robin logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                {/* Subtle logo reflection/glow */}
                <div className="absolute -bottom-2 left-0 w-full h-4 bg-neon-green/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <p className="text-[9px] font-black text-neon-green/50 uppercase tracking-[0.6em] ml-1">
                Full Stack Alchemist <span className="text-white/10 ml-2">// REV 4.0</span>
              </p>
            </div>

            {/* Navigation & Action Center */}
            <div className="flex flex-wrap justify-center lg:justify-end items-center gap-x-10 gap-y-8">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {footerLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={{ y: -2 }}
                    className="text-[13px] font-bold tracking-wider transition-all text-slate-400 hover:text-white flex items-center gap-3 group/link"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-white/5 transition-all duration-300 group-hover/link:scale-150"
                      style={{ border: `1px solid ${link.color}40` }}
                    />
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Minimalist Return Hub */}
              <div className="flex items-center ml-4 pl-10 border-l border-white/10 h-10">
                <motion.a
                  href="#hero"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-neon-yellow hover:border-neon-yellow/40 hover:shadow-[0_0_20px_rgba(217,255,0,0.15)] transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>

        </div>

        {/* Technical Footer Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-4">
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-black bg-neutral-900 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                    <span className="text-[10px] font-black text-white/20">{i}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">
                © {new Date().getFullYear()}
              </p>
              <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest">Handcrafted with Passion</p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 bg-white/[0.03] px-4 py-2 rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_12px_rgba(0,255,133,0.6)] animate-pulse" />
              <span className="text-[9px] font-black tracking-[0.2em] text-neon-green/60 uppercase">System: Optimized</span>
            </div>
            <div className="hidden lg:flex items-center gap-8">
              <div className="h-4 w-px bg-white/5" />
              <span className="text-[8px] font-black tracking-[0.5em] text-white/10 uppercase hover:text-neon-yellow transition-colors cursor-default">Precision Built</span>
              <span className="text-[8px] font-black tracking-[0.5em] text-white/10 uppercase hover:text-neon-green transition-colors cursor-default">Future Proof</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
