import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const textVariant = {
  hidden: { width: 0 },
  show: (i) => ({
    width: "auto",
    transition: {
      duration: 1.5,
      delay: i * 0.5,
      ease: "easeInOut",
    },
  }),
};

export default function Hero() {
  const [showDesignation, setShowDesignation] = useState(false);
  const [removeBorder, setRemoveBorder] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowDesignation(true), 2000);
    const timer2 = setTimeout(() => setRemoveBorder(true), 2500);
    const timer3 = setTimeout(() => setShowButton(true), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <motion.section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-white dark:bg-gray-900"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        className={`text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white overflow-hidden whitespace-nowrap ${
          removeBorder ? "" : "border-r-4 border-indigo-600"
        }`}
        custom={0}
        variants={textVariant}
      >
        Hi, I'm <span className="text-indigo-600">Robin Rawat</span>
      </motion.h1>

      {showDesignation && (
        <motion.p
          className="text-lg md:text-2xl max-w-xl text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Frontend Developer | Angular + React
        </motion.p>
      )}
{showButton && (
  <motion.a
    href="#projects"
    className="mt-8 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
    initial={{ opacity: 0, y: -300 }}
    animate={{ 
      opacity: 1,
      y: [ -300, 0, -25, 0, -10, 0 ]
    }}
    transition={{
      duration: 1.6,
      ease: "easeOut",
      delay: 0.3,
      times: [0, 0.5, 0.65, 0.8, 0.9, 1]
    }}
    whileHover={{ scale: 1.1, rotate: 2 }}
  >
    View Projects
  </motion.a>
)}
    </motion.section>
  );
}
