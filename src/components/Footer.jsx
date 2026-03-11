import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full pt-16 pb-8 border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-purple-500 to-emerald-400 p-0.5 shadow-lg group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-1" />
              </div>
            </div>
            <span className="font-heading font-bold text-xl text-slate-100 tracking-wide">
              Robin Singh Rawat
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#about" className="text-slate-400 hover:text-emerald-400 transition-colors">About</a>
            <a href="#experience" className="text-slate-400 hover:text-emerald-400 transition-colors">Experience</a>
            <a href="#projects" className="text-slate-400 hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#skills" className="text-slate-400 hover:text-emerald-400 transition-colors">Skills</a>
          </div>

          <div>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors group"
              aria-label="Back to top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:-translate-y-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800/50 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Robin Singh Rawat. All rights reserved.</p>
          <p>
            Designed & Built with React, Tailwind CSS, & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
