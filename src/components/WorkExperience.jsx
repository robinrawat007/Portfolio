import { motion } from "framer-motion";

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

const bulletVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function WorkExperience() {
  const bulletPoints = [
    "Spearheaded development of 10+ responsive web apps with React, Angular, Tailwind CSS & TypeScript, boosting average load speed by 30%.",
    "Collaborated via Figma & ClickUp to accelerate feature rollout by 20% in Agile sprints.",
    "Applied lazy loading, RxJS, and modular architecture to trim bundle size by 20%.",
    "Optimized API reliability by 40% using Redux state handling and structured error flows.",
    "Built reusable component libraries, cutting development time by 25% across projects.",
    "Resolved open‑source vulnerabilities within SLA using Mend scans (100% compliance).",
    "Streamlined Git workflows & CI/CD pipelines, reducing deployment failures by 15%.",
    "Maintained 85%+ unit‑test coverage with Jest and enforced standards via code reviews.",
    "Facilitated frontend–backend coordination to improve delivery efficiency.",
  ];

  return (
    <section
      id="experience"
      className="py-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto"
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
          Work Experience
        </motion.h2>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-300"
          variants={cardVariant}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <motion.h3
              className="text-xl font-semibold text-indigo-600 dark:text-indigo-400"
              variants={cardVariant}
            >
              Software Engineer · Builder.AI
            </motion.h3>
            <motion.span
              className="text-sm text-gray-500 dark:text-gray-400"
              variants={cardVariant}
            >
              Jan 2021 – Apr 2025
            </motion.span>
          </div>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 text-sm leading-6">
            {bulletPoints.map((point, i) => (
              <motion.li key={i} variants={bulletVariant}>
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
