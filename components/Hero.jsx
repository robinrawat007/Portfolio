"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import MouseGlow from '@/components/motion/MouseGlow';
import ScrambleText from '@/components/motion/ScrambleText';
import { Magnetic, HoloEffect, Spotlight } from '@/components/motion';

const roles = ["AI Generalist", "Full Stack Engineer", "Workflow Automation Expert"];

const NEON_DOTS = [
  { top: '18%', left: '12%', color: 'var(--neon-yellow)', dur: 2.4, delay: '0s' },
  { top: '68%', left: '22%', color: 'var(--neon-green)', dur: 2.7, delay: '0.7s' },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingEnabled, setTypingEnabled] = useState(false);

  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const pillSvgRef = useRef(null);
  const pillRectRef = useRef(null);
  const hiRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  const typingSpeed = isDeleting ? 50 : 100;

  useEffect(() => {
    if (!typingEnabled) return;
    const currentRole = roles[roleIndex];
    const id = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((p) => (p + 1) % roles.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(id);
  }, [displayedText, isDeleting, roleIndex, typingSpeed, typingEnabled]);

  // Size the SVG pill border to match the pill's rendered dimensions
  useLayoutEffect(() => {
    const pill = pillRef.current;
    const svg = pillSvgRef.current;
    const rect = pillRectRef.current;
    if (!pill || !svg || !rect) return;

    const { width, height } = pill.getBoundingClientRect();
    const rx = height / 2;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    rect.setAttribute('x', '1');
    rect.setAttribute('y', '1');
    rect.setAttribute('width', String(width - 2));
    rect.setAttribute('height', String(height - 2));
    rect.setAttribute('rx', String(rx));
    rect.setAttribute('ry', String(rx));
  }, []);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypingEnabled(true);
      return;
    }

    const pill = pillRef.current;
    const svgRect = pillRectRef.current;
    const hi = hiRef.current;
    const name = nameRef.current;
    const subtitle = subtitleRef.current;
    const desc = descRef.current;
    const cta = ctaRef.current;
    if (!pill || !hi || !name || !subtitle || !desc || !cta) return;

    // Measure SVG stroke length
    let strokeLen = 1000;
    if (svgRect && typeof svgRect.getTotalLength === 'function') {
      strokeLen = svgRect.getTotalLength();
    }

    gsap.set(pill, { opacity: 0 });
    gsap.set(hi, { opacity: 0, y: 28 });
    gsap.set(name, { opacity: 0 });
    gsap.set(subtitle, { opacity: 0 });
    gsap.set(desc, { opacity: 0, y: 16 });

    const ctaChildren = Array.from(cta.children);
    gsap.set(ctaChildren, { opacity: 0, y: 20 });

    if (svgRect) {
      gsap.set(svgRect, {
        attr: { 'stroke-dasharray': strokeLen, 'stroke-dashoffset': strokeLen },
      });
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Name revealed first ("Hi, I'm Robin Singh Rawat")
    tl.to(hi, { opacity: 1, y: 0, duration: 0.6 }, 0)
      .to(name, { opacity: 1, duration: 0.1 }, 0.2);

    // 2. Pill draws in ABOVE the name
    tl.to(pill, { opacity: 1, duration: 0.4 }, 0.8)
      .to(svgRect, { attr: { 'stroke-dashoffset': 0 }, duration: 0.6, ease: 'power2.inOut' }, 0.8);

    // 3. Description reveals BELOW
    tl.to(desc, { opacity: 1, y: 0, duration: 0.6 }, 1.3);

    // 4. CTAs stagger in
    tl.to(ctaChildren, { opacity: 1, y: 0, duration: 0.4, stagger: 0.14 }, 1.5);

    // 5. Enable typing after everything is settled
    tl.call(() => setTypingEnabled(true), [], 1.9)
      .to(subtitle, { opacity: 1, duration: 0.3 }, 1.9);

  }, { scope: containerRef });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      <MouseGlow />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Pulsing neon dots at grid intersections */}
        {NEON_DOTS.map((dot, i) => (
          <div
            key={i}
            className="absolute w-[6px] h-[6px] rounded-full"
            style={{
              top: dot.top,
              left: dot.left,
              background: dot.color,
              boxShadow: `0 0 8px ${dot.color}`,
              animation: `neon-pulse ${dot.dur}s ease-in-out infinite`,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 space-y-8 max-w-4xl mx-auto">

        {/* Status pill with SVG stroke border draw */}
        <div ref={pillRef} className="inline-block mb-4 relative">
          <svg
            ref={pillSvgRef}
            className="absolute inset-0 pointer-events-none overflow-visible"
            fill="none"
            aria-hidden="true"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <rect
              ref={pillRectRef}
              style={{ stroke: 'rgba(0,255,133,0.55)', strokeWidth: '1.5' }}
            />
          </svg>
          <span
            className="flex items-center gap-3 px-5 py-2.5 rounded-full border bg-transparent text-sm font-medium tracking-wide backdrop-blur-md"
            style={{ borderColor: 'transparent', color: 'var(--fg)' }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: 'var(--neon-green)' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)' }}
              />
            </span>
            I build solutions that remove friction and create value.
          </span>
        </div>

        {/* Heading */}
        <h1
          id="hero-title"
          className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold tracking-tight m-0 flex flex-wrap items-baseline justify-center gap-x-4"
          style={{ color: 'var(--fg)' }}
        >
          <span ref={hiRef} className="inline-flex items-baseline">
            Hi, I&apos;m
          </span>
          <br className="md:hidden" />
          {' '}
          {/* Name — ScrambleText with gradient; delay syncs to GSAP reveal at 0.65s */}
          <span ref={nameRef} className="inline-flex items-baseline relative">
            <Spotlight size={300} blur={20}>
              <span
                className="text-transparent bg-clip-text whitespace-nowrap relative z-10"
                style={{ backgroundImage: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }}
              >
                <ScrambleText text="Robin Singh Rawat" delay={0.1} duration={1000} />
              </span>
            </Spotlight>
          </span>
        </h1>

        {/* Typing subtitle with block cursor */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {roles[roleIndex]}
        </span>
        <div
          ref={subtitleRef}
          className="h-10 md:h-12 flex items-center justify-center"
          aria-hidden="true"
        >
          <h2
            className="text-xl md:text-3xl font-light leading-relaxed font-mono"
            style={{ color: 'var(--neon-green)' }}
          >
            {displayedText}
            <span
              className="inline-block align-middle ml-0.5"
              style={{
                color: 'var(--neon-green)',
                animation: 'cursor-blink 1s step-start infinite',
                fontSize: '0.85em',
              }}
              aria-hidden="true"
            >
              █
            </span>
          </h2>
        </div>

        <p
          ref={descRef}
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--fg-muted)' }}
        >
          From landing pages to production apps.
          <br />
          AI assistants, RAG chatbots, voice agents, and workflow automation end to end.
        </p>

        {/* CTAs — Magnetic + CornerBrackets */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
        >
          <a
            href="#projects"
            className="px-8 py-4 min-h-[48px] rounded-lg font-bold text-lg hover:brightness-110 transition-all duration-300 w-full sm:w-auto flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            style={{ background: 'transparent', color: '#fff', border: '1px solid var(--neon-yellow)', boxShadow: '0 0 20px rgba(217,255,0,0.1)' }}
          >
            View My Work
          </a>

          <a
            href="#contact"
            className="px-8 py-4 min-h-[48px] rounded-lg font-bold text-lg transition-all duration-300 w-full sm:w-auto flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ border: '1px solid var(--neon-green)', color: 'var(--fg)', background: 'transparent' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,133,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Contact Me
          </a>
        </div>

      </div>
    </section>
  );
}
