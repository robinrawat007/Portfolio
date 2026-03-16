import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "OpenAI API",
  "LangChain",
  "Claude API",
  "Prompt Engineering",
  "RAG Systems",
  "AI Automation",
  "n8n",
  "LLM Integration"
];

export default function MarqueeTicker() {
  return (
    <div className="relative w-full py-3 overflow-hidden bg-slate-950/50 border-y border-slate-800/50">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear"
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-4">
            {skills.map((skill, index) => (
              <React.Fragment key={index}>
                <span className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7B4FE0] to-[#2DCFCF] uppercase tracking-tighter">
                  {skill}
                </span>
                <span className="text-slate-700 text-lg">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
