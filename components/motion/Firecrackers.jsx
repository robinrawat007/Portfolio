"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  "#D9FF00", // neon-yellow
  "#00FF85", // neon-green
  "#FF0080", // neon-pink
  "#2DCFCF", // cyan
  "#ffffff", // white
  "#FF8000", // neon-orange
  "#7B4FE0", // neon-purple
  "#80FF00", // neon-lime
];

export default function Firecrackers({ children, maxParticles = 80 }) {
  const [particles, setParticles] = useState([]);
  const [flashes, setFlashes] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const createBurst = useCallback(() => {
    // 1. Pick a random side for the origin
    const side = Math.floor(Math.random() * 4);
    let startX = 50, startY = 50;
    
    // 0: top, 1: right, 2: bottom, 3: left
    switch(side) {
      case 0: startX = Math.random() * 100; startY = 0; break;
      case 1: startX = 100; startY = Math.random() * 100; break;
      case 2: startX = Math.random() * 100; startY = 100; break;
      case 3: startX = 0; startY = Math.random() * 100; break;
    }

    const burstId = Math.random();
    
    // 2. Add a flash effect at origin
    setFlashes(prev => [...prev, { id: burstId, x: startX, y: startY }]);
    setTimeout(() => {
      setFlashes(prev => prev.filter(f => f.id !== burstId));
    }, 150);

    // 3. Create a cluster of particles
    const particleCount = isHovered ? 15 : 8;
    const newParticles = Array.from({ length: particleCount }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 40 + Math.random() * 80;
      const id = Math.random() + Date.now();
      const life = 0.6 + Math.random() * 0.6;
      
      return {
        id,
        startX,
        startY,
        targetX: Math.cos(angle) * (velocity * 1.5),
        targetY: Math.sin(angle) * (velocity * 1.5) + (Math.random() * 20 + 10), // slight gravity pull
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 2.5 + 1,
        life,
      };
    });

    setParticles(prev => [...prev.slice(-(maxParticles - particleCount)), ...newParticles]);

    // Cleanup individual particles after their life
    newParticles.forEach(p => {
      setTimeout(() => {
        setParticles(curr => curr.filter(item => item.id !== p.id));
      }, p.life * 1000);
    });
  }, [isHovered, maxParticles]);

  // Spawning logic: ONLY on hover
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(createBurst, 200);
    return () => clearInterval(interval);
  }, [createBurst, isHovered]);

  return (
    <div
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -inset-10 pointer-events-none z-50 overflow-visible">
        {/* Burst Flashes */}
        <AnimatePresence>
          {flashes.map(f => (
            <motion.div
              key={f.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: [0, 0.4, 0] }}
              exit={{ opacity: 0 }}
              className="absolute w-12 h-12 rounded-full blur-xl"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                background: 'white',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </AnimatePresence>

        {/* Explosive Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              left: `${p.startX}%`, 
              top: `${p.startY}%`, 
              scale: 0, 
              opacity: 1 
            }}
            animate={{ 
              x: p.targetX, 
              y: p.targetY,
              opacity: 0,
              scale: [0, 1, 0.5, 0],
            }}
            transition={{ 
              duration: p.life, 
              ease: "easeOut" 
            }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 10px 1px ${p.color}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
