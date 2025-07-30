import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="py-8 px-4 text-center text-sm bg-white dark:bg-gray-900"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} <span className="font-semibold">Robin Rawat</span>. All rights reserved.
      </p>

      <a
        href="./resume.pdf"
        download
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
      >
        Download Resume
      </a>
    </motion.footer>
  );
}