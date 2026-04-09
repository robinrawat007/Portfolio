"use client";

import { motion } from 'framer-motion';
import { useReducedMotion } from "framer-motion";

const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 }
  },
  fade: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 }
  },
  fadeDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 }
  },
  fadeRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 }
  }
};

export default function ScrollReveal({ 
  children, 
  delay = 0.1, 
  animation = 'fadeUp',
  duration = 0.6 
}) {
  const prefersReducedMotion = useReducedMotion();
  const selectedAnimation = animations[animation] || animations.fadeUp;
  
  return (
    <motion.div
      initial={prefersReducedMotion ? false : selectedAnimation.initial}
      whileInView={prefersReducedMotion ? undefined : selectedAnimation.animate}
      transition={prefersReducedMotion ? undefined : { duration, delay, ease: "easeOut" }}
      viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
