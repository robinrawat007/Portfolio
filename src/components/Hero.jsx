import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SceneCanvas from "./three/SceneCanvas";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const textVariant = {
  hidden: { width: 0 },
  show: {
    width: "auto",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  const [showDesignation, setShowDesignation] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowDesignation(true), 2000);
    const timer2 = setTimeout(() => setShowButton(true), 3500);
    const timer3 = setTimeout(() => setAnimationDone(true), 1600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <SceneCanvas />
      </div>

      <motion.div
        className="relative z-10 space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className={`text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white overflow-hidden whitespace-nowrap ${
            animationDone ? "" : "border-r-4 border-indigo-600"
          }`}
          variants={textVariant}
        >
          Hi, I'm{" "}
          <span className="text-indigo-600 transition-colors duration-300 hover:text-cyan-500">
            Robin Rawat
          </span>
        </motion.h1>

        <div className="h-[40px] md:h-[48px] flex items-center justify-center">
          {showDesignation && (
            <motion.p
              className="text-lg md:text-2xl max-w-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{
                color: "#4f46e5",
                transition: { duration: 0.3 },
              }}
            >
              Frontend Developer | Angular + React
            </motion.p>
          )}
        </div>

        {showButton ? (
          <motion.a
            href="#projects"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: 0.3,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 12px rgba(6, 182, 212, 0.8)",
            }}
          >
            View Projects
          </motion.a>
        ) : (
          <div className="h-12" />
        )}
      </motion.div>
    </section>
  );
}
