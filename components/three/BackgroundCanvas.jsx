"use client";

import React from "react";

/**
 * Pure-CSS background orbs — replaces the Three.js/WebGL Stars canvas.
 * Saves ~300 kB (three + @react-three/fiber + @react-three/drei) from the
 * initial bundle and eliminates the WebGL context entirely.
 *
 * Animations are automatically suppressed via the global
 * `prefers-reduced-motion` rule in globals.css.
 */
export default function BackgroundCanvas() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
    </div>
  );
}
