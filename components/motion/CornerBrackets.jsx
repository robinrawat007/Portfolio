"use client";

export default function CornerBrackets({ children, className }) {
  return (
    <div className={`relative group ${className ?? ""}`}>
      <span className="pointer-events-none absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--neon-yellow)] transition-all duration-200 group-hover:w-4 group-hover:h-4" />
      <span className="pointer-events-none absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--neon-yellow)] transition-all duration-200 group-hover:w-4 group-hover:h-4" />
      <span className="pointer-events-none absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--neon-yellow)] transition-all duration-200 group-hover:w-4 group-hover:h-4" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--neon-yellow)] transition-all duration-200 group-hover:w-4 group-hover:h-4" />
      {children}
    </div>
  );
}
