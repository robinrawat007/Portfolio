"use client";

import React from "react";
import { socialLinks } from "@/lib/socialLinks";

export default function SocialSidebar() {
  return (
    <aside
      className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 py-4 px-2.5 rounded-2xl backdrop-blur-md shadow-xl shadow-black/40"
      style={{ background: 'rgba(10,10,10,0.7)', border: '1px solid var(--border)' }}
      aria-label="Social links"
    >
      {socialLinks.map(({ id, label, href, Icon, placeholder }) => {
        if (placeholder) {
          return (
            <span
              key={id}
              title="Coming soon"
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 cursor-not-allowed opacity-40"
              style={{ color: 'var(--fg-muted)' }}
              aria-label={`${label} (coming soon)`}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </span>
          );
        }
        return (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group"
            style={{ color: 'var(--fg-muted)', '--tw-ring-color': 'var(--neon-yellow)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--neon-yellow)';
              e.currentTarget.style.background = 'rgba(217,255,0,0.08)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--fg-muted)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = '';
            }}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </a>
        );
      })}
    </aside>
  );
}
