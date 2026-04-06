"use client";

import React from "react";
import { socialLinks } from "@/lib/socialLinks";

export default function SocialSidebar() {
  return (
    <aside
      className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 py-4 px-2.5 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/10 shadow-xl shadow-black/40"
      aria-label="Social links"
    >
      {socialLinks.map(({ id, label, href, Icon, placeholder }) => {
        const common =
          "flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
        if (placeholder) {
          return (
            <span
              key={id}
              title="Coming soon"
              className={`${common} cursor-not-allowed opacity-50`}
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
            className={`${common} hover:text-white hover:bg-white/10 hover:scale-110`}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </a>
        );
      })}
    </aside>
  );
}
