"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import useSWR from 'swr';
import { supabase } from '@/lib/supabaseClient';
import SplitReveal from '@/components/motion/SplitReveal';
import { Magnetic, HoloEffect, Tilt, GlassShapes } from '@/components/motion';

const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('display_order');
  if (error) throw error;
  return data;
};

const SLIDE_INTERVAL = 3000;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.8, z: -100 }),
  center: { x: 0, opacity: 1, scale: 1, z: 0 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.8, z: -100 }),
};

function ProjectCard({ proj, onFlip, flipped }) {
  return (
    <div style={{ perspective: '1400px' }} className="w-full h-full">
      <Tilt intensity={10} glare={true} scale={1.02}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-full"
        >
          {/* FRONT */}
          <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }} className="absolute inset-0 glass-card overflow-hidden flex flex-col">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {proj.visit_url && (
                <a
                  href={proj.visit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${proj.title}`}
                  className="w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--fg-muted)', '--tw-ring-color': 'var(--neon-yellow)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--neon-yellow)'; e.currentTarget.style.borderColor = 'rgba(217,255,0,0.4)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <FaExternalLinkAlt className="text-sm" />
                </a>
              )}
              <button
                onClick={() => onFlip(true)}
                aria-label={`View case study for ${proj.title}`}
                className="w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--fg-muted)', '--tw-ring-color': 'var(--neon-yellow)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--neon-yellow)'; e.currentTarget.style.borderColor = 'rgba(217,255,0,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                <FaEye className="text-sm" />
              </button>
            </div>

            <div className="relative w-full h-56 md:h-64 shrink-0 overflow-hidden" style={{ background: 'var(--surface)' }}>
              {proj.image_url ? (
                <Image src={proj.image_url} alt={`${proj.title} screenshot`} fill className="object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 100%)' }}>
                  {/* ... placeholder content ... */}
                  <p className="text-xs text-slate-600">Screenshot coming soon</p>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)' }} />
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--fg)' }}>{proj.title}</h3>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--neon-green)' }}>{proj.subtitle}</p>
              <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>{proj.period}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {(proj.tech ?? []).map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* BACK */}
          <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} className="absolute inset-0 glass-card flex flex-col overflow-hidden">
            <div className="h-1 w-full rounded-t-2xl shrink-0" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />

            <div className="p-7 flex flex-col h-full overflow-hidden">
              <div className="flex items-start justify-between mb-5 shrink-0">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--neon-green)' }}>Case Study</p>
                  <h3 className="text-lg font-bold pr-6" style={{ color: 'var(--fg)' }}>{proj.title}</h3>
                </div>
                <button
                  onClick={() => onFlip(false)}
                  aria-label="Flip back to project"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--fg-muted)', '--tw-ring-color': 'var(--neon-yellow)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--neon-yellow)'; e.currentTarget.style.background = 'rgba(217,255,0,0.08)'; e.currentTarget.style.borderColor = 'rgba(217,255,0,0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <FaEyeSlash className="text-sm" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {(proj.case_study?.sections ?? []).map((section, i) => (
                  <div key={section.title}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: 'rgba(217,255,0,0.12)', color: 'var(--neon-yellow)' }}>
                        {i + 1}
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--fg)' }}>{section.title}</p>
                    </div>
                    <p className="text-xs leading-relaxed pl-7" style={{ color: 'var(--fg-muted)' }}>{section.content}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 mt-3 border-t shrink-0" style={{ borderColor: 'var(--border)' }}>
                <div className="flex flex-wrap gap-1.5">
                  {(proj.tech ?? []).map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Tilt>
    </div>
  );
}

export default function Projects() {
  const { data: projects = [], isLoading } = useSWR('projects', fetchProjects, { revalidateOnFocus: false });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx, dir) => { setFlipped(false); setDirection(dir); setCurrent(idx); }, []);
  const next = useCallback(() => { if (projects.length) goTo((current + 1) % projects.length, 1); }, [current, goTo, projects.length]);
  const prev = useCallback(() => { if (projects.length) goTo((current - 1 + projects.length) % projects.length, -1); }, [current, goTo, projects.length]);

  useEffect(() => {
    if (paused || flipped || !projects.length) return;
    const id = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, flipped, next, projects.length]);

  const safeIndex = projects.length ? Math.min(current, projects.length - 1) : 0;
  const currentProject = projects[safeIndex];

  return (
    <section id="projects" role="region" aria-roledescription="carousel" aria-label="Featured projects" className="py-24 relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <GlassShapes />
      <div className="text-center mb-14">
        <SplitReveal
          text="Featured Projects"
          as="h2"
          className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight"
          style={{ color: 'var(--fg)' }}
        />
        <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
        <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--fg-muted)' }}>
          A selection of enterprise platforms and dashboards I&apos;ve engineered.{' '}
          <span className="text-base" style={{ color: '#444' }}>
            Hit <FaEye className="inline mx-0.5" style={{ color: 'var(--neon-green)' }} /> for the case study.
          </span>
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center" style={{ minHeight: '480px' }}>
          <div className="h-8 w-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--neon-yellow)', borderTopColor: 'transparent' }} />
        </div>
      )}

      {!isLoading && projects.length > 0 && currentProject && (
        <div className="relative">
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {`Project ${safeIndex + 1} of ${projects.length}: ${currentProject.title}`}
          </div>

          <div className="relative overflow-hidden" data-cursor="drag" style={{ minHeight: '480px' }} role="group" aria-roledescription="slide" aria-label={`${safeIndex + 1} of ${projects.length}: ${currentProject.title}`} tabIndex={0} onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); next(); } if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); } }}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div key={safeIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }} className="w-full" style={{ minHeight: '480px' }}>
                <ProjectCard proj={currentProject} flipped={flipped} onFlip={setFlipped} />
              </motion.div>
            </AnimatePresence>
          </div>

          <Magnetic className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-12 z-10">
            <HoloEffect mode="scan" color="var(--neon-green)">
              <button onClick={prev} aria-label="Previous project" className="w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2" style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid var(--border)', color: 'var(--neon-green)', '--tw-ring-color': 'var(--neon-yellow)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,133,0.5)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,133,0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; }}>
                <FaChevronLeft className="text-sm" />
              </button>
            </HoloEffect>
          </Magnetic>

          <Magnetic className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-12 z-10">
            <HoloEffect mode="scan" color="var(--neon-green)">
              <button onClick={next} aria-label="Next project" className="w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2" style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid var(--border)', color: 'var(--neon-green)', '--tw-ring-color': 'var(--neon-yellow)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,133,0.5)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,133,0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; }}>
                <FaChevronRight className="text-sm" />
              </button>
            </HoloEffect>
          </Magnetic>

          <div className="flex items-center justify-center gap-2.5 mt-8">
            {projects.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > safeIndex ? 1 : -1)} aria-label={`Go to project ${i + 1}`} className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2" style={{ width: i === safeIndex ? '24px' : '8px', height: '8px', background: i === safeIndex ? 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' : 'rgba(255,255,255,0.15)', '--tw-ring-color': 'var(--neon-yellow)' }} />
            ))}
          </div>

          {!flipped && !paused && (
            <div className="mt-3 max-w-xs mx-auto h-0.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
              <motion.div key={safeIndex} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }} className="h-full" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
