"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterTextRef = useRef(null);
  const progressLineRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Final exit animation
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

    tl.to([firstNameRef.current, lastNameRef.current, counterTextRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power3.out"
    });

    // Animate counter and progress line
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 1.0,
      ease: "none",
      onUpdate: () => {
        const val = Math.floor(counterObj.value);
        if (counterTextRef.current) {
          counterTextRef.current.innerText = `${val}%`;
        }
        if (progressLineRef.current) {
          progressLineRef.current.style.width = `${val}%`;
        }
      },
    }, "-=0.3");

    // Hold at 100% for a moment
    tl.to({}, { duration: 0.1 });

    // Final "get ready" animation
    tl.to([firstNameRef.current, lastNameRef.current, counterTextRef.current], {
      y: -30,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in"
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060608] overflow-hidden"
    >
      <div className="flex items-center gap-6 md:gap-12 text-white font-heading select-none">
        <span
          ref={firstNameRef}
          className="text-4xl md:text-7xl font-black tracking-tighter uppercase"
          style={{ color: "var(--neon-yellow, #D9FF00)" }}
        >
          Robin
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
          className="text-4xl md:text-7xl font-black tracking-tighter uppercase text-white"
        >
          Rawat
        </span>
      </div>

      {/* Decorative lines/elements like in the video style */}
      <div className="absolute bottom-10 left-10 text-[10px] tracking-[0.4em] uppercase text-white/20 font-mono">
        System Initializing...
      </div>
    </div>
  );
}
