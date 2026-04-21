"use client";

import { useRef, useEffect } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#";

export default function ScrambleText({ text, className, delay = 0, triggerOnMount = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const DURATION = 1200;
    const startAt = performance.now() + delay * 1000;
    let raf;

    const animate = (now) => {
      if (now < startAt) { raf = requestAnimationFrame(animate); return; }
      const progress = Math.min((now - startAt) / DURATION, 1);
      const locked = Math.floor(progress * text.length);

      el.textContent = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < locked) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (progress < 1) raf = requestAnimationFrame(animate);
      else el.textContent = text;
    };

    if (triggerOnMount) raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [text, delay, triggerOnMount]);

  return <span ref={ref} className={className}>{text}</span>;
}
