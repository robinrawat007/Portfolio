"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Spotlight } from '@/components/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoWrapRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const dividerRef = useRef(null);
  const bottomRef = useRef(null);
  const scrollLineRef = useRef(null);
  const ripplePoolRef = useRef(null);
  const lastRippleRef = useRef(0);
  const lensRef = useRef(null);
  const lensQuickX = useRef(null);
  const lensQuickY = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Scroll indicator travelling line
      gsap.fromTo(
        scrollLineRef.current,
        { y: '-100%' },
        { y: '220%', duration: 1.8, ease: 'power1.inOut', repeat: -1, repeatDelay: 0.5 }
      );

      // Initial hidden states
      gsap.set([line1Ref.current, line2Ref.current], { y: '108%' });
      gsap.set([dividerRef.current, bottomRef.current], { opacity: 0, y: 18 });

      // Cinematic entrance — clip wipe on lines, fade on rest
      const tl = gsap.timeline({ delay: 0.4 });
      tl
        .to(line1Ref.current, { y: '0%', duration: 1.25, ease: 'power4.out' })
        .to(line2Ref.current, { y: '0%', duration: 1.25, ease: 'power4.out' }, '-=0.9')
        .to(dividerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.55');

      // ScrollTrigger — bg/video slow zoom (parallax slow layer)
      gsap.fromTo(
        videoWrapRef.current,
        { scale: 1 },
        {
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      // ScrollTrigger — content fades faster than bg = depth illusion
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: '62% top',
          scrub: 1,
        },
      });

      // Lens — quickTo setters for smooth cursor tracking
      gsap.set(lensRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });
      lensQuickX.current = gsap.quickTo(lensRef.current, 'x', { duration: 0.65, ease: 'power3.out' });
      lensQuickY.current = gsap.quickTo(lensRef.current, 'y', { duration: 0.65, ease: 'power3.out' });
    },
    { scope: sectionRef }
  );

  const spawnRipple = (x, y) => {
    const now = Date.now();
    if (now - lastRippleRef.current < 90) return;
    lastRippleRef.current = now;

    const container = ripplePoolRef.current;
    if (!container) return;

    // Two concentric rings per drop — inner tight, outer slow expansion
    [
      { maxSize: 120, startOpacity: 0.35, duration: 1.4, delay: 0 },
      { maxSize: 220, startOpacity: 0.15, duration: 2.0, delay: 0.12 },
    ].forEach(({ maxSize, startOpacity, duration, delay }) => {
      const ring = document.createElement('div');
      Object.assign(ring.style, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        border: `1px solid rgba(255,255,255,${startOpacity})`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        willChange: 'width, height, opacity',
      });
      container.appendChild(ring);

      gsap.to(ring, {
        width: maxSize,
        height: maxSize,
        opacity: 0,
        duration,
        delay,
        ease: 'power2.out',
        onComplete: () => ring.remove(),
      });
    });
  };

  const getParallax = (e) => {
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    const px = e.clientX - left;
    const py = e.clientY - top;
    const nx = (px / width - 0.5) * 2;
    const ny = (py / height - 0.5) * 2;
    return { px, py, nx, ny };
  };

  // Snap video to correct position instantly on enter — prevents the "push from zero" jump
  const handleMouseEnter = (e) => {
    const { nx, ny } = getParallax(e);
    gsap.set(videoWrapRef.current, { x: nx * -10, y: ny * -7 });
  };

  const handleMouseMove = (e) => {
    const { px, py, nx, ny } = getParallax(e);

    // Subtle parallax drift — reduced magnitude so it feels grounded, not floating
    gsap.to(videoWrapRef.current, {
      x: nx * -10, y: ny * -7,
      duration: 1.2, ease: 'power2.out', overwrite: 'auto',
    });

    gsap.to(overlayRef.current, {
      opacity: 0.78,
      duration: 0.8, ease: 'power2.out', overwrite: 'auto',
    });

    spawnRipple(px, py);

    lensQuickX.current?.(px);
    lensQuickY.current?.(py);
    gsap.to(lensRef.current, { opacity: 1, duration: 0.35, overwrite: 'auto' });
  };

  const handleMouseLeave = () => {
    gsap.to(videoWrapRef.current, {
      x: 0, y: 0,
      duration: 1.8, ease: 'power3.out', overwrite: 'auto',
    });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 1, ease: 'power2.out', overwrite: 'auto',
    });
    gsap.to(lensRef.current, {
      opacity: 0,
      duration: 0.6, ease: 'power2.out', overwrite: 'auto',
    });
  };

  return (
    <>
      <style>{`
        @keyframes hero-drift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <section
        id="hero"
        ref={sectionRef}
        className="relative w-full overflow-hidden flex items-end"
        style={{ height: '100svh', minHeight: '600px', background: '#060608' }}
        aria-labelledby="hero-title"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

        {/* ── Background: animated gradient fallback + video overlay ── */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 z-0"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Fallback gradient — always visible beneath video */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #06060c 0%, #0d0a16 20%, #060c12 40%, #0a0608 60%, #0d0a10 80%, #06060c 100%)',
              backgroundSize: '400% 400%',
              animation: 'hero-drift 30s ease infinite',
            }}
          />
          {/* H.264 MP4 required — re-encode with ffmpeg if generated by AI tool */}
          <video
            className="absolute inset-0 w-full h-full"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ objectFit: 'cover' }}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            <source src="/hero-bg.webm" type="video/webm" />
          </video>
        </div>

        {/* ── Gradient overlay — strong at bottom for text legibility ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.82) 100%)',
          }}
        />

        {/* ── Vignette ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* ── Film grain ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none select-none"
          style={{
            opacity: 0.04,
            mixBlendMode: 'screen',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
          }}
        />

        {/* ── Cursor lens — soft brightening circle that trails the mouse ── */}
        <div
          ref={lensRef}
          className="absolute pointer-events-none"
          style={{
            top: 0,
            left: 0,
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)',
            border: '1px solid rgba(255,255,255,0.07)',
            mixBlendMode: 'soft-light',
            zIndex: 11,
            willChange: 'transform',
          }}
        />

        {/* ── Ripple ring pool ── */}
        <div
          ref={ripplePoolRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 15 }}
        />

        {/* ── Main content ── */}
        <div
          ref={contentRef}
          className="relative z-20 w-full max-w-[1400px] mx-auto px-8 sm:px-14 lg:px-24 pb-20 md:pb-28"
        >

          {/* Headline — two-line clip wipe reveal */}
          <h1
            id="hero-title"
            aria-label="Robin Singh Rawat"
            className="font-heading"
            style={{ margin: 0, lineHeight: 1.0 }}
          >
            {/* Line 1 — solid white */}
            <div style={{ overflow: 'hidden', paddingBottom: '0.5em' }}>
              <span
                ref={line1Ref}
                style={{
                  display: 'block',
                  fontSize: 'clamp(3.8rem, 10.5vw, 11rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.028em',
                  color: '#fff',
                }}
              >
                <Spotlight size={800} blur={24} color="rgba(255,255,255,0.5)" opacity={0.9}>
                  Robin Singh
                </Spotlight>
              </span>
            </div>

            {/* Line 2 — outline ghost text */}
            <div style={{ overflow: 'hidden', paddingBottom: '0.5em' }}>
              <span
                ref={line2Ref}
                style={{
                  display: 'block',
                  fontSize: 'clamp(3.8rem, 10.5vw, 11rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.028em',
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.4)',
                  color: 'transparent',
                }}
              >
                <Spotlight size={800} blur={24} color="rgba(255,255,255,0.3)" opacity={0.75}>
                  Rawat
                </Spotlight>
              </span>
            </div>
          </h1>

          {/* Divider rule */}
          <div
            ref={dividerRef}
            className="mt-8 mb-8"
            style={{
              width: '4rem',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.35) 0%, transparent 100%)',
              opacity: 0,
            }}
          />

          {/* Bottom row — roles left, desc + CTA right */}
          <div
            ref={bottomRef}
            className="flex flex-col sm:flex-row sm:items-end gap-10 sm:gap-20"
            style={{ opacity: 0 }}
          >
            {/* Left — role labels */}
            <div className="flex-shrink-0 space-y-1">
              {['Full Stack Engineer', 'AI Generalist'].map((role) => (
                <p
                  key={role}
                  className="font-semibold uppercase"
                  style={{ fontSize: '9px', letterSpacing: '0.32em', color: 'rgba(255,255,255,0.32)' }}
                >
                  {role}
                </p>
              ))}
            </div>

            {/* Right — description + CTAs */}
            <div className="flex-1 max-w-sm">
              <p
                className="mb-8 leading-relaxed font-light"
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.42)', letterSpacing: '0.015em' }}
              >
                From landing pages to production apps — AI assistants, RAG chatbots,
                voice agents, and workflow automation end to end.
              </p>

              <div className="flex items-center gap-10">
                <a
                  href="#projects"
                  className="group flex items-center gap-4 font-bold uppercase text-white"
                  style={{ fontSize: '10px', letterSpacing: '0.24em' }}
                >
                  View Work
                  <span
                    className="block h-px transition-all duration-500 ease-out group-hover:w-16"
                    style={{ width: '2rem', background: 'rgba(255,255,255,0.5)' }}
                  />
                </a>
                <a
                  href="#contact"
                  className="font-bold uppercase transition-opacity duration-300 hover:opacity-80"
                  style={{ fontSize: '10px', letterSpacing: '0.24em', color: 'rgba(255,255,255,0.25)' }}
                >
                  Let&apos;s Build
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Scroll indicator ── */}
        <div
          className="absolute bottom-10 right-12 md:right-20 z-20 flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span
            className="font-bold uppercase"
            style={{ fontSize: '8px', letterSpacing: '0.44em', color: 'rgba(255,255,255,0.18)', writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
          <div
            className="relative overflow-hidden"
            style={{ width: '1px', height: '64px', background: 'rgba(255,255,255,0.07)' }}
          >
            <div
              ref={scrollLineRef}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', background: 'rgba(255,255,255,0.4)' }}
            />
          </div>
        </div>

      </section>
    </>
  );
}
