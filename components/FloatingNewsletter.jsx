"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNewspaper } from 'react-icons/fa';

export default function FloatingNewsletter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          href="https://thestackshift.beehiiv.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read my newsletter - The Stack Shift"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-lg font-bold shadow-lg transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ background: 'var(--neon-yellow)', color: '#000', boxShadow: '0 0 20px rgba(217,255,0,0.35)', '--tw-ring-color': 'var(--neon-yellow)' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(217,255,0,0.5)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 20px rgba(217,255,0,0.35)'; }}
        >
          <FaNewspaper className="text-xl group-hover:rotate-12 transition-transform" />
          <span>Read my newsletter</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
