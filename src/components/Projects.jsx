import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Builder Studio",
    description: "No-Code App Development Platform",
    demo: "#",
    github: "https://github.com/robinrawat007",
    tech: ["Angular", "Bootstrap", "RxJs", "TypeScript", "Jest"]
  },
  {
    title: "Builder Tracker",
    description: "Real-Time Progress Tracking Dashboard",
    demo: "#",
    github: "https://github.com/robinrawat007",
    tech: ["Angular", "Bootstrap", "RxJs", "TypeScript", "Jest"]
  },
  {
    title: "Builder Home",
    description: "User Onboarding & Account Portal",
    demo: "#",
    github: "https://github.com/robinrawat007",
    tech: ["React", "JavaScript", "Redux", "TailwindCSS"]
  }
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: 'easeOut' }
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Projects
      </motion.h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((proj, index) => (
          <motion.div
            key={proj.title}
            custom={index}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.1}
              scale={1.03}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">{proj.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{proj.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tech.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-white rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
