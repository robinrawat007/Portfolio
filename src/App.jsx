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
import BackgroundCanvas from "./components/three/BackgroundCanvas";

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
      <BackgroundCanvas />

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-0 pointer-events-none" />

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
        <ScrollReveal animation="fadeUp" delay={0.1}><Projects /></ScrollReveal>
        <ScrollReveal animation="scale" delay={0.2}><Contact /></ScrollReveal>
        <Footer />
      </motion.div>
    </div>
  );
};

export default App;
