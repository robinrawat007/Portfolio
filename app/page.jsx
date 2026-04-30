"use client";

import React from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import ScrollReveal from "@/components/customScroll";
import LenisProvider from "@/components/LenisProvider";
import ErrorBoundary from "@/components/ErrorBoundary";

gsap.registerPlugin(ScrollTrigger);

const MarqueeTicker    = dynamic(() => import("@/components/MarqueeTicker"));
const About            = dynamic(() => import("@/components/About"));
const Skills           = dynamic(() => import("@/components/Skills"));
const Projects         = dynamic(() => import("@/components/Projects"));
const Newsletter       = dynamic(() => import("@/components/Newsletter"));
const Contact          = dynamic(() => import("@/components/Contact"));
const Footer           = dynamic(() => import("@/components/Footer"));
const GSAPAnimations   = dynamic(() => import("@/components/GSAPAnimations"), { ssr: false });
const ScrollProgressBar = dynamic(() => import("@/components/motion/ScrollProgressBar"), { ssr: false });
const AtlasChat        = dynamic(() => import("@/components/AtlasChat"), { ssr: false });
const SocialSidebar    = dynamic(() => import("@/components/SocialSidebar"), { ssr: false });
const CustomCursor     = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function Home() {
  const [preloaderDone, setPreloaderDone] = React.useState(false);
  const [enhancementsReady, setEnhancementsReady] = React.useState(false);

  React.useEffect(() => {
    if (!preloaderDone) return;

    // Refresh all ScrollTrigger positions now that sections are visible
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    // Defer cursor/GSAP/progress-bar until idle — they're non-critical
    const loadEnhancements = () => setEnhancementsReady(true);
    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(loadEnhancements, { timeout: 400 })
        : window.setTimeout(loadEnhancements, 100);

    return () => {
      cancelAnimationFrame(rafId);
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, [preloaderDone]);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
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

          <Navbar />
          <SocialSidebar />
          <AtlasChat />
          {enhancementsReady && (
            <>
              <GSAPAnimations />
              <CustomCursor />
              <ScrollProgressBar />
            </>
          )}

          <main id="main-content" tabIndex={-1}>
            <div className="relative z-10 animate-site-enter">
              <ErrorBoundary>
                <ScrollReveal animation="fade">
                  <Hero />
                </ScrollReveal>
              </ErrorBoundary>

              {/*
                Rendered immediately so resources (images, JS chunks, video) load
                during the preloader. Hidden behind it via opacity — Lenis sees
                the full page height from the start so scroll is correct on reveal.
              */}
              <div
                style={{
                  opacity: preloaderDone ? 1 : 0,
                  pointerEvents: preloaderDone ? 'auto' : 'none',
                  transition: preloaderDone ? 'opacity 0.6s ease' : 'none',
                }}
              >
                <MarqueeTicker />
                <ErrorBoundary><ScrollReveal animation="fadeRight" delay={0.2}><About /></ScrollReveal></ErrorBoundary>
                <ErrorBoundary><ScrollReveal animation="scale" delay={0.1}><Skills /></ScrollReveal></ErrorBoundary>
                <ErrorBoundary><ScrollReveal animation="fadeUp" delay={0.1}><Projects /></ScrollReveal></ErrorBoundary>
                <Newsletter />
                <ErrorBoundary><ScrollReveal animation="scale" delay={0.2}><Contact /></ScrollReveal></ErrorBoundary>
                <Footer />
              </div>
            </div>
          </main>
        </div>
      </LenisProvider>
    </>
  );
}
