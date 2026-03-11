import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
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

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden bg-slate-950">
      <CustomCursor />

      <BackgroundCanvas />

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-0 pointer-events-none" />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919416149624"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-500 text-white shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8 group-hover:animate-pulse" />
      </a>

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
