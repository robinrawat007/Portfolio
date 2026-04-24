"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNewspaper, FaArrowRight } from 'react-icons/fa';
import { Spotlight } from './motion';

export default function Newsletter() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative py-24 px-4 overflow-hidden" id="newsletter">
      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 blur-[120px] opacity-10 rounded-full"
          style={{ background: 'var(--neon-yellow)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        <Spotlight className="glass-card p-8 md:p-12 relative overflow-hidden group border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-yellow/10 border border-neon-yellow/20 mb-6"
              >
                <FaNewspaper className="text-neon-yellow text-sm" />
                <span className="text-neon-yellow text-xs font-bold tracking-widest uppercase">Daily Briefing</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-heading font-black mb-6"
              >
                Stay Ahead with <br />
                <span className="text-gradient">AI Dispatch</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/60 max-w-md leading-relaxed"
              >
                AI news that actually matters. 5 stories, 5 minutes, every morning. No hype, no slop — just what shipped, verified, and worth your time.
              </motion.p>
            </div>

            {/* Right Content / CTA */}
            <div className="flex-shrink-0">
              <motion.a
                href="https://thestackshift.beehiiv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* The "Newspaper" Button */}
                <div className="relative overflow-visible">
                  {/* Decorative "Pages" that unfold */}
                  <AnimatePresence>
                    {isHovered && (
                      <>
                        {/* Page 1 (Right) */}
                        <motion.div
                          initial={{ rotateY: 0, opacity: 0 }}
                          animate={{ rotateY: 30, opacity: 0.4, x: 20 }}
                          exit={{ rotateY: 0, opacity: 0, x: 0 }}
                          className="absolute inset-0 bg-white/20 rounded-xl -z-10 origin-left border border-white/10"
                        />
                        {/* Page 2 (Left) */}
                        <motion.div
                          initial={{ rotateY: 0, opacity: 0 }}
                          animate={{ rotateY: -30, opacity: 0.4, x: -20 }}
                          exit={{ rotateY: 0, opacity: 0, x: 0 }}
                          className="absolute inset-0 bg-white/20 rounded-xl -z-10 origin-right border border-white/10"
                        />
                      </>
                    )}
                  </AnimatePresence>

                  {/* Main Button Surface */}
                  <motion.div
                    animate={isHovered ? { scale: 1.05, y: -5 } : { scale: 1, y: 0 }}
                    className="flex items-center gap-4 px-8 py-5 rounded-xl font-black text-xl transition-all relative z-10"
                    style={{ 
                      background: 'var(--neon-yellow)', 
                      color: '#000',
                      boxShadow: isHovered ? '0 20px 40px rgba(217,255,0,0.3)' : '0 10px 20px rgba(217,255,0,0.1)'
                    }}
                  >
                    <span>READ NOW</span>
                    <motion.div
                      animate={isHovered ? { x: 5, rotate: -45 } : { x: 0, rotate: 0 }}
                    >
                      <FaArrowRight />
                    </motion.div>

                    {/* Subtle "Newspaper Folds" lines */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                      <div className="absolute top-0 left-1/2 w-px h-full bg-black/40" />
                      <div className="absolute top-1/2 left-0 w-full h-px bg-black/40" />
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Shadow Glow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-neon-yellow/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              
              <p className="text-center mt-6 text-xs font-mono text-white/30 tracking-widest uppercase">
                Free • Daily • No Slop
              </p>
            </div>
          </div>

          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-yellow/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-neon-yellow/10 transition-colors" />
        </Spotlight>
      </div>
    </section>
  );
}
