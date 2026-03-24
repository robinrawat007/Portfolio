import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full pt-16 pb-8 border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-purple-500 to-emerald-400 p-0.5 shadow-lg group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Robin Singh Rawat portfolio logo" className="w-full h-full object-contain p-1" width={64} height={64} />
              </div>
            </div>
            <span className="font-heading font-bold text-xl text-slate-100 tracking-wide">
              Robin Singh Rawat
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#about" className="text-slate-400 hover:text-emerald-400 transition-colors py-2 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded">About</a>
            <a href="#experience" className="text-slate-400 hover:text-emerald-400 transition-colors py-2 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded">Experience</a>
            <a href="#projects" className="text-slate-400 hover:text-emerald-400 transition-colors py-2 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded">Projects</a>
            <a href="#skills" className="text-slate-400 hover:text-emerald-400 transition-colors py-2 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded">Skills</a>
          </div>

          <div>
            <a
              href="#hero"
              className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
            Designed & Built with Next.js, React, Tailwind CSS, & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
