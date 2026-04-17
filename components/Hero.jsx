"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const roles = [
  "AI Generalist",
  "Full Stack Engineer",
];

// Deterministic star positions via golden-ratio sequence — safe for SSR/hydration.
const PHI = 1.6180339887;
const starParticles = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: `${((i * PHI * 100) % 100).toFixed(2)}%`,
  top: `${((i * PHI * 61.8) % 100).toFixed(2)}%`,
  minOp: (0.3 + (i % 5) * 0.1).toFixed(2),
  dur: `${(2 + (i * 0.18) % 4).toFixed(2)}s`,
  delay: `${((i * 0.27) % 5).toFixed(2)}s`,
  size: i % 4 === 0 ? "2px" : "1px",
}));

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
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {starParticles.map((star) => (
          <div
            key={star.id}
            className="star-particle absolute z-20"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              "--min-op": star.minOp,
              "--dur": star.dur,
              "--delay": star.delay,
            }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-15%] w-[80%] h-[70%] bg-[#7B4FE0]/30 rounded-full blur-[160px] z-10"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[10%] right-[-15%] w-[70%] h-[60%] bg-[#2DCFCF]/20 rounded-full blur-[160px] z-10"
        />
      </div>

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

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-heading font-extrabold tracking-tight text-white m-0">
          Hi, I&apos;m <br className="md:hidden" />
          <span className="block sm:inline whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#7B4FE0] via-[#5b6ef1] to-[#2DCFCF] filter drop-shadow-[0_0_20px_rgba(123,79,224,0.3)]">
            Robin Singh Rawat
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

        <motion.div
          className="flex items-center justify-center gap-6 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <SocialLink href="https://www.linkedin.com/in/robinrawat1/" icon={<FaLinkedin className="w-6 h-6" />} ariaLabel="LinkedIn" />
          <SocialLink href="https://github.com/robinrawat007" icon={<FaGithub className="w-6 h-6" />} ariaLabel="GitHub" />
          <SocialLink href="https://x.com/robinrawat37" icon={<FaXTwitter className="w-6 h-6" />} ariaLabel="X" />
          <SocialLink href="https://www.instagram.com/robinrawat01/" icon={<FaInstagram className="w-6 h-6" />} ariaLabel="Instagram" />
          <SocialLink href="https://wa.me/919416149624" icon={<FaWhatsapp className="w-6 h-6" />} ariaLabel="WhatsApp" />
          <SocialLink href="mailto:robinrawat37@gmail.com" icon={<FaEnvelope className="w-6 h-6" />} ariaLabel="Email" />
        </motion.div>
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-600/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none mix-blend-screen" aria-hidden="true" />
    </section>
  );
}

const SocialLink = ({ href, icon, ariaLabel }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="text-slate-400 hover:text-white hover:-translate-y-1 transition-all duration-300 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
    {icon}
  </a>
);
