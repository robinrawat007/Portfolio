"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine)", () => {
      dot.style.display  = "block";
      ring.style.display = "block";

      const xDot  = gsap.quickTo(dot,  "x", { duration: 0.08, ease: "none" });
      const yDot  = gsap.quickTo(dot,  "y", { duration: 0.08, ease: "none" });
      const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
      const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

      const onMove = (e) => {
        xDot(e.clientX - 4);
        yDot(e.clientY - 4);
        xRing(e.clientX - 20);
        yRing(e.clientY - 20);
      };

      const onOver = (e) => {
        const interactive = e.target.closest("[data-cursor='interactive'], a, button");
        gsap.to(ring, {
          scale: interactive ? 2 : 1,
          duration: 0.25,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseover", onOver);

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseover", onOver);
        dot.style.display  = "none";
        ring.style.display = "none";
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* 8px neon-yellow dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[200]"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: "var(--neon-yellow)",
            boxShadow: "0 0 8px var(--neon-yellow)",
          }}
        />
      </div>
      {/* 40px ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[199] w-10 h-10"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div
          className="w-full h-full rounded-full border"
          style={{
            borderColor: "rgba(217,255,0,0.6)",
            boxShadow: "0 0 12px rgba(217,255,0,0.2)",
          }}
        />
      </div>
    </>
  );
}
