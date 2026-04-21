"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_CHARS = "0123456789";

export default function CountUp({ target, suffix = "", className }) {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const obj = { val: 0 };
      let scrambling = true;

      gsap.delayedCall(0.2, () => { scrambling = false; });

      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate() {
          el.textContent = scrambling
            ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] + suffix
            : Math.round(obj.val) + suffix;
        },
        onComplete() { el.textContent = target + suffix; },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return <span ref={ref} className={className}>0{suffix}</span>;
}
