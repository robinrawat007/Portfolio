"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Spotlight({ 
  children, 
  size = 600, 
  color = "rgba(255, 255, 255, 0.4)", 
  blur = 25,
  opacity = 0.95
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-baseline overflow-visible group/spotlight cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ verticalAlign: 'baseline' }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute pointer-events-none z-0 overflow-visible"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              width: size,
              height: size * 1.5,
              transform: "translate(-50%, -90%)", // Origin centers further above
            }}
          >
            {/* Soft volumetric beam cone */}
            <div 
              className="absolute inset-0"
              style={{
                background: `conic-gradient(from 165deg at 50% 5%, transparent 0deg, ${color} 15deg, transparent 30deg)`,
                filter: `blur(${blur}px)`,
                maskImage: 'radial-gradient(ellipse at 50% 5%, black 10%, transparent 90%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 5%, black 10%, transparent 90%)',
              }}
            />
            
            {/* Cinematic rays / Shimmering light lines */}
            <motion.div 
              animate={{ 
                opacity: [0.15, 0.35, 0.15],
                scaleX: [0.95, 1.05, 0.95]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0"
              style={{
                background: `conic-gradient(from 168deg at 50% 5%, transparent 0deg, rgba(255,255,255,0.12) 2deg, transparent 4deg, rgba(255,255,255,0.08) 8deg, transparent 12deg)`,
                mixBlendMode: 'plus-lighter',
                filter: 'blur(3px) brightness(1.5)',
              }}
            />

            {/* Subtle glow at the source (lens flare) */}
            <div 
              className="absolute top-[5%] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white blur-lg opacity-60"
            />

            {/* Impact Glow (High brightness at text contact) */}
            <div 
              className="absolute top-[90%] left-1/2 -translate-x-1/2 w-32 h-16 rounded-full bg-white blur-2xl opacity-40 mix-blend-screen"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 flex items-baseline">
        {children}
      </div>
    </div>
  );
}
