/**
 * Neon cyan chatbot mark: speech bubble + robot (dark “AI assistant” aesthetic).
 */
export default function AtlasChatIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M13 11h30a5 5 0 0 1 5 5v17a5 5 0 0 1-5 5H23.5L14 43V27a5 5 0 0 1-5-5v-6a5 5 0 0 1 5-5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        className="text-cyan-400"
      />
      <rect
        x="22"
        y="19"
        width="14"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-cyan-300"
      />
      <circle cx="26" cy="24" r="1.5" className="fill-cyan-300" />
      <circle cx="32" cy="24" r="1.5" className="fill-cyan-300" />
      <path
        d="M26 28c1 .8 2.2.8 3.2 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="text-cyan-300"
      />
      <path
        d="M19 23v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-cyan-400"
      />
      <path
        d="M39 23v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-cyan-400"
      />
      <line
        x1="29"
        y1="19"
        x2="29"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-cyan-400"
      />
      <circle cx="29" cy="13" r="1.8" className="fill-cyan-400" />
    </svg>
  );
}
