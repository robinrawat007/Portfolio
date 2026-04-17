"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

const projects = [
  {
    title: "Builder Studio",
    subtitle: "No-Code App Development Platform",
    period: "Jan 2021 – Apr 2025",
    tech: ["Angular", "TypeScript", "Bootstrap", "REST APIs"],
    image: null, // add screenshot path here e.g. "/screenshots/builder-studio.png"
    caseStudy: {
      sections: [
        {
          title: "The Problem",
          content: "Non-technical users needed to build custom apps without writing code. Existing tools were too rigid for client-specific business logic — customers needed drag-and-drop flexibility combined with enterprise-grade reliability.",
        },
        {
          title: "Design Decisions",
          content: "Chose a component-based Angular architecture to support modular feature delivery across a large team. Form builders and logic flow engines were built as isolated micro-features, allowing independent iteration.",
        },
        {
          title: "Engineering Approach",
          content: "Built pricing configuration, build automation, and live project preview as first-class RESTful integrations. Strict TypeScript typing eliminated runtime surprises during handoff between teams.",
        },
      ],
      outcomes: [
        "Scaled to serve enterprise clients globally",
        "Drag-and-drop reduced time-to-app significantly",
        "Modular architecture enabled independent delivery",
        "Zero cross-browser layout regressions",
      ],
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
        {
          title: "The Problem",
          content: "Project managers had no real-time visibility into construction milestones. Updates happened in spreadsheets, delays went unnoticed, and there was no single source of truth for live project state.",
        },
        {
          title: "Design Decisions",
          content: "Chose WebSockets over polling to eliminate latency. RxJS streams composed multiple data sources into a single reactive view layer. All components were spec'd in Figma first to reduce engineering back-and-forth.",
        },
        {
          title: "UI/UX Approach",
          content: "Progressive disclosure — summary cards for quick triage, drill-down for details. Color coding and status chips made state legible without reading text.",
        },
      ],
      outcomes: [
        "Real-time milestone visibility across all projects",
        "Eliminated spreadsheet-based status tracking",
        "Figma-to-code fidelity with zero regressions",
        "WebSocket latency under 200ms",
      ],
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
        {
          title: "The Problem",
          content: "Users managing projects, teams, subscriptions, and billing had no unified portal. Context-switching created friction and generated support tickets for tasks that should have been self-serve.",
        },
        {
          title: "Architecture Decisions",
          content: "Next.js + TypeScript for type safety across a shared component library. RBAC implemented at route and component level. Lazy loading and code splitting kept the bundle lean despite the feature surface.",
        },
        {
          title: "Quality & Testing",
          content: "85%+ Jest unit test coverage maintained throughout. Tests written alongside features caught three auth-flow regressions before staging. Code reviews enforced the component library contract.",
        },
      ],
      outcomes: [
        "85%+ Jest unit test coverage",
        "RBAC reduced unauthorized access to zero",
        "Lazy loading cut initial load time significantly",
        "Component library adopted by 2 downstream teams",
      ],
    },
  },
];

const SLIDE_INTERVAL = 3000;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, scale: 0.96 }),
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
        {/* ── FRONT FACE ── */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 glass-card overflow-hidden flex flex-col"
        >
          {/* Eye button */}
          <button
            onClick={() => onFlip(true)}
            aria-label={`View case study for ${proj.title}`}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-slate-300 hover:text-[#2DCFCF] hover:border-[#2DCFCF]/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2DCFCF]"
          >
            <FaEye className="text-sm" />
          </button>

          {/* Screenshot area */}
          <div className="relative w-full h-56 md:h-64 shrink-0 overflow-hidden bg-slate-900">
            {proj.image ? (
              <Image
                src={proj.image}
                alt={`${proj.title} screenshot`}
                fill
                className="object-cover object-top"
              />
            ) : (
              /* Placeholder — replace with screenshot */
              <div className="w-full h-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f2537 100%)',
                }}>
                <div className="text-center space-y-2 opacity-30">
                  <div className="w-16 h-16 mx-auto rounded-xl border-2 border-dashed border-slate-500 flex items-center justify-center">
                    <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-400">Screenshot coming soon</p>
                </div>
                {/* Decorative grid lines */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(123,79,224,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(123,79,224,0.5) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>
            )}
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/90 to-transparent" />
          </div>

          {/* Card info */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-slate-100 mb-1">{proj.title}</h3>
            <p className="text-[#2DCFCF] text-sm font-medium mb-1">{proj.subtitle}</p>
            <p className="text-slate-500 text-xs mb-4">{proj.period}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {proj.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-slate-800/80 border border-slate-700 text-slate-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 glass-card flex flex-col overflow-hidden"
        >
          <div className="h-1 w-full bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF] rounded-t-2xl shrink-0" />

          <div className="p-7 flex flex-col h-full overflow-hidden">
            <div className="flex items-start justify-between mb-5 shrink-0">
              <div>
                <p className="text-[#2DCFCF] text-xs font-semibold uppercase tracking-widest mb-1">Case Study</p>
                <h3 className="text-lg font-bold text-slate-100 pr-6">{proj.title}</h3>
              </div>
              <button
                onClick={() => onFlip(false)}
                aria-label="Flip back to project"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#7B4FE0] hover:bg-[#7B4FE0]/10 hover:border-[#7B4FE0]/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4FE0] shrink-0"
              >
                <FaEyeSlash className="text-sm" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {proj.caseStudy.sections.map((section, i) => (
                <div key={section.title}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-md bg-gradient-to-br from-[#7B4FE0]/40 to-[#2DCFCF]/30 flex items-center justify-center text-[10px] font-bold text-purple-200 shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-xs font-semibold text-slate-200 uppercase tracking-wide">{section.title}</p>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed pl-7">{section.content}</p>
                </div>
              ))}

              <div className="bg-gradient-to-br from-[#7B4FE0]/10 to-[#2DCFCF]/10 border border-[#7B4FE0]/20 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-200 uppercase tracking-wide mb-2">Key Outcomes</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {proj.caseStudy.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-700/50 shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {proj.tech.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-0.5 bg-slate-800/80 border border-slate-700 text-slate-400 rounded-full">
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

  const goTo = useCallback((idx, dir) => {
    setFlipped(false);
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % projects.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + projects.length) % projects.length, -1);
  }, [current, goTo]);

  // Auto-advance — pauses when flipped or user is hovering
  useEffect(() => {
    if (paused || flipped) return;
    const id = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, flipped, next]);

  return (
    <section
      id="projects"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      className="py-24 relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          Featured Projects
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 mx-auto rounded-full mb-6" />
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          A selection of enterprise platforms and dashboards I&apos;ve engineered.{' '}
          <span className="text-slate-500 text-base">
            Hit <FaEye className="inline text-[#2DCFCF] mx-0.5" /> for the case study.
          </span>
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="relative">
        {/* Screen-reader live region — announces slide changes */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {`Project ${current + 1} of ${projects.length}: ${projects[current].title}`}
        </div>

        {/* Card stage */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: '480px' }}
          role="group"
          aria-roledescription="slide"
          aria-label={`${current + 1} of ${projects.length}: ${projects[current].title}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full"
              style={{ minHeight: '480px' }}
            >
              <ProjectCard
                proj={projects[current]}
                flipped={flipped}
                onFlip={setFlipped}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous project"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-12 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#7B4FE0]/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 z-10"
        >
          <FaChevronLeft className="text-sm" />
        </button>
        <button
          onClick={next}
          aria-label="Next project"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-12 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#7B4FE0]/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 z-10"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2.5 mt-8">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to project ${i + 1}`}
            className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
              i === current
                ? 'w-6 h-2 bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF]'
                : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!flipped && !paused && (
        <div className="mt-3 max-w-xs mx-auto h-0.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            key={current}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF]"
          />
        </div>
      )}
    </section>
  );
}
