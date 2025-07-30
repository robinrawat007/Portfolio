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
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5 },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
        >
          Skills
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              custom={index}
              variants={itemVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                glareEnable={true}
                glareMaxOpacity={0.15}
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl text-sm font-medium transition-all"
              >
                {skill}
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
