"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GlassShapes() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Floating Prism 1 */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          rotate: [0, 45, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[15%] left-[5%] w-32 h-32 blur-3xl opacity-20"
        style={{
          background: "linear-gradient(135deg, var(--neon-yellow) 0%, transparent 70%)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />

      {/* Floating Prism 2 */}
      <motion.div
        animate={{
          y: [0, 60, 0],
          rotate: [0, -30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] right-[10%] w-48 h-48 blur-3xl opacity-15"
        style={{
          background: "linear-gradient(225deg, var(--neon-green) 0%, transparent 70%)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        }}
      />

      {/* Subtle floating 3D-feeling lines */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], y: [-10, 10, -10] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/4 w-[1px] h-40 bg-gradient-to-b from-transparent via-white/20 to-transparent rotate-45"
      />
    </div>
  );
}
