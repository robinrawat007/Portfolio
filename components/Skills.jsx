"use client";

import React from 'react';
import { motion } from 'framer-motion';

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
    <section id="skills" className="py-24 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 data-split className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight" style={{ color: 'var(--fg)' }}>
          Arsenal
        </h2>
        <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-green))' }} />
        <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--fg-muted)' }}>
          Technologies and tools I use to build exceptional digital experiences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="glass-card p-8 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl group-hover:opacity-20 transition-all duration-500 -mr-16 -mt-16 opacity-8" style={{ background: 'var(--neon-yellow)' }} />

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <span className="text-3xl p-3 rounded-xl border shadow-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                {category.icon}
              </span>
              <h3 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5 relative z-10">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm font-medium px-3 py-1.5 rounded-md transition-colors shadow-sm cursor-default"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--neon-yellow)'; e.currentTarget.style.color = 'var(--neon-yellow)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fg-muted)'; }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
