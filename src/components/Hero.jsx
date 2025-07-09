import { motion } from 'framer-motion';
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center">
      <motion.h1 className="text-4xl md:text-6xl font-extrabold mb-4" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        Hi, I'm <span className="text-indigo-600">Robin Rawat</span>
      </motion.h1>
      <motion.p className="text-lg md:text-2xl max-w-xl" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        Frontend Developer | Angular + React
      </motion.p>
      <motion.a href="#projects" className="mt-8 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700" whileHover={{ scale: 1.05 }}>
        View Projects
      </motion.a>
    </section>
  );
}