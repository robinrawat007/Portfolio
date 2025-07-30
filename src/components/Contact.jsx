import { motion } from "framer-motion";

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
      <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Contact
      </h2>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        Have a project or want to hire me? Drop a message!
      </p>

      <div className="flex flex-wrap justify-center items-center gap-6">
        <a
          href="https://github.com/robinrawat007"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://skillicons.dev/icons?i=github"
            alt="GitHub"
            className="w-10 h-10 hover:scale-110 transition-transform"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/robinrawat1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://skillicons.dev/icons?i=linkedin"
            alt="LinkedIn"
            className="w-10 h-10 hover:scale-110 transition-transform"
          />
        </a>
        <a href="mailto:robinrawat37@gmail.com">
          <img
            src="https://skillicons.dev/icons?i=gmail"
            alt="Email"
            className="w-10 h-10 hover:scale-110 transition-transform"
          />
        </a>

        <div className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
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
        </div>
      </div>
    </motion.section>
  );
}