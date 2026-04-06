"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingNewsletter from "@/components/FloatingNewsletter";
import MarqueeTicker from "@/components/MarqueeTicker";
import ScrollReveal from "@/components/customScroll";
import CustomCursor from "@/components/CustomCursor";
import AIProjectsComingSoon from "@/components/AIProjectsComingSoon";
import Services from "@/components/Services";
import AtlasChat from "@/components/AtlasChat";
import SocialSidebar from "@/components/SocialSidebar";

const BackgroundCanvas = dynamic(() => import("@/components/three/BackgroundCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        Skip to main content
      </a>
      <div className="fixed inset-0 bg-slate-950 -z-20" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <BackgroundCanvas />
      </div>

      <CustomCursor />
      <SocialSidebar />
      <AtlasChat />
      <FloatingNewsletter />

      <Navbar />

      <main id="main-content" tabIndex={-1}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        <ScrollReveal animation="fade"><Hero /></ScrollReveal>
        <MarqueeTicker />
        <ScrollReveal animation="fadeRight" delay={0.2}><About /></ScrollReveal>
        <ScrollReveal animation="scale" delay={0.1}><Skills /></ScrollReveal>
        <ScrollReveal animation="fadeLeft" delay={0.3}><WorkExperience /></ScrollReveal>
        <ScrollReveal animation="rotate" delay={0.2}><Education /></ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.2}><Certifications /></ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.1}><Projects /></ScrollReveal>
        <ScrollReveal animation="scale" delay={0.2}><AIProjectsComingSoon /></ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.15}><Services /></ScrollReveal>
        <ScrollReveal animation="scale" delay={0.2}><Contact /></ScrollReveal>
        <Footer />
      </motion.div>
      </main>
    </div>
  );
}
