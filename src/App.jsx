import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollReveal from "./components/customScroll";
import BackgroundCanvas from "./components/three/BackgroundCanvas";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const tawk = document.createElement("script");
    tawk.src = "https://embed.tawk.to/6889923e450f911926ceb05c/1j1cm6i24";
    tawk.async = true;
    tawk.charset = "UTF-8";
    tawk.setAttribute("crossorigin", "*");
    document.body.appendChild(tawk);
  }, []);

  return (
    <div className="relative min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden bg-black">
      <CustomCursor />

      <BackgroundCanvas />

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-0 pointer-events-none" />

      {/* Theme Toggle Button */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-slate-800 text-yellow-400 border border-slate-700 shadow-xl hover:scale-110 transition-transform hidden sm:flex items-center justify-center"
        title="Toggle Theme"
      >
        {dark ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        )}
      </button>

      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        <ScrollReveal animation="fadeDown"><Hero /></ScrollReveal>
        <ScrollReveal animation="fadeRight" delay={0.2}><About /></ScrollReveal>
        <ScrollReveal animation="scale" delay={0.1}><Skills /></ScrollReveal>
        <ScrollReveal animation="fadeLeft" delay={0.3}><WorkExperience /></ScrollReveal>
        <ScrollReveal animation="rotate" delay={0.2}><Education /></ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.2}><Certifications /></ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.1}><Projects /></ScrollReveal>
        <ScrollReveal animation="scale" delay={0.2}><Contact /></ScrollReveal>
        <Footer />
      </motion.div>
    </div>
  );
};

export default App;
