interface Props {
  size?: number;
}

export default function Logo({ size = 32 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="logo-line-grad" x1="4" y1="16" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Background rounded square */}
      <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />

      {/* Pulse / EKG waveform */}
      <polyline
        points="4,16 9,16 11,10 13,22 15,13 17,19 19,16 28,16"
        stroke="url(#logo-line-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Dot at the end of the pulse */}
      <circle cx="28" cy="16" r="1.5" fill="white" opacity="0.9" />
    </svg>
  );
}
