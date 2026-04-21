"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const RADIUS = 40;
const STRENGTH = 0.2;

export default function Magnetic({ children, className }) {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS) { xTo(dx * STRENGTH); yTo(dy * STRENGTH); }
        else { xTo(0); yTo(0); }
      };

      const onLeave = () => { xTo(0); yTo(0); };

      window.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        window.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });
    return () => mm.revert();
  }, { scope: ref });

  return <div ref={ref} className={className}>{children}</div>;
}
