"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FROM_MAP = {
  fadeUp:    { y: 100, opacity: 0, scale: 0.97 },
  fade:      { y: 60,  opacity: 0 },
  fadeDown:  { y: -80, opacity: 0 },
  fadeLeft:  { x: -100, opacity: 0 },
  fadeRight: { x: 100,  opacity: 0 },
  scale:     { scale: 0.85, opacity: 0 },
  rotate:    { rotation: -8, opacity: 0, x: -40 },
};

export default function ScrollReveal({
  children,
  delay = 0,
  animation = "fadeUp",
  duration = 1,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const from = FROM_MAP[animation] ?? FROM_MAP.fadeUp;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...from,
        duration,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [animation, delay, duration]);

  return <div ref={ref}>{children}</div>;
}
