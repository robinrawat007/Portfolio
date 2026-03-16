import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { label: 'Years Experience', value: '5' },
    { label: 'Projects Completed', value: '10+' },
    { label: 'Satisfied Clients', value: '10+' },
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
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B4FE0] via-[#5b6ef1] to-[#2DCFCF] mx-auto rounded-full"></div>
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
          <div className="relative w-full max-w-sm mx-auto flex items-center justify-center">
            {/* Cool background glowing elements behind the image placeholder */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7B4FE0] to-[#2DCFCF] rounded-full blur-2xl opacity-40 transform scale-110"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-slate-700 shadow-[0_0_30px_rgba(123,79,224,0.3)] overflow-hidden group z-10">
              <img
                src="/profile.jpg"
                alt="Robin Singh Rawat"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
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
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#7B4FE0] rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Engineering Excellence. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF]">
                Driven by what AI can do for real people.
              </span>
            </h3>
            <p className="text-lg leading-relaxed text-slate-300 mb-6">
              AI Integration Developer with <strong>5 years of experience</strong> building fast, scalable applications. My journey from a Senior Frontend Engineer to an AI specialist was fueled by a passion for making Large Language Models accessible and useful in real-world products.
              <br /><br />
              Currently completing the <strong>Outskill AI Accelerator program</strong>, where I mastered RAG systems, prompt engineering, and LLM orchestration. I bridge the gap between complex AI capabilities and intuitive user interfaces.
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
