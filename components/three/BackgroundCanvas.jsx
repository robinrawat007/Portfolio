"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function BackgroundCanvas() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(Boolean(mq?.matches));
    update();
    mq?.addEventListener?.("change", update);
    return () => mq?.removeEventListener?.("change", update);
  }, []);

  const starsCount = useMemo(() => {
    if (reducedMotion) return 0;
    const mem = typeof navigator !== "undefined" ? navigator.deviceMemory : undefined;
    const isLowEnd = typeof mem === "number" && mem > 0 && mem <= 4;
    return isLowEnd ? 2500 : 6000;
  }, [reducedMotion]);

  return (
    <Canvas
      className="fixed inset-0 z-0"
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      {starsCount > 0 && (
        <Stars
          radius={200}
          depth={60}
          count={starsCount}
          factor={7}
          saturation={0}
          fade
          speed={0}
        />
      )}
    </Canvas>
  );
}
