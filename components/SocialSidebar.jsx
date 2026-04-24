"use client";
import React, { useRef } from "react";
import { socialLinks } from "@/lib/socialLinks";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Magnetic, PopSmoke } from "@/components/motion";

export default function SocialSidebar() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Entrance animation
    gsap.from(".social-item", {
      opacity: 0,
      scale: 0.5,
      stagger: 0.1,
      duration: 1,
      ease: "back.out(1.7)",
    });

    // Idle floating animation
    gsap.to(containerRef.current, {
      y: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: containerRef });

  return (
    <aside
      ref={containerRef}
      className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 py-4 px-2.5 rounded-2xl backdrop-blur-md shadow-xl shadow-black/40"
      style={{ background: 'rgba(10,10,10,0.7)', border: '1px solid var(--border)' }}
      aria-label="Social links"
    >
      {socialLinks.map(({ id, label, href, Icon, placeholder }) => {
        const itemContent = placeholder ? (
          <span
            key={id}
            title="Coming soon"
            className="social-item flex h-10 w-10 items-center justify-center rounded-xl cursor-not-allowed opacity-40 group relative"
            style={{ color: 'var(--fg-muted)' }}
            aria-label={`${label} (coming soon)`}
          >
            <Icon className="h-5 w-5" aria-hidden />
            <div 
              className="absolute top-1/2 px-3 py-1.5 bg-[#111] border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest rounded-md opacity-0 -ml-2 group-hover:ml-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-2xl whitespace-nowrap z-[100] flex items-center"
              style={{ left: '56px', transform: 'translateY(-50%)' }}
            >
              {label} <span className="text-white/40 lowercase ml-1.5">(soon)</span>
            </div>
          </span>
        ) : (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="social-item flex h-10 w-10 items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group relative"
            style={{ color: 'var(--fg-muted)', '--tw-ring-color': 'var(--neon-yellow)' }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                color: '#D9FF00', // var(--neon-yellow)
                background: 'rgba(217,255,0,0.12)',
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                color: '#888888', // var(--fg-muted)
                background: 'transparent',
                duration: 0.3,
              });
            }}
          >
            <Icon className="h-5 w-5" aria-hidden />
            <div 
              className="absolute top-1/2 px-3 py-1.5 bg-[#111] border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest rounded-md opacity-0 -ml-2 group-hover:ml-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-2xl whitespace-nowrap z-[100] flex items-center"
              style={{ left: '56px', transform: 'translateY(-50%)' }}
            >
              {label}
            </div>
          </a>
        );

        return (
          <Magnetic key={id}>
            <PopSmoke>
              {itemContent}
            </PopSmoke>
          </Magnetic>
        );
      })}
    </aside>
  );
}
