"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION, TRIGGER_DEFAULTS } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function StaggerGroup({ children, className, selector = ".stagger-item", delay = 0 }) {
  const ref = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = ref.current.querySelectorAll(selector);
      if (!items.length) return;
      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: DURATION.base,
        delay,
        stagger: 0.08,
        ease: EASE.out,
        scrollTrigger: { trigger: ref.current, ...TRIGGER_DEFAULTS },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return <div ref={ref} className={className}>{children}</div>;
}
