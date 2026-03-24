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
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          Arsenal
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500 -mr-16 -mt-16"></div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <span className="text-3xl bg-slate-800/80 p-3 rounded-xl border border-slate-700 shadow-sm">
                {category.icon}
              </span>
              <h3 className="text-xl font-bold text-white">
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5 relative z-10">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm font-medium px-3 py-1.5 bg-slate-900 border border-slate-700/50 text-slate-300 rounded-md hover:border-purple-500 hover:text-purple-300 transition-colors shadow-sm"
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
