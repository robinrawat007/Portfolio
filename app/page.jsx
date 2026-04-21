"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MarqueeTicker from "@/components/MarqueeTicker";
import ScrollReveal from "@/components/customScroll";
import AIProjects from "@/components/AIProjects";
import LenisProvider from "@/components/LenisProvider";
import GSAPAnimations from "@/components/GSAPAnimations";
import Services from "@/components/Services";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";

// Deferred — not needed for initial render
const BackgroundCanvas = dynamic(() => import("@/components/three/BackgroundCanvas"), { ssr: false });
const AtlasChat = dynamic(() => import("@/components/AtlasChat"), { ssr: false });
const SocialSidebar = dynamic(() => import("@/components/SocialSidebar"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const FloatingNewsletter = dynamic(() => import("@/components/FloatingNewsletter"), { ssr: false });

export default function Home() {
  return (
    <LenisProvider>
      <div className="relative min-h-screen text-slate-100 overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          style={{ background: 'var(--neon-yellow)', color: '#000' }}
        >
          Skip to main content
        </a>
        <div className="fixed inset-0 -z-20" style={{ background: 'var(--bg)' }} />
        
        {/* Global Background Layer: Drifting grid + neon ambience */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Ambient Orbs */}
          <div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.06]"
            style={{ background: 'var(--neon-yellow)' }}
          />
          <div
            className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] rounded-full blur-[180px] opacity-[0.04]"
            style={{ background: 'var(--neon-green)' }}
          />

          {/* Global Diagonal Drifting Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              animation: 'grid-drift 40s linear infinite',
            }}
          />
          {/* Pulsing neon dots at grid intersections */}
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle, var(--neon-blue) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <BackgroundCanvas />
        </div>

        <ScrollProgressBar />
        <CustomCursor />
        <SocialSidebar />
        <AtlasChat />
        <FloatingNewsletter />

        <Navbar />
        <GSAPAnimations />

        <main id="main-content" tabIndex={-1}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            <ErrorBoundary><ScrollReveal animation="fade"><Hero /></ScrollReveal></ErrorBoundary>
            <MarqueeTicker />
            <ErrorBoundary><ScrollReveal animation="fadeRight" delay={0.2}><About /></ScrollReveal></ErrorBoundary>
            <ErrorBoundary><ScrollReveal animation="fadeUp" delay={0.1}><Projects /></ScrollReveal></ErrorBoundary>
            <ErrorBoundary><ScrollReveal animation="fadeUp" delay={0.15}><AIProjects /></ScrollReveal></ErrorBoundary>
            <ErrorBoundary><ScrollReveal animation="fadeUp" delay={0.15}><Services /></ScrollReveal></ErrorBoundary>
            <ErrorBoundary><ScrollReveal animation="scale" delay={0.1}><Skills /></ScrollReveal></ErrorBoundary>
            <ErrorBoundary><ScrollReveal animation="fadeLeft" delay={0.3}><WorkExperience /></ScrollReveal></ErrorBoundary>
            <ErrorBoundary><ScrollReveal animation="scale" delay={0.2}><Contact /></ScrollReveal></ErrorBoundary>
            <Footer />
          </motion.div>
        </main>
      </div>
    </LenisProvider>
  );
}
