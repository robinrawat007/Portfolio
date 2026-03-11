import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { label: 'Years Experience', value: '4+' },
    { label: 'Projects Completed', value: '10+' },
    { label: 'Test Coverage', value: '85%+' },
  ];

  return (
    <section id="about" className="py-24 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          About Me
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left side: Images/Visuals */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Cool background glowing elements behind the image placeholder */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-emerald-400 rounded-3xl transform rotate-6 opacity-50 blur-2xl"></div>
            <div className="absolute inset-0 bg-slate-800 rounded-3xl transform -rotate-3 border border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Using a placeholder aesthetic inside */}
              <div className="text-center p-8 space-y-4">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full mx-auto flex items-center justify-center border border-purple-500/50">
                  <span className="text-4xl font-heading font-bold text-purple-300">RR</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-200">Robin Rawat</h3>
                <p className="text-emerald-400 font-medium">Frontend Developer</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side: Text and Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="glass-card p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Engineering Excellence. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Driven by Performance.
              </span>
            </h3>
            <p className="text-lg leading-relaxed text-slate-300 mb-6">
              Frontend Developer with <strong>4+ years of experience</strong> building fast, scalable web and mobile applications using <strong>Angular, React, and React Native</strong>.
              <br /><br />
              Strong expertise in state management, REST API integration, and performance optimization. Proven contributor in Agile teams with a focus on code quality and user-centric solutions.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-700/50">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-extrabold text-white mb-1 drop-shadow-md">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
