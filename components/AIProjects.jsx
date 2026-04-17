"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaBolt, FaInstagram } from "react-icons/fa";

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
    color: "#7B4FE0",
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
  return (
    <section id="ai-projects" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
            AI <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF] mx-auto rounded-full mb-6" />
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Real AI systems — not mockups. Each one is live, in-progress, or demonstrable on this page.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {AI_PROJECTS.map((project, index) => {
            const Icon = project.Icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="glass-card flex flex-col group hover:-translate-y-1 transition-transform duration-500 overflow-hidden"
              >
                {/* Gradient accent top bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(to right, ${project.color}, ${project.color}99)` }}
                />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + Status */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}
                    >
                      <Icon style={{ color: project.color }} className="text-lg" />
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        project.status === "live"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      }`}
                    >
                      {project.statusLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-100 mb-1">{project.title}</h3>
                  <p className="text-xs font-medium mb-4" style={{ color: project.color }}>
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6 flex-1">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                        <span className="leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 bg-slate-800/80 border border-slate-700 text-slate-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => scrollToSection(project.cta.action)}
                    className="mt-auto w-full py-3 rounded-xl text-sm font-semibold border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 hover:scale-[1.02]"
                    style={{
                      borderColor: `${project.color}50`,
                      color: project.color,
                      focusVisible: { ringColor: project.color },
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${project.color}15`;
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
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B4FE0]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2DCFCF]/6 rounded-full blur-[140px] pointer-events-none" />
    </section>
  );
}
