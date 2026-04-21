"use client";

import React, { useRef } from "react";
import { FaRobot, FaInstagram } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "@/components/motion/ScrambleText";
import { HoloEffect } from "@/components/motion";

gsap.registerPlugin(ScrollTrigger);

const AI_PROJECTS = [
  {
    title: "Atlas — Portfolio AI Assistant",
    subtitle: "RAG-Powered Chatbot",
    status: "live",
    statusLabel: "Live on this site",
    Icon: FaRobot,
    description:
      "A context-aware AI assistant built on Claude Haiku with a custom BM25 retrieval layer. Searches a 250+ entry knowledge base to answer questions about my work, skills, and services — grounded, not hallucinated.",
    highlights: [
      "Custom BM25 TF-IDF retrieval over a JSON knowledge base",
      "Claude Haiku with RAG context injection",
      "Fallback to n8n webhook for static deployments",
      "Session-based conversation with structured prompting",
    ],
    tech: ["Claude API", "RAG", "Next.js", "n8n"],
    cta: { label: "Chat with Atlas ↓", action: "atlas" },
    color: "#D9FF00",
  },
  {
    title: "AI Content Pipeline",
    subtitle: "Instagram & YouTube Automation",
    status: "in-progress",
    statusLabel: "In progress",
    Icon: FaInstagram,
    description:
      "An n8n workflow that takes a topic, generates platform-native content end-to-end — hook, body, CTA, hashtags — and auto-posts to Instagram and schedules YouTube descriptions without any manual copy-pasting.",
    highlights: [
      "AI-written hooks engineered to stop the scroll",
      "Full post body + CTA generated per platform format",
      "Auto-hashtag generation tuned for reach",
      "Scheduled auto-posting via Instagram Graph & YouTube APIs",
    ],
    tech: ["n8n", "OpenAI API", "Instagram Graph API", "YouTube Data API"],
    cta: { label: "Subscribe for updates →", action: "newsletter" },
    color: "#e1306c",
  },
];

function scrollToSection(action) {
  if (action === "atlas") {
    document.querySelector('[aria-label="Open AI assistant chat"]')?.click();
  } else if (action === "newsletter") {
    window.open("https://thestackshift.beehiiv.com", "_blank", "noopener,noreferrer");
  }
}

export default function AIProjects() {
  const sectionRef  = useRef(null);
  const aiTextRef   = useRef(null);
  const headerRef   = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const textEl   = aiTextRef.current;
    const headerEl = headerRef.current;

    // SVG "AI" stroke-draw → fill animation
    if (textEl) {
      gsap.set(textEl, { attr: { "stroke-dasharray": 1000, "stroke-dashoffset": 1000, fill: "none" } });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: headerEl, start: "top 80%", once: true },
      });

      tl.to(textEl, { attr: { "stroke-dashoffset": 0 }, duration: 0.8, ease: "power2.inOut" })
        .to(textEl, { attr: { fill: "#D9FF00" }, duration: 0.4, ease: "none" });
    }

    // Cards: rotation + translate up + stagger
    const cards = gsap.utils.toArray(".ai-project-card", sectionRef.current);
    cards.forEach((card, i) => {
      const tags = card.querySelectorAll(".ai-tech-tag");

      gsap.set(card, { opacity: 0, y: 50, rotation: -3 });
      gsap.set(tags, { opacity: 0 });

      const cardTl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });

      cardTl
        .to(card, {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power2.out",
        })
        .to(
          tags,
          {
            opacity: 1,
            duration: 0.25,
            stagger: 0.06,
            ease: "power2.out",
            onComplete: () => {
              // neon-green glow pulse trail
              tags.forEach((tag, j) => {
                gsap.to(tag, {
                  keyframes: [
                    { boxShadow: "0 0 10px rgba(0,255,133,0.6)", duration: 0.2 },
                    { boxShadow: "0 0 0px rgba(0,255,133,0)",   duration: 0.5 },
                  ],
                  delay: j * 0.06,
                });
              });
            },
          },
          "-=0.1"
        );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="ai-projects"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          {/* "AI" rendered as SVG with stroke-draw animation */}
          <h2 className="flex items-baseline justify-center gap-3 text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            <span className="relative inline-block">
              <svg
                width="90"
                height="58"
                viewBox="0 0 90 58"
                aria-label="AI"
                fill="none"
                className="inline-block overflow-visible align-bottom"
                style={{ verticalAlign: 'baseline' }}
              >
                <text
                  ref={aiTextRef}
                  x="4"
                  y="52"
                  style={{
                    fontFamily: '"Space Grotesk", system-ui, sans-serif',
                    fontSize: "56px",
                    fontWeight: "800",
                    letterSpacing: "-0.04em",
                    fill: "none",
                    stroke: "var(--neon-yellow)",
                    strokeWidth: "1.5",
                    strokeLinejoin: "round",
                    strokeLinecap: "round",
                    strokeDasharray: "1000",
                    strokeDashoffset: "1000",
                  }}
                >
                  AI
                </text>
              </svg>
            </span>
            <span className="text-gradient">Projects</span>
          </h2>

          <div
            className="w-24 h-1.5 mx-auto rounded-full mb-6"
            style={{ background: "linear-gradient(90deg, var(--neon-yellow), var(--neon-green))" }}
          />
          <p className="max-w-2xl mx-auto text-lg" style={{ color: "var(--fg-muted)" }}>
            <ScrambleText
              text="Real AI systems — not mockups. Each one is live, in-progress, or demonstrable on this page."
              delay={0.2}
              duration={900}
              triggerOnMount={false}
            />
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {AI_PROJECTS.map((project, index) => {
            const Icon = project.Icon;
            return (
              <HoloEffect key={project.title} mode="all" color={project.color} className="h-full">
                <div
                  className="ai-project-card glass-card flex flex-col overflow-hidden group"
                  style={{ transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "rgba(217,255,0,0.3)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(217,255,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(to right, ${project.color}, ${project.color}99)` }}
                  />

                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${project.color}18`, border: `1px solid ${project.color}40` }}
                      >
                        <Icon style={{ color: project.color }} className="text-lg" />
                      </div>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full border"
                        style={
                          project.status === "live"
                            ? { background: "rgba(0,255,133,0.08)", borderColor: "rgba(0,255,133,0.25)", color: "var(--neon-green)" }
                            : { background: "rgba(251,191,36,0.08)", borderColor: "rgba(251,191,36,0.25)", color: "#fbbf24" }
                        }
                      >
                        {project.statusLabel}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold mb-1" style={{ color: "var(--fg)" }}>
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium mb-4" style={{ color: project.color }}>
                      {project.subtitle}
                    </p>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--fg-muted)" }}>
                      {project.description}
                    </p>

                    <div className="space-y-2 mb-6 flex-1">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--fg-muted)" }}>
                          <span className="mt-0.5 shrink-0" style={{ color: "var(--neon-green)" }}>✓</span>
                          <span className="leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech tags — animated separately after card lands */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="ai-tech-tag text-xs px-2.5 py-1 rounded-full transition-colors duration-200"
                          style={{
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            color: "var(--fg-muted)",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,255,133,0.4)"; e.currentTarget.style.color = "var(--neon-green)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--fg-muted)"; }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => scrollToSection(project.cta.action)}
                      className="mt-auto w-full py-3 rounded-xl text-sm font-semibold border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{ borderColor: `${project.color}50`, color: project.color }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${project.color}12`;
                        e.currentTarget.style.borderColor = `${project.color}80`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = `${project.color}50`;
                      }}
                    >
                      {project.cta.label}
                    </button>
                  </div>
                </div>
              </HoloEffect>
            );
          })}
        </div>
      </div>

    </section>
  );
}
