import React from 'react';

export const TopitopLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <span
    className={`inline-flex items-center font-display font-extrabold tracking-[-0.055em] text-[#C8102E] select-none leading-none ${className}`}
    style={{ fontSize: '1.75rem' }}
  >
    topitop
  </span>
);

export const PeruFlagBadge: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <defs>
      <clipPath id="peruFlagClip">
        <circle cx="16" cy="16" r="14" />
      </clipPath>
    </defs>
    <g clipPath="url(#peruFlagClip)">
      <rect x="2" y="2" width="9.33" height="28" fill="#C8102E" />
      <rect x="11.33" y="2" width="9.34" height="28" fill="#FFFFFF" />
      <rect x="20.67" y="2" width="9.33" height="28" fill="#C8102E" />
    </g>
    <circle cx="16" cy="16" r="14" fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
  </svg>
);

export const PeruMapIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="#C8102E"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 7.5L21 9.5L24.5 7.5L28 11.5L32.5 13L33.5 18L30.5 23L34 27L35.5 33L33 38.5L29.5 41L25.5 39L21 35L17 30L14 25L12 19L13.5 13.5L16 7.5Z" />
  </svg>
);

export const FactoryIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="#C8102E"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M8 40V22L18 27V22L28 27V16H36L38 40H8Z" />
    <path d="M31 16V10H35V16" />
    <path d="M14 33H17M22 33H25M30 33H33" />
    <path d="M6 40H42" />
  </svg>
);

export const OekoLeafIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-11 h-11',
  color = '#C8102E',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 38C12 22 22 10 38 10C38 26 28 38 12 38Z" />
    <path d="M10 40C15 33 21 26 29 19" />
  </svg>
);

export const GlobeOutlineIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="#C8102E"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="15" />
    <ellipse cx="24" cy="24" rx="7" ry="15" />
    <path d="M9.5 24H38.5" />
    <path d="M11.5 16.5H36.5" />
    <path d="M11.5 31.5H36.5" />
  </svg>
);

export const FabricLayersIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="#C8102E"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 5L27 10.5L16 16L5 10.5L16 5Z" />
    <path d="M5 16L16 21.5L27 16" />
    <path d="M5 21.5L16 27L27 21.5" />
  </svg>
);

export const CareWashIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="#C8102E"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 11L7 24H25L28 11" />
    <path d="M5.5 14C7.5 12.5 9.5 15.5 12 14C14.5 12.5 16.5 15.5 19 14C21.5 12.5 23.5 15.5 26.5 14" />
    <text
      x="16"
      y="21.5"
      textAnchor="middle"
      fontSize="7"
      fontWeight="700"
      fill="#C8102E"
      stroke="none"
    >
      30°
    </text>
  </svg>
);

export const OekoTexBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`inline-flex flex-col items-center justify-center rounded-md bg-[#009677] text-white px-2.5 py-1.5 leading-tight shadow-xs ${className}`}
  >
    <span className="text-[9px] font-extrabold tracking-wider uppercase">OEKO-TEX®</span>
    <span className="text-[7px] font-medium tracking-wide opacity-90">STANDARD 100</span>
  </div>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.03 2C6.51 2 2.02 6.48 2.02 12c0 1.77.46 3.5 1.34 5.02L2 22l5.12-1.34A9.97 9.97 0 0 0 12.03 22c5.52 0 10-4.48 10-10S17.55 2 12.03 2Zm0 18.18c-1.54 0-3.05-.41-4.36-1.19l-.31-.19-3.04.8.81-2.96-.2-.32A8.17 8.17 0 0 1 3.84 12c0-4.51 3.68-8.18 8.19-8.18 4.51 0 8.18 3.67 8.18 8.18 0 4.51-3.67 8.18-8.18 8.18Zm4.49-6.13c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.06 0 1.21.88 2.39 1 2.55.12.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.21-.58.21-1.07.14-1.17-.06-.1-.23-.16-.47-.29Z" />
  </svg>
);

export const QrCodeMini: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm11-2h2v2h-2v-2zm3 0h2v4h-2v-4zm-5 3h2v4h-2v-4zm3 2h4v2h-4v-2zm-1-5h2v2h-2v-2z" />
  </svg>
);

export const AccentStrokes: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <path d="M6 15L14 4" stroke="#C8102E" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M14 21L26 14" stroke="#C8102E" strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);
