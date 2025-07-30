import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const skills = [
  'React',
  'Angular',
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'TailwindCSS',
  'Redux',
  'MaterialUI',
  'RxJS',
  'Figma',
  'Git',
  'Jest',
  'CI/CD',
  'Express.js',
  'Postman',
];

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Skills
      </motion.h2>

      <motion.div
        variants={itemVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.2}
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          scale={1.02}
          transitionSpeed={1200}
          className="bg-white dark:bg-gray-900 p-10 md:p-12 rounded-xl shadow-lg max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg text-center text-sm font-medium shadow-md"
              >
                {skill}
              </div>
            ))}
          </div>
        </Tilt>
      </motion.div>
    </section>
  );
}
