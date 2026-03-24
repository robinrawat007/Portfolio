"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNewspaper } from 'react-icons/fa';

export default function FloatingNewsletter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

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
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF] text-white font-bold shadow-lg hover:scale-105 transition-transform group"
        >
          <FaNewspaper className="text-xl group-hover:rotate-12 transition-transform" />
          <span>Read my newsletter</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
