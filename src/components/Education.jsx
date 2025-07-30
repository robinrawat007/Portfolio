import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cert from "../assets/certi.pdf";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const modalOverlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export default function Education() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      id="education"
      className="py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          variants={cardVariant}
        >
          Education & Certifications
        </motion.h2>

        <div className="space-y-8">
          <motion.div
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 hover:scale-[1.01] transition duration-300"
            variants={cardVariant}
          >
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              Bachelor of Computer Applications
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Hindu Institute of Management · 2019
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 hover:scale-[1.01] transition duration-300"
            variants={cardVariant}
          >
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              Advanced Program in Full Stack Software Engineering
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              NIIT, Delhi · 2020
            </p>

            <motion.button
              onClick={() => setShowModal(true)}
              className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 hover:bg-indigo-700 transition-transform duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Certificate
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={modalOverlay}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] p-4 relative overflow-hidden"
              variants={modalContent}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500"
              >
                &times;
              </button>

              <iframe
                src={cert}
                title="Certificate"
                className="w-full h-full rounded"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
