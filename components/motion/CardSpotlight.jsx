"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CardSpotlight({ 
  children, 
  className = "",
  size = 400, 
  color = "rgba(217, 255, 0, 0.15)", // Subtle neon yellow default
  blur = 40,
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
      className={`relative overflow-hidden group/card-spotlight ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute pointer-events-none z-0"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              width: size,
              height: size,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                filter: `blur(${blur}px)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
