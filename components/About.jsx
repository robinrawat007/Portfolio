"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";

export default function About() {
  const [photoError, setPhotoError] = useState(false);
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
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          About Me
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B4FE0] via-[#5b6ef1] to-[#2DCFCF] mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div data-parallax="slow" className="relative w-full max-w-sm mx-auto flex items-center justify-center" style={{ willChange: "transform" }}>
            <div data-parallax="fast" className="absolute inset-0 bg-gradient-to-tr from-[#7B4FE0] to-[#2DCFCF] rounded-full blur-2xl opacity-40 transform scale-110" style={{ willChange: "transform" }}></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-slate-700 shadow-[0_0_30px_rgba(123,79,224,0.3)] overflow-hidden group z-10 aspect-square">
              {!photoError ? (
                <Image
                  src="/profile.jpg"
                  alt="Robin Singh Rawat"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  priority={false}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div
                  className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center"
                  aria-label="Robin Singh Rawat"
                >
                  <span className="font-heading font-extrabold text-5xl md:text-6xl text-slate-100 tracking-tight">
                    RR
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

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
              Your business deserves more than a pretty website. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF]">
                It deserves one that works while you sleep.
              </span>
            </h3>
            <p className="text-lg leading-relaxed text-slate-300 mb-4">
              Every day without a fast, professional online presence is a day your competitors are winning customers you should have. A slow site kills trust in 3 seconds. A confusing app sends leads straight to someone else. A manual process costs you hours you can&apos;t buy back.
            </p>
            <p className="text-lg leading-relaxed text-slate-300 mb-6">
              I build the digital infrastructure that turns visitors into paying clients, automates the repetitive work draining your team, and makes your business look like the obvious choice in your market. <strong>5 years. 10+ businesses served. Results that show up in your revenue, not just your analytics.</strong>
            </p>

            <div className="gsap-card-group grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-700/50">
              {stats.map((stat, index) => (
                <div key={index} className="gsap-card text-center">
                  <div className="text-3xl font-extrabold text-white mb-1 drop-shadow-md">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-300 font-medium uppercase tracking-wider">
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
