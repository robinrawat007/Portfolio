"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    /** false during SSR + first client paint — set in effect so server HTML matches touch + non-touch clients. */
    const [showCursor, setShowCursor] = useState(false);

    useEffect(() => {
        const touch =
            typeof window !== 'undefined' &&
            (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
        if (touch) return;

        setShowCursor(true);

        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('a') !== null ||
                e.target.closest('button') !== null
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    if (!showCursor) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-emerald-400 rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)] pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(52,211,153,0.1)' : 'transparent',
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
            />
        </>
    );
}
