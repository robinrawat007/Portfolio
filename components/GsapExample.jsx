"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Minimal GSAP example — scroll down to see the box animate in.
 * useGSAP is the React-safe alternative to useEffect for GSAP:
 *   - auto-reverts animations on unmount
 *   - handles React StrictMode double-invoke correctly
 *   - scoped to `containerRef` so selectors don't leak
 *
 * To use this elsewhere:
 *   import GsapExample from "@/components/GsapExample";
 */
export default function GsapExample() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".demo-box", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".demo-box",
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 py-20">
      <p className="text-slate-400 text-sm">↓ scroll to trigger</p>
      <div className="demo-box w-32 h-32 rounded-2xl bg-gradient-to-br from-[#7B4FE0] to-[#2DCFCF]" />
      <p className="text-slate-500 text-xs">GsapExample — safe to delete</p>
    </div>
  );
}
