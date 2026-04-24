"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import { CardSpotlight } from './motion';

const AnimatedNewspaperIcon = ({ isOpen }) => (
  <div className="relative mr-2 flex-shrink-0" style={{ width: '32px', height: '32px', perspective: '500px' }}>
    <div className="absolute top-1/2 left-1/2 flex-shrink-0" style={{ width: '16px', height: '22px', transform: 'translate(0%, -50%)' }}>

      {/* Right half (Inside right). Fixed in place. */}
      <div className="absolute inset-0 bg-white shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.2)', borderLeft: 'none', borderTopRightRadius: '2px', borderBottomRightRadius: '2px', padding: '3px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '1px', marginBottom: '2px' }} />
        <div style={{ width: '100%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '1px' }} />
        <div style={{ width: '80%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '1px' }} />
        <div style={{ width: '100%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '1px' }} />
        <div style={{ width: '60%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '1px' }} />
      </div>

      {/* Left half (Front cover). Flips open. */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={false}
        animate={{ rotateY: isOpen ? -160 : 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
      >
        {/* Front Cover (Visible when closed) */}
        <div className="absolute inset-0 bg-[#fefefe] shadow-md" style={{ backfaceVisibility: 'hidden', border: '1px solid rgba(0,0,0,0.3)', borderTopLeftRadius: '2px', borderBottomLeftRadius: '2px', padding: '3px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '1px' }} />
          <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.2)', marginBottom: '2px' }} />
          <div style={{ width: '100%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '1px' }} />
          <div style={{ width: '80%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '1px' }} />
          <div style={{ width: '100%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '1px' }} />
          <div style={{ width: '90%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '1px' }} />
        </div>

        {/* Inside Left Page (Visible when open) */}
        <div className="absolute inset-0 bg-white shadow-inner" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', border: '1px solid rgba(0,0,0,0.2)', borderRight: 'none', borderTopLeftRadius: '2px', borderBottomLeftRadius: '2px', padding: '3px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ width: '100%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '1px', marginTop: '4px' }} />
          <div style={{ width: '100%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '1px' }} />
          <div style={{ width: '80%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '1px' }} />
          <div style={{ width: '60%', height: '1.5px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '1px' }} />
        </div>
      </motion.div>
    </div>
  </div>
);

export default function Newsletter() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleReadNow = (e) => {
    e.preventDefault();
    setIsOpening(true);

    // Duration of the animation before navigation
    setTimeout(() => {
      window.open("https://aidispatch1.beehiiv.com/", "_blank", "noopener,noreferrer");
      // Reset state after a delay so it's ready if they come back
      setTimeout(() => setIsOpening(false), 500);
    }, 700);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden" id="newsletter">

      <div className="max-w-5xl mx-auto">
        <CardSpotlight className="glass-card p-8 md:p-12 border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">

            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 mb-6 group/logo"
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 group-hover/logo:border-neon-yellow/30 transition-colors">
                  <Image
                    src="/NL-Logo.png"
                    alt="AI Dispatch Logo"
                    fill
                    className="object-cover"
                  />
                </div>
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
              <motion.button
                onClick={(e) => {
                  if (isOpening) return;
                  handleReadNow(e);
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black text-lg transition-all overflow-hidden focus:outline-none ${isOpening ? 'cursor-default' : 'cursor-pointer'}`}
                style={{ background: 'var(--neon-yellow)', color: '#000' }}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(217,255,0,0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedNewspaperIcon isOpen={isOpening} />
                <span>READ NOW</span>
                <motion.div animate={isHovered ? { x: 4 } : { x: 0 }}>
                  <FaArrowRight className="text-sm opacity-80" />
                </motion.div>
              </motion.button>

              <p className="text-center mt-6 text-xs font-mono text-white/30 tracking-widest uppercase">
                Free • Daily • No Slop
              </p>
            </div>
          </div>

          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-yellow/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover/card-spotlight:bg-neon-yellow/10 transition-colors pointer-events-none" />
        </CardSpotlight>
      </div>
    </section>
  );
}
