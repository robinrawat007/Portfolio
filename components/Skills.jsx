"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ArsenalPlayground from './ArsenalPlayground';

const skillCategories = [
  {
    title: "Technical Skills",
    icon: "💻",
    skills: ["Angular", "React", "Next.js", "React Native", "TypeScript", "JavaScript", "Redux", "Zustand", "Tan Stack", "Tailwind", "Material UI", "RESTful APIs", "Jest", "HTML", "CSS", "WebSockets", "Git", "Unit Testing", "RxJS"]
  },
  {
    title: "AI and LLM Tools",
    icon: "🤖",
    skills: ["OpenAI API", "Claude API", "LangChain", "Prompt Engineering", "AI Automation", "n8n", "RAG Systems", "Hugging Face"]
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    skills: ["Postman", "ClickUp", "Jira", "Mend", "Figma", "Android Studio", "VS Code", "Antigravity", "Chrome DevTools", "GitHub", "GitLab", "Sentry", "Vercel / Netlify", "Lighthouse", "AWS"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="pt-24 pb-12 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight" style={{ color: 'var(--fg)' }}>
          Arsenal
        </h2>
        <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
        <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--fg-muted)' }}>
          Technologies and tools I use to build exceptional digital experiences.
        </p>
      </motion.div>

      <ArsenalPlayground />
    </section>
  );
}
