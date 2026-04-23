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
  return (
    <div className="w-full h-full">
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "circOut" }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-full"
        >
          {/* FRONT */}
          <div 
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }} 
            className="relative w-full min-h-[500px] glass-card overflow-hidden flex flex-col"
          >
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {proj.visit_url && (
                <a
                  href={proj.visit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm flex items-center justify-center text-fg-muted hover:text-neon-yellow transition-colors"
                >
                  <FaExternalLinkAlt className="text-sm" />
                </a>
              )}
              <button
                onClick={() => onFlip(true)}
                className="w-9 h-9 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm flex items-center justify-center text-fg-muted hover:text-neon-green transition-colors"
              >
                <FaEye className="text-sm" />
              </button>
            </div>

            <div className="relative w-full h-56 md:h-64 shrink-0 overflow-hidden bg-surface">
              {proj.image_url ? (
                <Image 
                    src={proj.image_url} 
                    alt={proj.title} 
                    fill 
                    className="object-cover object-top" 
                    priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-xs text-slate-600">
                  Coming soon
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-1">{proj.title}</h3>
              <p className="text-sm font-medium mb-1 text-neon-green">{proj.subtitle}</p>
              <p className="text-xs mb-4 text-fg-muted">{proj.period}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {proj.tech?.map((tag) => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-white/5 bg-white/5 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* BACK */}
          <div 
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} 
            className="absolute inset-0 glass-card flex flex-col overflow-hidden bg-surface-2"
          >
            <div className="h-1 w-full bg-gradient-to-r from-neon-yellow to-neon-green" />
            <div className="p-7 flex flex-col h-full overflow-hidden">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold">{proj.title}</h3>
                  <p className="text-xs text-neon-yellow">Case Study</p>
                </div>
                <button onClick={() => onFlip(false)} className="text-fg-muted hover:text-white transition-colors">
                  <FaChevronLeft className="text-lg" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {proj.case_study?.sections?.map((s, i) => (
                  <div key={i} className="mb-5">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-fg-muted mb-1.5 font-bold">{s.title}</h4>
                    <p className="text-xs leading-relaxed text-slate-300">{s.content}</p>
                  </div>
                ))}
              </div>

              {proj.visit_url && (
                <a 
                  href={proj.visit_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-2.5 rounded-lg bg-neon-yellow text-black text-center text-xs font-bold hover:brightness-110 transition-all"
                >
                  Launch Project
                </a>
              )}
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
          A selection of enterprise platforms and dashboards I've engineered.
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
