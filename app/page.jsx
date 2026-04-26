"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";

import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import MarqueeTicker from "@/components/MarqueeTicker";
import ScrollReveal from "@/components/customScroll";

import LenisProvider from "@/components/LenisProvider";
import GSAPAnimations from "@/components/GSAPAnimations";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";

// Deferred — not needed for initial render
const AtlasChat = dynamic(() => import("@/components/AtlasChat"), { ssr: false });
const SocialSidebar = dynamic(() => import("@/components/SocialSidebar"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

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
        

        <ScrollProgressBar />
        <CustomCursor />
        <SocialSidebar />
        <AtlasChat />

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
            <ErrorBoundary><ScrollReveal animation="scale" delay={0.1}><Skills /></ScrollReveal></ErrorBoundary>
            <ErrorBoundary><ScrollReveal animation="fadeUp" delay={0.1}><Projects /></ScrollReveal></ErrorBoundary>

            <Newsletter />
            <ErrorBoundary><ScrollReveal animation="scale" delay={0.2}><Contact /></ScrollReveal></ErrorBoundary>
            <Footer />
          </motion.div>
        </main>
      </div>
    </LenisProvider>
  );
}
