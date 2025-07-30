import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const socialLinks = [
  {
    name: "GitHub",
    icon: "https://skillicons.dev/icons?i=github",
    link: "https://github.com/robinrawat007",
  },
  {
    name: "LinkedIn",
    icon: "https://skillicons.dev/icons?i=linkedin",
    link: "https://www.linkedin.com/in/robinrawat1",
  },
  {
    name: "Gmail",
    icon: "https://skillicons.dev/icons?i=gmail",
    link: "mailto:robinrawat37@gmail.com",
  },
];

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="py-20 px-6 bg-gray-100 dark:bg-gray-900 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact
      </motion.h2>

      <motion.p
        className="mb-10 text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Have a project or want to hire me? Drop a message!
      </motion.p>

      <div className="flex flex-wrap justify-center items-center gap-6">
        {socialLinks.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} glareEnable={true} glareMaxOpacity={0.2}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-12 h-12 rounded-full hover:scale-110 transition-transform duration-300"
                />
              </a>
            </Tilt>
          </motion.div>
        ))}

        <motion.div
          className="text-gray-700 dark:text-gray-300 flex items-center gap-2 mt-4 md:mt-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2 5.5C2 4.12 3.12 3 4.5 3h2A2.5 2.5 0 0 1 9 5.5v1A2.5 2.5 0 0 1 6.5 9H6a11 11 0 0 0 11 11v-.5A2.5 2.5 0 0 1 19.5 17h1A2.5 2.5 0 0 1 23 19.5v2A2.5 2.5 0 0 1 20.5 24C9.835 24 0 14.165 0 3.5 0 2.12 1.12 1 2.5 1h2A2.5 2.5 0 0 1 7 3.5V5a2.5 2.5 0 0 1-2.5 2.5H4.5C3.12 7.5 2 6.38 2 5.5z"
            />
          </svg>
          +91 94161 49624
        </motion.div>
      </div>
    </motion.section>
  );
}
