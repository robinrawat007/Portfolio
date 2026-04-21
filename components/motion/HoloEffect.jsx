"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";

/**
 * HoloEffect component
 * Premium holographic glitch effect for interactive elements.
 * Modes: 'particles' (digital bits), 'heartbeat' (rhythmic pulse), 'all' (combined)
 */
export default function HoloEffect({ 
  children, 
  mode = "all", 
  color = "var(--neon-green)", 
  particleColor = null,
  className = "" 
}) {
  const containerRef = useRef(null);
  const particleContainerRef = useRef(null);
  const ekgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const heartbeatTimeline = useRef(null);
  const ekgTimeline = useRef(null);

  const activeParticleColor = particleColor || color;

  // Heartbeat & EKG Logic
  useEffect(() => {
    if (isHovered && (mode === "heartbeat" || mode === "all")) {
      // Synchronized Master Timeline
      heartbeatTimeline.current = gsap.timeline({ repeat: -1 });
      
      heartbeatTimeline.current
        // First Beat (Thud) + EKG Start
        .to(containerRef.current, { scale: 1.03, boxShadow: `0 0 25px ${color}`, duration: 0.15, ease: "power2.out" })
        .fromTo(ekgRef.current, { x: "-100%" }, { x: "200%", duration: 1.5, ease: "none" }, 0)
        .to(containerRef.current, { scale: 1, boxShadow: `0 0 10px ${color}`, duration: 0.25, ease: "power2.in" })
        // Second Beat (Lighter)
        .to(containerRef.current, { scale: 1.05, boxShadow: `0 0 35px ${color}`, duration: 0.2, ease: "power2.out" })
        .to(containerRef.current, { scale: 1, boxShadow: `0 0 10px ${color}`, duration: 0.6, ease: "power2.inOut" });
    } else {
      heartbeatTimeline.current?.kill();
      gsap.to(containerRef.current, { scale: 1, boxShadow: "none", duration: 0.3 });
      gsap.set(ekgRef.current, { x: "-100%" });
    }
    return () => heartbeatTimeline.current?.kill();
  }, [isHovered, mode, color]);

  // 3D Tilt Logic
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 8;
    const rotateY = -(x - centerX) / 8;
    
    gsap.to(containerRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.4,
      ease: "power2.out",
    });

    if (mode === "particles" || mode === "all") {
      spawnParticle(x, y);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(containerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const spawnParticle = useCallback((x, y) => {
    if (!particleContainerRef.current) return;

    const bit = document.createElement("div");
    const size = Math.random() * 2 + 1;
    
    Object.assign(bit.style, {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      background: activeParticleColor,
      pointerEvents: "none",
      zIndex: 20,
      opacity: 0.8,
    });

    particleContainerRef.current.appendChild(bit);

    gsap.to(bit, {
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 80,
      opacity: 0,
      scale: 0,
      duration: Math.random() * 0.5 + 0.3,
      ease: "power2.out",
      onComplete: () => {
        if (bit.parentNode) bit.parentNode.removeChild(bit);
      }
    });
  }, [activeParticleColor]);

  return (
    <div
      ref={containerRef}
      className={`relative group transition-all duration-300 ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Digital Noise Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-25' : ''}`}
        style={{ 
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Internal EKG Heartbeat Line (Seamless Loop) */}
      {(mode === "heartbeat" || mode === "all") && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div 
            className="absolute inset-y-0 flex items-center"
            style={{ 
              width: '300%', 
              animation: isHovered ? 'ekg-scroll 2s linear infinite' : 'none' 
            }}
          >
            {/* Real SVG pattern for reliable color rendering */}
            {[1, 2, 3].map((i) => (
              <svg key={i} width="120" height="30" viewBox="0 0 120 30" fill="none" className="h-3/5" style={{ filter: `drop-shadow(0 0 5px ${color})` }}>
                <path d="M0 15H15L18 5L22 25L28 10L32 15H120" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
          </div>
        </div>
      )}

      {/* Horizontal Scan Line - Only in scan mode */}
      {mode === "scan" && (
        <div 
          className={`absolute inset-x-0 h-[2px] z-10 pointer-events-none opacity-0 transition-opacity duration-300`}
          style={{ 
            opacity: isHovered ? 0.6 : 0,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            top: '50%',
            animation: isHovered ? 'holo-scan 2s linear infinite' : 'none',
            boxShadow: `0 0 10px ${color}`
          }}
        />
      )}

      {/* Particle Container */}
      <div 
        ref={particleContainerRef}
        className="absolute inset-0 pointer-events-none overflow-visible"
      />

      {/* Chromatic Aberration Layers (Simple implementation with scale/skew) */}
      <div className={`relative z-10 transition-transform duration-300 ${isHovered ? 'scale-[1.02] skew-x-[-1deg]' : ''}`}>
        {children}
      </div>

      <style jsx global>{`
        @keyframes holo-scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes ekg-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
