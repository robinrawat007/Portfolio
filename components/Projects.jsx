"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import SplitReveal from '@/components/motion/SplitReveal';
import { Magnetic, CornerBrackets } from '@/components/motion';

const projects = [
  {
    title: "Builder Studio",
    subtitle: "No-Code App Development Platform",
    period: "Jan 2021 – Apr 2025",
    tech: ["Angular", "TypeScript", "Bootstrap", "REST APIs"],
    image: null,
    caseStudy: {
      sections: [
        { title: "The Problem", content: "Non-technical users needed to build custom apps without writing code. Existing tools were too rigid for client-specific business logic — customers needed drag-and-drop flexibility combined with enterprise-grade reliability." },
        { title: "Design Decisions", content: "Chose a component-based Angular architecture to support modular feature delivery across a large team. Form builders and logic flow engines were built as isolated micro-features, allowing independent iteration." },
        { title: "Engineering Approach", content: "Built pricing configuration, build automation, and live project preview as first-class RESTful integrations. Strict TypeScript typing eliminated runtime surprises during handoff between teams." },
      ],
      outcomes: ["Scaled to serve enterprise clients globally", "Drag-and-drop reduced time-to-app significantly", "Modular architecture enabled independent delivery", "Zero cross-browser layout regressions"],
    },
  },
  {
    title: "Builder Tracker",
    subtitle: "Real-Time Project Tracking Dashboard",
    period: "Jan 2021 – Apr 2025",
    tech: ["Angular", "RxJS", "WebSockets", "Figma"],
    image: null,
    caseStudy: {
      sections: [
        { title: "The Problem", content: "Project managers had no real-time visibility into construction milestones. Updates happened in spreadsheets, delays went unnoticed, and there was no single source of truth for live project state." },
        { title: "Design Decisions", content: "Chose WebSockets over polling to eliminate latency. RxJS streams composed multiple data sources into a single reactive view layer. All components were spec'd in Figma first to reduce engineering back-and-forth." },
        { title: "UI/UX Approach", content: "Progressive disclosure — summary cards for quick triage, drill-down for details. Color coding and status chips made state legible without reading text." },
      ],
      outcomes: ["Real-time milestone visibility across all projects", "Eliminated spreadsheet-based status tracking", "Figma-to-code fidelity with zero regressions", "WebSocket latency under 200ms"],
    },
  },
  {
    title: "Builder Home",
    subtitle: "User Onboarding & Account Portal",
    period: "Jan 2021 – Apr 2025",
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Jest"],
    image: null,
    caseStudy: {
      sections: [
        { title: "The Problem", content: "Users managing projects, teams, subscriptions, and billing had no unified portal. Context-switching created friction and generated support tickets for tasks that should have been self-serve." },
        { title: "Architecture Decisions", content: "Next.js + TypeScript for type safety across a shared component library. RBAC implemented at route and component level. Lazy loading and code splitting kept the bundle lean despite the feature surface." },
        { title: "Quality & Testing", content: "85%+ Jest unit test coverage maintained throughout. Tests written alongside features caught three auth-flow regressions before staging. Code reviews enforced the component library contract." },
      ],
      outcomes: ["85%+ Jest unit test coverage", "RBAC reduced unauthorized access to zero", "Lazy loading cut initial load time significantly", "Component library adopted by 2 downstream teams"],
    },
  },
];

const SLIDE_INTERVAL = 3000;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 1 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: { x: 0, opacity: 0, scale: 0.92 },
};

function ProjectCard({ proj, onFlip, flipped }) {
  return (
    <div style={{ perspective: '1400px' }} className="w-full h-full">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* FRONT */}
        <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }} className="absolute inset-0 glass-card overflow-hidden flex flex-col">
          <button
            onClick={() => onFlip(true)}
            aria-label={`View case study for ${proj.title}`}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--fg-muted)', '--tw-ring-color': 'var(--neon-yellow)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--neon-yellow)'; e.currentTarget.style.borderColor = 'rgba(217,255,0,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <FaEye className="text-sm" />
          </button>

          <div className="relative w-full h-56 md:h-64 shrink-0 overflow-hidden" style={{ background: 'var(--surface)' }}>
            {proj.image ? (
              <Image src={proj.image} alt={`${proj.title} screenshot`} fill className="object-cover object-top" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 100%)' }}>
                <div className="text-center space-y-2 opacity-30">
                  <div className="w-16 h-16 mx-auto rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center">
                    <svg className="w-7 h-7 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-600">Screenshot coming soon</p>
                </div>
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(217,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,255,0,0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)' }} />
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--fg)' }}>{proj.title}</h3>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--neon-green)' }}>{proj.subtitle}</p>
            <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>{proj.period}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {proj.tech.map((tag) => (
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
              {proj.caseStudy.sections.map((section, i) => (
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

              <div className="rounded-xl p-4" style={{ background: 'rgba(217,255,0,0.05)', border: '1px solid rgba(217,255,0,0.15)' }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--fg)' }}>Key Outcomes</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {proj.caseStudy.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--fg-muted)' }}>
                      <span className="shrink-0 mt-0.5" style={{ color: 'var(--neon-green)' }}>✓</span>
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t shrink-0" style={{ borderColor: 'var(--border)' }}>
              <div className="flex flex-wrap gap-1.5">
                {proj.tech.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx, dir) => { setFlipped(false); setDirection(dir); setCurrent(idx); }, []);
  const next = useCallback(() => goTo((current + 1) % projects.length, 1), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + projects.length) % projects.length, -1), [current, goTo]);

  useEffect(() => {
    if (paused || flipped) return;
    const id = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, flipped, next]);

  return (
    <section id="projects" role="region" aria-roledescription="carousel" aria-label="Featured projects" className="py-24 relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
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

      <div className="relative">
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {`Project ${current + 1} of ${projects.length}: ${projects[current].title}`}
        </div>

        <div className="relative overflow-hidden" data-cursor="drag" style={{ minHeight: '480px' }} role="group" aria-roledescription="slide" aria-label={`${current + 1} of ${projects.length}: ${projects[current].title}`} tabIndex={0} onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); next(); } if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); } }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div key={current} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }} className="w-full" style={{ minHeight: '480px' }}>
              <ProjectCard proj={projects[current]} flipped={flipped} onFlip={setFlipped} />
            </motion.div>
          </AnimatePresence>
        </div>

        <Magnetic className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-12 z-10">
          <CornerBrackets>
            <button
              onClick={prev}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2"
              style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid var(--border)', color: 'var(--neon-green)', '--tw-ring-color': 'var(--neon-yellow)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,133,0.5)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,133,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; }}
            >
              <FaChevronLeft className="text-sm" />
            </button>
          </CornerBrackets>
        </Magnetic>

        <Magnetic className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-12 z-10">
          <CornerBrackets>
            <button
              onClick={next}
              aria-label="Next project"
              className="w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2"
              style={{ background: 'rgba(10,10,10,0.8)', border: '1px solid var(--border)', color: 'var(--neon-green)', '--tw-ring-color': 'var(--neon-yellow)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,133,0.5)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,133,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; }}
            >
              <FaChevronRight className="text-sm" />
            </button>
          </CornerBrackets>
        </Magnetic>
      </div>

      <div className="flex items-center justify-center gap-2.5 mt-8">
        {projects.map((_, i) => (
          <button key={i} onClick={() => goTo(i, i > current ? 1 : -1)} aria-label={`Go to project ${i + 1}`} className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2" style={{ width: i === current ? '24px' : '8px', height: '8px', background: i === current ? 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' : 'rgba(255,255,255,0.15)', '--tw-ring-color': 'var(--neon-yellow)' }} />
        ))}
      </div>

      {!flipped && !paused && (
        <div className="mt-3 max-w-xs mx-auto h-0.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
          <motion.div key={current} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }} className="h-full" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
        </div>
      )}
    </section>
  );
}
