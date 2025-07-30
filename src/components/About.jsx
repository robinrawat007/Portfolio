import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>

      <motion.div
        variants={cardVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.2}
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          scale={1.02}
          transitionSpeed={1200}
          className="bg-white dark:bg-gray-900 p-10 md:p-12 rounded-xl shadow-lg max-w-3xl mx-auto text-center"
        >
          <p className="text-lg leading-7 text-gray-700 dark:text-gray-300">
            Offering 4+ years of experience building fast, scalable, and responsive web applications
            using React, Angular, TypeScript, and JavaScript. Proficient in modern UI frameworks
            including Tailwind CSS with a strong eye for design and performance. Skilled in Redux,
            RxJS, context APIs, lazy loading, and debugging. Experienced in collaborating with
            cross-functional teams in Agile environments. Committed to clean code, accessibility
            standards, and CI/CD best practices.
          </p>
          <div className="mt-6">
            <a
              href="mailto:robinrawat37@gmail.com"
              className="text-indigo-600 font-medium hover:underline"
            >
              robinrawat37@gmail.com
            </a>
          </div>
        </Tilt>
      </motion.div>
    </section>
  );
}
