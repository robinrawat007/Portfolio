"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Tilt({ 
  children, 
  className = "", 
  intensity = 20, 
  glare = true,
  scale = 1.02
}) {
  const ref = useRef(null);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-intensity, intensity]);
  
  // Glare transforms
  const glareX = useTransform(mouseXSpring, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [0, 1], ["0%", "100%"]);
  const glareOpacity = useTransform(
    mouseXSpring, 
    [0, 0.5, 1], 
    [0.1, 0, 0.1]
  );

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>

      {glare && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 50,
            pointerEvents: "none",
            background: `radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.15) 0%, transparent 80%)`,
            opacity: glareOpacity,
            "--glare-x": glareX,
            "--glare-y": glareY,
          }}
        />
      )}
    </motion.div>
  );
}
