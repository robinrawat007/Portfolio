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
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight" style={{ color: 'var(--fg)' }}>
          About Me
        </h2>
        <div className="w-24 h-1.5 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
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
            <div data-parallax="fast" className="absolute inset-0 rounded-full blur-2xl opacity-30 transform scale-110" style={{ background: 'linear-gradient(135deg, var(--neon-yellow), var(--neon-green))', willChange: "transform" }} />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 overflow-hidden group z-10 aspect-square" style={{ borderColor: 'var(--neon-yellow)', boxShadow: '0 0 30px rgba(217,255,0,0.2)' }}>
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
                <div className="h-full w-full flex items-center justify-center" style={{ background: 'var(--surface)' }} aria-label="Robin Singh Rawat">
                  <span className="font-heading font-extrabold text-5xl md:text-6xl tracking-tight" style={{ color: 'var(--fg)' }}>
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
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full blur-3xl opacity-8 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" style={{ background: 'var(--neon-yellow)' }} />

            <h3 className="text-2xl font-heading font-bold mb-4" style={{ color: 'var(--fg)' }}>
              Your business deserves more than a pretty website. <br />
              <span className="text-gradient">
                It deserves one that works while you sleep.
              </span>
            </h3>
            <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
              Every day without a fast, professional online presence is a day your competitors are winning customers you should have. A slow site kills trust in 3 seconds. A confusing app sends leads straight to someone else. A manual process costs you hours you can&apos;t buy back.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--fg-muted)' }}>
              I build the digital infrastructure that turns visitors into paying clients, automates the repetitive work draining your team, and makes your business look like the obvious choice in your market. <strong style={{ color: 'var(--fg)' }}>5 years. 10+ businesses served. Results that show up in your revenue, not just your analytics.</strong>
            </p>

            <div className="gsap-card-group grid grid-cols-3 gap-4 pt-6 mt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              {stats.map((stat, index) => (
                <div key={index} className="gsap-card text-center">
                  <div className="text-3xl font-extrabold mb-1 drop-shadow-md" style={{ color: 'var(--neon-yellow)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>
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
