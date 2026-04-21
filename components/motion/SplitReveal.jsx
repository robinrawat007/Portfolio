"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, TRIGGER_DEFAULTS } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function SplitReveal({ text, className, as: Tag = "h2" }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const wordEls = ref.current.querySelectorAll(".sr-word");
      gsap.from(wordEls, {
        y: "100%",
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: EASE.expo,
        scrollTrigger: { trigger: ref.current, ...TRIGGER_DEFAULTS },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="sr-word inline-block">
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
