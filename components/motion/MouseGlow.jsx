"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function MouseGlow({ className }) {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

      const parent = el.parentElement;
      const onMove = (e) => {
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        xTo(e.clientX - rect.left - 300);
        yTo(e.clientY - rect.top - 300);
      };

      parent?.addEventListener("mousemove", onMove);
      return () => parent?.removeEventListener("mousemove", onMove);
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={glowRef}
      className={`pointer-events-none absolute w-[600px] h-[600px] rounded-full ${className ?? ""}`}
      style={{
        background: "radial-gradient(circle, rgba(217,255,0,0.08) 0%, transparent 70%)",
        transform: "translate(-300px, -300px)",
      }}
      aria-hidden="true"
    />
  );
}
