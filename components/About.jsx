"use client";

import React, { useRef, useState } from 'react';
import Image from "next/image";
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitReveal from '@/components/motion/SplitReveal';
import CountUp from '@/components/motion/CountUp';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Years Experience',  value: 5,   suffix: '' },
  { label: 'Projects Completed', value: 10, suffix: '+' },
  { label: 'Satisfied Clients',  value: 10, suffix: '+' },
];

export default function About() {
  const [photoError, setPhotoError]       = useState(false);
  const [ringHovered, setRingHovered]     = useState(false);
  const sweepBarRef                       = useRef(null);
  const sectionRef                        = useRef(null);

  useGSAP(() => {
    const bar = sweepBarRef.current;
    if (!bar) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(bar, { scaleX: 1 });
      return;
    }
    gsap.fromTo(bar,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 0.45,
        ease: 'power2.out',
        scrollTrigger: { trigger: bar, start: 'top 84%', once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-16">
        <SplitReveal
          text="About Me"
          as="h2"
          className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight"
          style={{ color: 'var(--fg)' }}
        />
        <div
          className="w-24 h-1.5 mx-auto rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Photo with rotating neon ring */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full max-w-sm mx-auto flex items-center justify-center">
            {/* Rotating conic-gradient ring */}
            <div
              className="absolute -inset-3 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, var(--neon-yellow) 0%, var(--neon-green) 50%, var(--neon-yellow) 100%)',
                animation: `ring-rotate ${ringHovered ? '2s' : '8s'} linear infinite`,
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 5px), white calc(100% - 4px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 5px), white calc(100% - 4px))',
                transition: 'animation-duration 0.4s ease',
              }}
            />
            <div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 overflow-hidden z-10 aspect-square group"
              style={{ borderColor: 'transparent' }}
              onMouseEnter={() => setRingHovered(true)}
              onMouseLeave={() => setRingHovered(false)}
            >
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
                  className="h-full w-full flex items-center justify-center"
                  style={{ background: 'var(--surface)' }}
                  aria-label="Robin Singh Rawat"
                >
                  <span
                    className="font-heading font-extrabold text-5xl md:text-6xl tracking-tight"
                    style={{ color: 'var(--fg)' }}
                  >
                    RR
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-card p-8 relative overflow-hidden group">
            <div
              className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full blur-3xl opacity-8 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'var(--neon-yellow)' }}
            />

            <h3 className="text-2xl font-heading font-bold mb-4" style={{ color: 'var(--fg)' }}>
              Your business deserves more than a pretty website.{' '}
              <br />
              <span className="text-gradient">
                It deserves one that{' '}
                {/* Sweep highlight on "works while you sleep" */}
                <span className="relative inline-block">
                  works while you sleep
                  <span
                    ref={sweepBarRef}
                    className="absolute inset-x-0 -inset-y-0.5 pointer-events-none rounded-sm"
                    style={{
                      background: 'rgba(217,255,0,0.18)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left center',
                    }}
                    aria-hidden="true"
                  />
                </span>
                .
              </span>
            </h3>

            <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
              Every day without a fast, professional online presence is a day your competitors
              are winning customers you should have. A slow site kills trust in 3 seconds. A
              confusing app sends leads straight to someone else. A manual process costs you
              hours you can&apos;t buy back.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--fg-muted)' }}>
              I build the digital infrastructure that turns visitors into paying clients,
              automates the repetitive work draining your team, and makes your business look
              like the obvious choice in your market.{' '}
              <strong style={{ color: 'var(--fg)' }}>
                5 years. 10+ businesses served. Results that show up in your revenue, not just your analytics.
              </strong>
            </p>

            <div
              className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-extrabold mb-1 drop-shadow-md font-mono" style={{ color: 'var(--neon-yellow)' }}>
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
