"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";

/**
 * GlowText component
 * Adds an interactive light emission effect to text on hover/mouse move.
 */
export default function GlowText({ children, className = "" }) {
  const containerRef = useRef(null);
  const sparksContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const createSpark = useCallback((x, y) => {
    if (!sparksContainerRef.current) return;

    const colors = ["#D9FF00", "#00FF85", "#F5F5F5"];
    const sparkCount = 1; // 1 spark per interval is enough for continuous feel

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement("span");
      const size = Math.random() * 3 + 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];

      Object.assign(spark.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        boxShadow: `0 0 8px ${color}`,
      });

      sparksContainerRef.current.appendChild(spark);

      // Random flight path - shoot outward
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 50 + 20;
      
      gsap.to(spark, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 0,
        duration: Math.random() * 0.7 + 0.4,
        ease: "power2.out",
        onComplete: () => {
          if (spark.parentNode) {
            spark.parentNode.removeChild(spark);
          }
        },
      });
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isHovered) {
      // Periodic sparking from random boundaries
      interval = setInterval(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const randX = Math.random() * rect.width;
        const randY = Math.random() * rect.height;
        createSpark(randX, randY);
      }, 100); // Every 100ms
    }
    return () => clearInterval(interval);
  }, [isHovered, createSpark]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    // Get local coordinates for the mouse glow
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Mouse still spawns some extra sparks for responsiveness
    createSpark(x, y);
    
    // Animate a subtle localized glow
    gsap.to(containerRef.current.querySelector(".text-mask-glow"), {
      x: x,
      y: y,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-default select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container for sparks */}
      <div
        ref={sparksContainerRef}
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{ zIndex: 20 }}
      />
      
      {/* Localized glow bulb */}
      <div 
        className="text-mask-glow absolute pointer-events-none blur-xl rounded-full opacity-0 transition-opacity duration-300"
        style={{ 
          width: '60px', 
          height: '60px', 
          background: 'rgba(217,255,0,0.15)',
          left: '-30px', 
          top: '-30px',
          opacity: isHovered ? 1 : 0,
          zIndex: 10
        }}
      />
      
      {/* The actual text */}
      <div className="relative z-10 transition-colors duration-300" style={{ color: isHovered ? 'var(--fg)' : 'var(--fg-muted)' }}>
        {children}
      </div>
    </div>
  );
}
