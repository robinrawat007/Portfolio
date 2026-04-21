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

    // xPercent: -50 gives a seamless loop with 4 copies (move past 2 = back to start)
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

    // Lenis may not be ready yet — retry until attached
    let lenis = getLenis();
    let retryInterval;

    const attach = () => {
      lenis = getLenis();
      if (lenis) {
        lenis.on("scroll", handleScroll);
        clearInterval(retryInterval);
      }
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
    <div className="marquee relative w-full py-3 overflow-hidden bg-slate-950/50 border-y border-slate-800/50">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-4 shrink-0">
            {skills.map((skill, index) => (
              <React.Fragment key={index}>
                <span className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF] uppercase tracking-tighter">
                  {skill}
                </span>
                <span className="text-slate-700 text-lg">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
