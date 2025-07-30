import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollReveal from "./components/customScroll";

import backgroundImage from "./assets/bg.jpg"; // ✅ import the image

const App = () => {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Tawk.to Script
  useEffect(() => {
    const tawk = document.createElement("script");
    tawk.src = "https://embed.tawk.to/6889923e450f911926ceb05c/1j1cm6i24";
    tawk.async = true;
    tawk.charset = "UTF-8";
    tawk.setAttribute("crossorigin", "*");
    document.body.appendChild(tawk);
  }, []);

  return (
    <div
      className="relative min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Toggle Button */}
      <button
        className="fixed top-4 right-4 z-20 p-3 rounded-full bg-indigo-600 text-white shadow-lg focus:outline-none"
        onClick={() => setDark(!dark)}
        aria-label="Toggle dark mode"
      >
        {dark ? "☀️" : "🌙"}
      </button>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        <ScrollReveal><Hero /></ScrollReveal>
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal><Skills /></ScrollReveal>
        <ScrollReveal><WorkExperience /></ScrollReveal>
        <ScrollReveal><Education /></ScrollReveal>
        <ScrollReveal><Projects /></ScrollReveal>
        <ScrollReveal><Contact /></ScrollReveal>
        <Footer />
      </motion.div>
    </div>
  );
};

export default App;
