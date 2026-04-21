"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MouseGlow from '@/components/motion/MouseGlow';

const roles = [
  "AI Generalist",
  "Full Stack Engineer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = isDeleting ? 50 : 100;

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-0 mt-0">
      <MouseGlow />

      {/* Faint neon ambience + grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.07]" style={{ background: 'var(--neon-yellow)' }} />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] rounded-full blur-[180px] opacity-[0.05]" style={{ background: 'var(--neon-green)' }} />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 space-y-8 max-w-4xl mx-auto"
      >
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block mb-4"
        >
          <span className="flex items-center gap-3 px-5 py-2.5 rounded-full border bg-transparent text-[var(--fg)] text-sm font-medium tracking-wide backdrop-blur-md" style={{ borderColor: 'rgba(0,255,133,0.3)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--neon-green)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)' }} />
            </span>
            I build the interfaces that make AI actually work.
          </span>
        </motion.div>

        {/* Name */}
        <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-heading font-extrabold tracking-tight text-white m-0">
          <span className="word-clip"><span className="hero-word">Hi,</span></span>
          {" "}
          <span className="word-clip"><span className="hero-word">I&apos;m</span></span>
          {" "}
          <br className="md:hidden" />
          <span className="word-clip block sm:inline-block">
            <span className="hero-word whitespace-nowrap text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }}>
              Robin Singh Rawat
            </span>
          </span>
        </h1>

        {/* Typing role */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {roles[roleIndex]}
        </span>
        <div className="h-10 md:h-12 flex items-center justify-center" aria-hidden="true">
          <h2 className="text-xl md:text-3xl font-light leading-relaxed font-mono" style={{ color: 'var(--neon-green)' }}>
            {displayedText}
            <span className="inline-block w-[3px] h-6 md:h-8 ml-1 animate-pulse" style={{ background: 'var(--neon-green)' }} />
          </h2>
        </div>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--fg-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          From landing pages to production apps.
          <br />
          AI assistants, RAG chatbots, voice agents, and workflow automation—end to end.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a
            href="#projects"
            className="px-8 py-4 min-h-[48px] rounded-lg font-bold text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 w-full sm:w-auto flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            style={{ background: 'var(--neon-yellow)', color: '#000', boxShadow: '0 0 20px rgba(217,255,0,0.3)' }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 min-h-[48px] rounded-lg font-bold text-lg transition-all duration-300 w-full sm:w-auto flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              border: '1px solid var(--neon-green)',
              color: 'var(--fg)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,133,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Contact Me
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}
