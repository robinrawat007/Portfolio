import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
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
          <span className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-200 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            Frontend Developer based in Haryana, India
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-white m-0">
          Hi, I'm <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 filter drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            Robin Singh Rawat
          </span>
        </h1>

        <motion.h2
          className="text-xl md:text-3xl font-light text-slate-300 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Crafting fast, scalable, and beautifully interactive web & mobile applications.
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a href="#projects" className="px-8 py-4 rounded-full bg-slate-100 text-slate-900 font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] w-full sm:w-auto">
            View My Work
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full border border-slate-600 bg-slate-900/50 backdrop-blur-sm text-white font-bold text-lg hover:bg-slate-800 hover:border-slate-400 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
            Contact Me
          </a>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <SocialLink href="https://linkedin.com/in/robinrawat1" icon={<FaLinkedin className="w-6 h-6" />} />
          <SocialLink href="mailto:robinrawat37@gmail.com" icon={<FaEnvelope className="w-6 h-6" />} />
        </motion.div>
      </motion.div>

      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-600/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none mix-blend-screen" />
    </section>
  );
}

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 hover:text-white hover:-translate-y-1 transition-all duration-300"
  >
    {icon}
  </a>
);
