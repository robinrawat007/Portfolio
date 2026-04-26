"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterTextRef = useRef(null);
  const progressLineRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  React.useEffect(() => {
    console.log("Preloader: Animation starting...");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          console.log("Preloader: Timeline complete, exiting...");
          gsap.to(containerRef.current, {
            y: "-100%",
            duration: 0.7,
            ease: "power4.inOut",
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        },
      });

      // Initial reveal
      tl.set([firstNameRef.current, lastNameRef.current, counterTextRef.current], {
        opacity: 0,
        y: 20
      });

      // Animate counter and progress line
      console.log("Preloader: Starting counter animation...");
      gsap.to({ value: 0 }, {
        value: 100,
        duration: 1.5,
        ease: "power1.inOut",
        onUpdate: function() {
          const val = Math.floor(this.targets()[0].value);
          if (counterTextRef.current) {
            counterTextRef.current.textContent = `${val}%`;
          }
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${val}%`;
          }
        },
        onComplete: () => {
          console.log("Preloader: Counter reached 100%");
          // Trigger the rest of the timeline or just finish
        }
      });

      // Sequential timeline for the reveal and exit
      tl.to([firstNameRef.current, lastNameRef.current, counterTextRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      })
      .to({}, { duration: 1.2 }) // Wait for counter
      .to([firstNameRef.current, lastNameRef.current, counterTextRef.current], {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in"
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060608] overflow-hidden"
    >
      <div className="flex items-center gap-6 md:gap-12 text-white font-heading select-none">
        <span
          ref={firstNameRef}
          className="text-2xl md:text-4xl font-black tracking-tighter uppercase"
          style={{ color: "var(--neon-yellow, #D9FF00)" }}
        >
          Framing
        </span>

        <div className="flex flex-col items-center min-w-[80px]">
          <span
            ref={counterTextRef}
            className="text-2xl md:text-4xl font-mono font-bold tabular-nums"
          >
            0%
          </span>
          <div className="w-full h-[2px] bg-white/10 mt-2 relative overflow-hidden">
            <div
              ref={progressLineRef}
              className="absolute inset-y-0 left-0 bg-[#D9FF00]"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        <span
          ref={lastNameRef}
          className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-white"
        >
          Perception
        </span>
      </div>

      {/* Decorative lines/elements like in the video style */}
      <div className="absolute bottom-10 left-10 text-[10px] tracking-[0.4em] uppercase text-white/20 font-mono">
        System Initializing...
      </div>
    </div>
  );
}
