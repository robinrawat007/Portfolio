"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * Premium CustomCursor
 * Features velocity-based stretching, "Magnetic Aura", and "Digital Brackets" on hover.
 */
export default function CustomCursor() {
  const dotRef    = useRef(null);
  const auraRef   = useRef(null);
  const labelRef  = useRef(null);

  useEffect(() => {
    const dot   = dotRef.current;
    const aura  = auraRef.current;
    const label = labelRef.current;
    if (!dot || !aura || !label) return;

    let mouse = { x: 0, y: 0 };
    let previousMouse = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    let currentMode = "default"; // Track mode to prevent flicker

    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine)", () => {
      dot.style.display   = "block";
      aura.style.display  = "block";

      const xDot      = gsap.quickTo(dot,  "x",      { duration: 0.1, ease: "none" });
      const yDot      = gsap.quickTo(dot,  "y",      { duration: 0.1, ease: "none" });
      const xAura     = gsap.quickTo(aura, "x",      { duration: 0.4, ease: "power3.out" });
      const yAura     = gsap.quickTo(aura, "y",      { duration: 0.4, ease: "power3.out" });
      const rotAura   = gsap.quickTo(aura, "rotate", { duration: 0.2, ease: "none" });
      const scaleXAura = gsap.quickTo(aura, "scaleX", { duration: 0.2, ease: "none" });
      const scaleYAura = gsap.quickTo(aura, "scaleY", { duration: 0.2, ease: "none" });

      const onMouseMove = (e) => {
        // Show cursor on first move
        if (dot.style.opacity === "0" || dot.style.opacity === "") {
          gsap.to([dot, aura], { opacity: 1, duration: 0.2 });
        }

        mouse.x = e.clientX;
        mouse.y = e.clientY;

        velocity.x = mouse.x - previousMouse.x;
        velocity.y = mouse.y - previousMouse.y;
        previousMouse.x = mouse.x;
        previousMouse.y = mouse.y;

        const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
        const stretch = Math.min(speed / 100, 0.4);
        const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);

        xDot(mouse.x - 3);
        yDot(mouse.y - 3);
        xAura(mouse.x - 24);
        yAura(mouse.y - 24);

        if (currentMode === "default") {
          rotAura(angle);
          scaleXAura(1 + stretch);
          scaleYAura(1 - stretch * 0.5);
        }
      };

      const onMouseOver = (e) => {
        const interactiveTarget = e.target.closest("[data-cursor='interactive'], a, button");

        if (interactiveTarget) {
          if (currentMode === "interactive") return;
          currentMode = "interactive";

          // Transform Aura into Digital Brackets
          gsap.to(aura, { 
            scale: 1.5, 
            rotate: 0,
            borderRadius: "4px",
            borderWidth: "1px",
            borderColor: "rgba(217,255,0,0.8)",
            backgroundColor: "rgba(217,255,0,0.05)",
            duration: 0.3,
            overwrite: true
          });
          gsap.to(".aura-corner", { opacity: 1, duration: 0.2 });
        } else {
          if (currentMode === "default") return;
          currentMode = "default";

          // Return to soft Aura
          gsap.to(aura, { 
            scale: 1, 
            borderRadius: "50%",
            borderWidth: "1.5px",
            borderColor: "rgba(217,255,0,0.4)",
            backgroundColor: "transparent",
            duration: 0.3,
            overwrite: true
          });
          gsap.to(".aura-corner", { opacity: 0, duration: 0.2 });
        }
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseover", onMouseOver);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseover", onMouseOver);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* 6px Solid Core */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-1.5 h-1.5 rounded-full opacity-0"
        style={{ background: "var(--neon-yellow)", boxShadow: "0 0 10px var(--neon-yellow)" }}
        aria-hidden="true"
      />

      {/* 48px Magnetic Aura / Bracket */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-12 h-12 border flex items-center justify-center transition-[border-radius] opacity-0"
        style={{ 
          borderColor: "rgba(217,255,0,0.4)", 
          borderRadius: "50%",
          boxShadow: "0 0 15px rgba(217,255,0,0.1)"
        }}
        aria-hidden="true"
      >
        {/* Invisible Corner Brackets for interactive mode */}
        <div className="aura-corner absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-yellow opacity-0" />
        <div className="aura-corner absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-yellow opacity-0" />
        <div className="aura-corner absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-yellow opacity-0" />
        <div className="aura-corner absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-yellow opacity-0" />
      </div>

      <style jsx>{`
        .border-neon-yellow {
          border-color: var(--neon-yellow);
        }
      `}</style>
    </>
  );
}
