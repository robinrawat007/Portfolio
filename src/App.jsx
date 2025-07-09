import React, { useEffect, useState } from 'react';
import bgImage from './assets/bg.jpg';
import { motion } from 'framer-motion';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  const [dark, setDark] = useState(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme === 'dark' : true;
});

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
   <div
  className="relative min-h-screen bg-cover bg-center bg-no-repeat text-gray-900 dark:text-gray-100 transition-colors duration-300"
  style={{ backgroundImage: `url(${bgImage})` }}
>
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <button
        className="fixed bottom-4 right-4 z-20 p-3 rounded-full bg-indigo-600 text-white shadow-lg focus:outline-none"
        onClick={() => setDark(!dark)}
        aria-label="Toggle dark mode"
      >
        {dark ? '☀️' : '🌙'}
      </button>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <WorkExperience />
        <Education />
        <Projects />
        <Contact />
        <Footer />
      </motion.div>
    </div>
  );
};

export default App;