"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function GSAPAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {

      // ── 1. Hero word reveal (on load, no ScrollTrigger) ───────────────────
      const heroWords = document.querySelectorAll(".hero-word");
      if (heroWords.length) {
        gsap.from(heroWords, {
          y: "110%",
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.9,
        });
      }

      // ── 2. Staggered cards (.gsap-card-group > .gsap-card) ────────────────
      gsap.utils.toArray(".gsap-card-group").forEach((group) => {
        const cards = group.querySelectorAll(".gsap-card");
        if (!cards.length) return;
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          scale: 0.92,
          duration: 0.7,
          // cap stagger group to 8 per performance rule
          stagger: { amount: 0.15 * Math.min(cards.length, 8) / cards.length, from: "start" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
            once: true,
          },
        });
      });

      // ── 3. Parallax — data-parallax="slow" (0.5x speed) ──────────────────
      gsap.utils.toArray("[data-parallax='slow']").forEach((el) => {
        el.style.willChange = "transform";
        gsap.fromTo(
          el,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // ── 4. Parallax — data-parallax="fast" (1.5x speed) ──────────────────
      gsap.utils.toArray("[data-parallax='fast']").forEach((el) => {
        el.style.willChange = "transform";
        gsap.fromTo(
          el,
          { y: -80 },
          {
            y: 80,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // ── 5. SplitText word reveal — all h2 (batched = 1 ST instance) ──────
      // Exclude #hero-title h1 which is already handled by .hero-word
      const headings = gsap.utils.toArray("h2");
      if (headings.length) {
        ScrollTrigger.batch(headings, {
          onEnter: (batch) => {
            batch.forEach((el) => {
              const split = new SplitText(el, { type: "words" });
              // cap at 8 words per stagger group per performance rule
              const words = split.words.slice(0, 8);
              gsap.from(words, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out",
                onComplete: () => split.revert(),
              });
            });
          },
          start: "top 90%",
          once: true,
          lazy: true,
        });
      }

      // ── 6. Stacking cards — pin: true, scrub per card ────────────────────
      // Targets .card elements — only pins all but the last one
      const stackCards = gsap.utils.toArray(".card");
      stackCards.forEach((card, i) => {
        if (i === stackCards.length - 1) return; // last card stays
        card.style.willChange = "transform";
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.75,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top top+=60",
            end: "+=320",
            pin: true,
            pinSpacing: false,
            scrub: true,
            lazy: true,
          },
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return null;
}
