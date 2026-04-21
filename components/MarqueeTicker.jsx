"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { getLenis } from "@/utils/lenis-store";

const skills = [
  "OpenAI API",
  "LangChain",
  "Claude API",
  "Prompt Engineering",
  "RAG Systems",
  "AI Automation",
  "n8n",
  "LLM Integration",
];

export default function MarqueeTicker() {
  const trackRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const track = trackRef.current;
    if (!track) return;

    const tl = gsap.to(track, {
      xPercent: -50,
      duration: 24,
      ease: "none",
      repeat: -1,
    });

    let velocityTimeout;
    const handleScroll = (e) => {
      const scale = 1 + Math.abs(e.velocity) * 0.4;
      tl.timeScale(scale);
      clearTimeout(velocityTimeout);
      velocityTimeout = setTimeout(() => {
        gsap.to(tl, { timeScale: 1, duration: 1.2, ease: "power2.out" });
      }, 150);
    };

    let lenis = getLenis();
    let retryInterval;
    const attach = () => {
      lenis = getLenis();
      if (lenis) { lenis.on("scroll", handleScroll); clearInterval(retryInterval); }
    };
    attach();
    if (!lenis) retryInterval = setInterval(attach, 80);

    return () => {
      tl.kill();
      clearTimeout(velocityTimeout);
      clearInterval(retryInterval);
      getLenis()?.off("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="marquee relative w-full py-3 overflow-hidden border-y" style={{ background: 'rgba(10,10,10,0.5)', borderColor: 'var(--border)' }}>
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-4 shrink-0">
            {skills.map((skill, index) => (
              <React.Fragment key={index}>
                <span className="text-lg md:text-xl font-bold uppercase tracking-tighter text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }}>
                  {skill}
                </span>
                <span className="text-lg" style={{ color: 'var(--border)' }}>•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
