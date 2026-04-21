import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

/**
 * DripEffect component
 * Spawns "water droplets" constantly along the width of the element while hovered.
 */
export default function DripEffect({ children, color = "var(--neon-yellow)", className = "" }) {
  const dripContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const createDrip = React.useCallback(() => {
    if (!dripContainerRef.current) return;

    // Create droplet
    const droplet = document.createElement("span");
    const leftPos = Math.random() * 100;
    const size = Math.random() * 3 + 2; // 2px to 5px
    
    Object.assign(droplet.style, {
      position: "absolute",
      left: `${leftPos}%`,
      bottom: "-4px",
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 0,
      opacity: 0.8,
      transform: "translateX(-50%)",
      boxShadow: `0 0 8px ${color}`,
    });

    dripContainerRef.current.appendChild(droplet);

    const tl = gsap.timeline({
      onComplete: () => {
        if (droplet.parentNode) {
          droplet.parentNode.removeChild(droplet);
        }
      },
    });

    tl.to(droplet, {
      y: Math.random() * 20 + 20, // 20px to 40px fall
      scaleY: 3,
      scaleX: 0.6,
      duration: Math.random() * 0.4 + 0.4,
      ease: "power2.in",
    })
    .to(droplet, {
      opacity: 0,
      scale: 0,
      duration: 0.2,
    }, "-=0.2");
  }, [color]);

  useEffect(() => {
    let interval;
    if (isHovered) {
      // Periodic dripping
      interval = setInterval(() => {
        createDrip();
      }, 150); // Every 150ms
    }
    return () => clearInterval(interval);
  }, [isHovered, createDrip]);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container for droplets */}
      <div
        ref={dripContainerRef}
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{ zIndex: -1 }}
      />
      
      {children}
    </div>
  );
}
