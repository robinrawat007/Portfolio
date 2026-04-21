export default function AtlasChatIcon({ className = "w-14 h-14" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Bubble + tail */}
      <path
        d="M13 11h30a5 5 0 0 1 5 5v17a5 5 0 0 1-5 5H23.5L14 43V27a5 5 0 0 1-5-5v-6a5 5 0 0 1 5-5z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
        style={{ color: '#D9FF00' }}
      />
      <rect
        x="21"
        y="18.5"
        width="16"
        height="13"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.75"
        style={{ color: '#D9FF00' }}
      />
      <g className="atlas-eyes">
        <circle cx="25.5" cy="24" r="1.75" fill="#D9FF00" />
        <circle cx="32.5" cy="24" r="1.75" fill="#D9FF00" />
      </g>
      <path
        d="M25.5 28.5c1.1.9 2.5.9 3.6 0"
        stroke="#D9FF00"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M17.5 22.5v4"
        stroke="#D9FF00"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M40.5 22.5v4"
        stroke="#D9FF00"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <line
        x1="29"
        y1="18.5"
        x2="29"
        y2="14"
        stroke="#D9FF00"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="29" cy="12.25" r="2" fill="#D9FF00" />
    </svg>
  );
}
