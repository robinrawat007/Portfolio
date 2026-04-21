"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION, TRIGGER_DEFAULTS } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function FadeUp({ children, className, delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(ref.current, {
        y: 24,
        opacity: 0,
        duration: DURATION.base,
        delay,
        ease: EASE.out,
        scrollTrigger: { trigger: ref.current, ...TRIGGER_DEFAULTS },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
