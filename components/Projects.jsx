"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import useSWR from 'swr';
import { supabase } from '@/lib/supabaseClient';
import { Magnetic, Tilt, GlassShapes } from '@/components/motion';
import SplitReveal from '@/components/motion/SplitReveal';

const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('display_order');
  if (error) throw error;
  return data;
};

const SLIDE_INTERVAL = 5000;

function ProjectCard({ proj, onFlip, flipped }) {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (flipped) {
      setShowSparkles(true);
      const t = setTimeout(() => setShowSparkles(false), 2000);
      return () => clearTimeout(t);
    }
  }, [flipped]);

  return (
    <div className="w-full h-full relative">
      <AnimatePresence>
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute left-0 top-1/2">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`l-${i}`}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, Math.random() * 1.5 + 0.5, 0],
                    x: Math.random() * -350 - 50,
                    y: Math.random() * 600 - 300,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 1.2 + Math.random() * 0.5, ease: "easeOut" }}
                  className={`absolute w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-sm ${i % 3 === 0 ? 'bg-neon-yellow' : i % 3 === 1 ? 'bg-neon-green' : 'bg-white'}`}
                  style={{ boxShadow: `0 0 15px ${i % 3 === 0 ? 'rgba(217,255,0,0.8)' : i % 3 === 1 ? 'rgba(0,255,102,0.8)' : 'rgba(255,255,255,0.8)'}` }}
                />
              ))}
            </div>
            <div className="absolute right-0 top-1/2">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`r-${i}`}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, Math.random() * 1.5 + 0.5, 0],
                    x: Math.random() * 350 + 50,
                    y: Math.random() * 600 - 300,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 1.2 + Math.random() * 0.5, ease: "easeOut" }}
                  className={`absolute w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-sm ${i % 3 === 0 ? 'bg-neon-cyan' : i % 3 === 1 ? 'bg-neon-yellow' : 'bg-white'}`}
                  style={{ boxShadow: `0 0 15px ${i % 3 === 0 ? 'rgba(0,255,255,0.8)' : i % 3 === 1 ? 'rgba(217,255,0,0.8)' : 'rgba(255,255,255,0.8)'}` }}
                />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ rotateY: flipped ? 900 : 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full min-h-[500px] z-10"
      >
        {/* FRONT: Clean Full-Image Gallery Look */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="relative w-full min-h-[500px] rounded-3xl overflow-hidden flex flex-col bg-white/[0.03] backdrop-blur-2xl border border-white/[0.12] shadow-2xl group"
        >
          {/* Laminated Glass Finish (Glint & Gloss) */}
          <div className="absolute inset-0 z-30 pointer-events-none opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />
          </div>

          {/* Inner Glass Stroke */}
          <div className="absolute inset-px rounded-[23px] border border-white/[0.08] pointer-events-none z-10" />

          {/* Top Right Controls */}
          <div className="absolute top-6 right-6 z-40 flex items-center gap-3">
            {proj.visit_url && (
              <a
                href={proj.visit_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all shadow-xl"
              >
                <FaExternalLinkAlt className="text-sm" />
              </a>
            )}
            <button
              onClick={() => onFlip(true)}
              className="w-11 h-11 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all shadow-xl"
            >
              <FaEye className="text-lg" />
            </button>
          </div>

          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {proj.image_url ? (
              <Image
                src={proj.image_url}
                alt={proj.title}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-xs text-slate-600">
                Coming soon
              </div>
            )}
            {/* Very subtle vignette for the controls */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
          </div>
        </div>

        {/* BACK: Comprehensive Info Card */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl"
        >
          <div className="absolute inset-px rounded-[23px] border border-white/[0.05] pointer-events-none z-10" />
          <div className="h-2 w-full bg-gradient-to-r from-neon-yellow via-neon-green to-neon-cyan" />

          <div className="p-9 md:p-10 flex flex-col h-full overflow-hidden relative z-20">
            {/* Header with Control Icons */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1 pr-6">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight mb-1">{proj.title}</h3>
                <p className="text-xs md:text-sm font-medium text-neon-green/90 mb-1">{proj.subtitle}</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">{proj.period}</p>
              </div>

              <div className="flex items-center gap-2">
                {proj.visit_url && (
                  <a
                    href={proj.visit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neon-yellow hover:bg-neon-yellow hover:text-black transition-all"
                    title="Launch Project"
                  >
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                )}
                <button
                  onClick={() => onFlip(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all"
                  title="Go Back"
                >
                  <FaChevronLeft className="text-xs" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col space-y-6">
              {/* Tech Stack */}
              <div>
                <h4 className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-3 font-bold">Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {proj.tech?.map((tag) => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Case Study Grid */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  {proj.case_study?.sections?.slice(0, 2).map((s, i) => (
                    <div key={i} className="relative pl-4 border-l border-white/10 group/item">
                      <h5 className="text-[9px] font-bold text-neon-green/70 uppercase tracking-widest mb-1.5 transition-colors group-hover/item:text-neon-yellow">{s.title}</h5>
                      <p className="text-[12px] leading-relaxed text-slate-400/90 font-light line-clamp-4">
                        {s.content}
                      </p>
                    </div>
                  ))}
                </div>

                {proj.case_study?.sections?.[2] && (
                  <div className="relative pl-4 border-l border-white/10 group/item">
                    <h5 className="text-[9px] font-bold text-neon-cyan/70 uppercase tracking-widest mb-1.5 transition-colors group-hover/item:text-neon-yellow">
                      {proj.case_study.sections[2].title}
                    </h5>
                    <p className="text-[12px] leading-relaxed text-slate-400/90 font-light line-clamp-2 md:line-clamp-3">
                      {proj.case_study.sections[2].content}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Footer */}
            <div className="mt-auto pt-6 flex items-center justify-center opacity-10">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-white" />
              <span className="text-[8px] uppercase tracking-[0.5em] px-4 text-white whitespace-nowrap">{proj.id}</span>
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const { data: projects = [], isLoading } = useSWR('projects', fetchProjects);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    if (projects.length) setCurrent((c) => (c + 1) % projects.length);
    setFlipped(false);
  }, [projects.length]);

  const prev = useCallback(() => {
    if (projects.length) setCurrent((c) => (c - 1 + projects.length) % projects.length);
    setFlipped(false);
  }, [projects.length]);

  useEffect(() => {
    if (paused || flipped || projects.length <= 1) return;
    const id = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, flipped, next, projects.length]);

  const currentProject = projects[current];

  return (
    <section id="projects" className="py-24 relative z-10 w-full max-w-4xl mx-auto px-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <GlassShapes />

      <div className="text-center mb-14">
        <SplitReveal
          text="Featured Projects"
          as="h2"
          className="text-3xl md:text-5xl font-bold mb-4"
        />
        <div className="w-24 h-1.5 mx-auto rounded-full mb-6 bg-gradient-to-r from-neon-yellow to-neon-green" />
        <p className="max-w-2xl mx-auto text-lg text-fg-muted">
          A selection of enterprise platforms and dashboards I&apos;ve engineered.
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center min-h-[480px]">
          <div className="h-8 w-8 rounded-full border-2 border-neon-yellow border-t-transparent animate-spin" />
        </div>
      )}

      {!isLoading && projects.length > 0 && currentProject && (
        <div className="relative">
          <div className="relative overflow-hidden min-h-[480px] md:min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full"
              >
                <ProjectCard proj={currentProject} flipped={flipped} onFlip={setFlipped} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {projects.length > 1 && (
            <>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-12 z-10">
                <Magnetic>
                  <button onClick={prev} className="w-10 h-10 rounded-full bg-black/80 border border-white/10 text-neon-green flex items-center justify-center hover:scale-110 transition-transform">
                    <FaChevronLeft />
                  </button>
                </Magnetic>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-12 z-10">
                <Magnetic>
                  <button onClick={next} className="w-10 h-10 rounded-full bg-black/80 border border-white/10 text-neon-green flex items-center justify-center hover:scale-110 transition-transform">
                    <FaChevronRight />
                  </button>
                </Magnetic>
              </div>
            </>
          )}

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setFlipped(false); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  background: i === current ? 'var(--neon-yellow)' : 'rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
