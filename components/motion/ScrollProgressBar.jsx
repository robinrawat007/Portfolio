"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9998] origin-left"
      style={{
        background: "var(--neon-yellow)",
        transform: "scaleX(0)",
        boxShadow: "0 0 8px var(--neon-yellow)",
      }}
      aria-hidden="true"
    />
  );
}
