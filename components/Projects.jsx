"use client";

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Builder Studio",
    subtitle: "No-Code App Development Platform",
    period: "01/2021 - 04/2025",
    points: [
      "Contributed to a low-code platform enabling users to build custom applications through a drag-and-drop interface.",
      "Developed dynamic, component-based UIs using Angular and TypeScript for high performance and maintainability.",
      "Built core modules including form builders, logic flow engines, and pricing configuration tools.",
      "Incorporated RESTful API services to support build automation, cost estimation, and live project previews.",
      "Ensured responsive design and cross-browser compatibility using Bootstrap and adaptive layout techniques."
    ],
    tech: ["Angular", "TypeScript", "Bootstrap", "REST APIs"]
  },
  {
    title: "Builder Tracker",
    subtitle: "Real-Time Project Tracking Dashboard",
    period: "01/2021 - 04/2025",
    points: [
      "Improved project tracking efficiency by engineering an internal platform for overseeing construction progress and milestones.",
      "Designed live dashboard interfaces using Angular and RxJS for continuous data synchronization.",
      "Built custom UI elements including interactive timelines, project summary cards, and real-time status views.",
      "Enabled instant updates through Web Socket integration, supporting seamless milestone tracking and feedback loops.",
      "Elevated user engagement by incorporating motion effects and responsive UI elements guided by Figma prototypes."
    ],
    tech: ["Angular", "RxJS", "WebSockets", "Figma"]
  },
  {
    title: "Builder Home",
    subtitle: "User Onboarding & Account Portal",
    period: "01/2021 - 04/2025",
    points: [
      "Developed a centralized management dashboard enabling users to oversee projects, teams, subscriptions, and account configurations.",
      "Built the complete frontend architecture using React.js, Next.js, TypeScript, and Tailwind CSS for a modern, responsive UI.",
      "Enforced secure authentication, role-based access controls, and intuitive onboarding workflows to enhance user experience.",
      "Created a reusable component library and utilized lazy loading to improve performance and reduce initial load times.",
      "Maintained 85%+ unit test coverage with Jest and actively participated in code reviews during Agile sprints."
    ],
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Jest"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-4 tracking-tight">
          Featured Projects
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          A selection of enterprise platforms and dashboards I&apos;ve engineered.
        </p>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:items-stretch">
        {projects.map((proj, index) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="flex h-full"
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#a855f7"
              glarePosition="all"
              scale={1.02}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              transitionSpeed={2000}
              className="relative glass-card flex flex-col w-full hover:-translate-y-2 transition-transform duration-500 h-full group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B4FE0]/20 to-[#2DCFCF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-[2px] bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF] rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />

              <div className="p-8 flex-1 flex flex-col relative z-10 h-full">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#2DCFCF]/10 rounded-full blur-2xl group-hover:bg-[#2DCFCF]/20 transition-colors duration-500"></div>

                <h3 className="text-2xl font-bold text-slate-100 mb-1">{proj.title}</h3>
                <p className="text-[#2DCFCF] font-bold text-sm mb-4">{proj.subtitle}</p>

                <div className="flex-1 space-y-3 z-10 mb-6">
                  {proj.points.slice(0, 3).map((point, i) => (
                    <div key={i} className="flex items-start text-sm text-slate-300">
                      <span className="text-emerald-500 mr-2 shrink-0 mt-0.5">✓</span>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                  {proj.points.length > 3 && (
                    <div className="text-xs text-slate-500 italic pt-2">
                      + {proj.points.length - 3} more key contributions
                    </div>
                  )}
                </div>

                <div className="mt-auto z-10 pt-4 border-t border-slate-700/50">
                  <p className="text-sm text-slate-300 mb-2 font-medium">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-slate-800/80 border border-slate-700 text-slate-300 rounded-full hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
