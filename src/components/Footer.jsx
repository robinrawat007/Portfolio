import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="py-10 px-6 text-center text-sm bg-white dark:bg-gray-900 shadow-inner"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <p className="mb-5 text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} <span className="font-semibold text-indigo-600 dark:text-indigo-400">Robin Rawat</span>. All rights reserved.
      </p>

      <a
        href="./resume.pdf"
        download
        className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl hover:scale-105 hover:shadow-indigo-700/50 transition-all duration-300"
      >
        📄 Download Resume
      </a>
    </motion.footer>
  );
}
