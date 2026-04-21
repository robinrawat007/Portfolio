"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 space-y-8 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block mb-4"
        >
          <span className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-purple-500/30 bg-purple-500/20 text-purple-100 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.2)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            </span>
            I build the interfaces that make AI actually work.
          </span>
        </motion.div>

        <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-heading font-extrabold tracking-tight text-white m-0">
          <span className="word-clip"><span className="hero-word">Hi,</span></span>
          {" "}
          <span className="word-clip"><span className="hero-word">I&apos;m</span></span>
          {" "}
          <br className="md:hidden" />
          <span className="word-clip block sm:inline-block">
            <span className="hero-word whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#7B4FE0] via-[#5b6ef1] to-[#2DCFCF] filter drop-shadow-[0_0_20px_rgba(123,79,224,0.3)]">
              Robin Singh Rawat
            </span>
          </span>
        </h1>

        {/* SR: announce the full role only when it changes, not every keystroke */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {roles[roleIndex]}
        </span>
        {/* Visual typing animation — hidden from screen readers */}
        <div className="h-10 md:h-12 flex items-center justify-center" aria-hidden="true">
          <h2 className="text-xl md:text-3xl font-light text-slate-300 leading-relaxed">
            {displayedText}
            <span className="inline-block w-[3px] h-6 md:h-8 bg-[#2DCFCF] ml-1 animate-pulse" />
          </h2>
        </div>

        <motion.p
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          From landing pages to production apps.
          <br />
          AI assistants, RAG chatbots, voice agents, and workflow automation—end to end.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a href="#projects" className="px-8 py-4 min-h-[48px] rounded-full bg-slate-100 text-slate-900 font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] w-full sm:w-auto flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
            View My Work
          </a>
          <a href="#contact" className="px-8 py-4 min-h-[48px] rounded-full border border-slate-600 bg-slate-900/50 backdrop-blur-sm text-white font-bold text-lg hover:bg-slate-800 hover:border-slate-400 hover:scale-105 transition-all duration-300 w-full sm:w-auto flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
            Contact Me
          </a>
        </motion.div>

      </motion.div>

    </section>
  );
}

