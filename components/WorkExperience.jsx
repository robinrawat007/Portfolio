"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function WorkExperience() {
  const experiences = [
    {
      company: "Arth Impact",
      role: "Software Engineer",
      period: "09/2025 - 01/2026",
      description: "A company focused on fintech solutions",
      points: [
        "Developed and maintained responsive fintech dashboards and loan management modules using React.js and Angular.",
        "Implemented dynamic form handling, component-based architecture, and custom hooks for reusable UI logic.",
        "Integrated APIs for loan, customer, and payment workflows ensuring seamless data synchronization.",
        "Enhanced UI/UX consistency using Material UI, Angular Material, and custom component libraries.",
        "Enhanced cross-platform mobile applications using React Native for Android, focusing on scalable UI components and API-driven workflows."
      ]
    },
    {
      company: "Builder.AI",
      role: "Software Engineer",
      period: "01/2021 - 04/2025",
      description: "A technology company specializing in software development",
      points: [
        "Spearheaded development of 10+ responsive web apps using Angular14+, React, Next.js, Tailwind CSS, and TypeScript, boosting average load speed by 30%.",
        "Converted monolithic frontend into scalable microfrontend modules. Enhanced development flexibility.",
        "Partnered with designers and product managers to accelerate feature rollout by 20% through Agile sprints and effective collaboration tools.",
        "Optimized application performance by leveraging lazy loading and RxJS, reducing bundle size by 20% and simplifying maintenance.",
        "Enhanced API reliability by 40% through effective integration of RESTful APIs and optimized state management with Redux.",
        "Built scalable, reusable components, cutting development time by 25% and ensuring 85%+ test coverage using Jest to maintain code quality.",
        "Conducted vulnerability scans to ensure 100% SLA compliance for critical dependencies, while bridging frontend and backend coordination to improve delivery efficiency."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          Experience
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B4FE0] via-[#5b6ef1] to-[#2DCFCF] mx-auto rounded-full"></div>
      </motion.div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-purple-500/50 before:to-transparent">
        {experiences.map((exp, index) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-500 bg-slate-900 text-purple-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 md:p-8 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex flex-col mb-4">
                <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-1">
                  {exp.period}
                </span>
                <h3 className="text-2xl font-bold text-slate-100">
                  {exp.role}
                </h3>
                <p className="text-purple-400 font-medium text-lg">
                  {exp.company}
                </p>
                <p className="text-slate-400 text-sm italic mt-1">{exp.description}</p>
              </div>

              <ul className="space-y-2 mt-4">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex text-slate-300 text-sm leading-relaxed">
                    <span className="text-purple-500 mr-2 mt-1 shrink-0">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
