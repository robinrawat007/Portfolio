"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { getLenis } from "@/utils/lenis-store";

const ROW1 = [
  "OpenAI API", "LangChain", "Claude API", "Prompt Engineering",
  "RAG Systems", "AI Automation", "n8n", "LLM Integration",
];

const ROW2 = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Supabase", "Node.js", "GSAP", "Framer Motion",
];

function MarqueeRow({ items, speed, direction }) {
  const trackRef  = useRef(null);
  const tlRef     = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const track = trackRef.current;
    if (!track) return;

    const xTarget = direction === "left" ? -50 : 50;

    const tl = gsap.to(track, {
      xPercent: xTarget,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
    // For rightward row, start mid-cycle so it looks continuous
    if (direction === "right") tl.progress(0.5);
    tlRef.current = tl;

    let velocityTimeout;
    const handleScroll = (e) => {
      if (pausedRef.current) return;
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
  }, [speed, direction]);

  const handleTagEnter = (e) => {
    pausedRef.current = true;
    tlRef.current?.pause();
    e.currentTarget.style.textShadow = "2px 0 var(--neon-yellow), -2px 0 var(--neon-green)";
    e.currentTarget.style.color = "var(--fg)";
  };

  const handleTagLeave = (e) => {
    pausedRef.current = false;
    tlRef.current?.resume();
    e.currentTarget.style.textShadow = "";
    e.currentTarget.style.color = "var(--fg-muted)";
  };

  return (
    <div className="relative w-full overflow-hidden py-2">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {/* Duplicate 2× for seamless loop */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-6 px-3 shrink-0">
            {items.map((item, j) => (
              <span
                key={j}
                className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-[0.15em] cursor-default select-none transition-colors duration-150"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--fg-muted)',
                  borderRadius: '4px',
                }}
                onMouseEnter={handleTagEnter}
                onMouseLeave={handleTagLeave}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeTicker() {
  return (
    <div
      className="relative w-full py-2 border-y overflow-hidden"
      style={{
        background: 'rgba(10,10,10,0.5)',
        borderColor: 'var(--border)',
        transform: 'rotate(-2deg) scaleX(1.06)',
        transformOrigin: 'center',
        marginTop: '-4px',
        marginBottom: '-4px',
      }}
    >
      <MarqueeRow items={ROW1} speed={25} direction="left" />
      <MarqueeRow items={ROW2} speed={35} direction="right" />
    </div>
  );
}
