import React from 'react';
import { socialLinks } from '@/lib/socialLinks';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full pt-16 pb-8" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full p-0.5 shadow-lg" style={{ background: 'linear-gradient(135deg, var(--neon-yellow), var(--neon-green))' }}>
              <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg)' }}>
                <span className="font-heading font-extrabold tracking-tight text-xl" style={{ color: 'var(--fg)' }}>RR</span>
              </div>
            </div>
            <span className="font-heading font-bold text-xl tracking-wide" style={{ color: 'var(--fg)' }}>
              Robin Singh Rawat
            </span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6">
              {['About', 'Experience', 'Projects', 'Skills', 'Services'].map((label) => (
                <a key={label} href={`#${label.toLowerCase()}`} className="py-2 px-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded" style={{ color: 'var(--fg-muted)', '--tw-ring-color': 'var(--neon-yellow)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--neon-yellow)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; }}
                >{label}</a>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map(({ id, label, href, Icon, placeholder }) =>
                placeholder ? (
                  <span key={id} className="flex h-11 w-11 items-center justify-center rounded-full cursor-not-allowed opacity-40" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--fg-muted)' }} title="Coming soon" aria-label={`${label} (coming soon)`}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                ) : (
                  <a key={id} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--fg-muted)', '--tw-ring-color': 'var(--neon-yellow)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(217,255,0,0.4)'; e.currentTarget.style.color = 'var(--neon-yellow)'; e.currentTarget.style.background = 'rgba(217,255,0,0.06)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.background = 'var(--surface)'; }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <a href="#hero" className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full glass-card flex items-center justify-center transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: 'var(--fg-muted)', '--tw-ring-color': 'var(--neon-yellow)' }}
              aria-label="Back to top"
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--neon-yellow)'; e.currentTarget.style.borderColor = 'rgba(217,255,0,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.borderColor = ''; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:-translate-y-1 transition-transform" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-sm" style={{ borderTop: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
          <p>© {new Date().getFullYear()} Robin Singh Rawat. All rights reserved.</p>
          <p className="text-center md:text-right">Designed &amp; built by Robin</p>
        </div>
      </div>
    </footer>
  );
}
