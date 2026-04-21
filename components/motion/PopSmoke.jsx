"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";

/**
 * PopSmoke component
 * Adds an elastic "pop" scale and spawns "smoke" particles on hover.
 */
export default function PopSmoke({ children, className = "" }) {
  const containerRef = useRef(null);
  const smokeContainerRef = useRef(null);

  const createSmoke = (e) => {
    if (!smokeContainerRef.current) return;

    const particleCount = 8;
    const colors = ["#D9FF00", "#00FF85", "#F5F5F5"]; // yellow, green, light

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");
      const size = Math.random() * 6 + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];

      Object.assign(particle.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: `0 0 10px ${color}`,
      });

      smokeContainerRef.current.appendChild(particle);

      // Random direction
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 40 + 20;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 20; // Bias upwards

      gsap.to(particle, {
        x: tx,
        y: ty,
        opacity: 0.8,
        scale: 0,
        duration: Math.random() * 0.6 + 0.4,
        ease: "power2.out",
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        },
      });
    }
  };

  const handleMouseEnter = (e) => {
    // Pop animation on the wrapper child container
    const target = containerRef.current.querySelector(".pop-target") || containerRef.current;
    
    gsap.to(target, {
      scale: 1.25,
      duration: 0.4,
      ease: "elastic.out(1.2, 0.5)",
      overwrite: "auto",
    });

    createSmoke(e);
  };

  const handleMouseLeave = () => {
    const target = containerRef.current.querySelector(".pop-target") || containerRef.current;
    
    gsap.to(target, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Container for smoke particles */}
      <div
        ref={smokeContainerRef}
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{ zIndex: -1 }}
      />
      
      {/* The actual content */}
      <div className="pop-target relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
