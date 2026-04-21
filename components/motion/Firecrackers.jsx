"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#D9FF00", "#00FF85", "#FF0080", "#2DCFCF", "#ffffff", "#FF8000"];

export default function Firecrackers({ children, maxSparks = 20 }) {
  const [sparks, setSparks] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Spawn interval: faster on hover, slow idle
    const rate = isHovered ? 80 : 400;

    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const spark = {
        id,
        x: Math.random() * 100, // random start horizontal %
        y: Math.random() * 100, // random start vertical %
        directionX: (Math.random() - 0.5) * 80, // explosion thrust
        directionY: (Math.random() - 0.5) * 80,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 1.5 + 0.5,
      };

      setSparks((curr) => [...curr.slice(-maxSparks), spark]);

      // Remove after lifetime
      setTimeout(() => {
        setSparks((curr) => curr.filter((s) => s.id !== id));
      }, 800);
    }, rate);

    return () => clearInterval(interval);
  }, [isHovered, maxSparks]);

  return (
    <div
      className="relative inline-block w-full h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -inset-8 pointer-events-none z-50 overflow-visible">
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{ 
                scale: spark.size, 
                opacity: 0, 
                x: spark.directionX, 
                y: spark.directionY 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute rounded-full"
              style={{
                left: `calc(${spark.x}% + 32px)`, // offset to center inside inset
                top: `calc(${spark.y}% + 32px)`,
                width: 3,
                height: 3,
                background: spark.color,
                boxShadow: `0 0 10px 1px ${spark.color}`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
