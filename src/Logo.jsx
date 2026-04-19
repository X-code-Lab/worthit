export const Logo = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a6dd4" />
        <stop offset="50%" stopColor="#2a9fd6" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
    </defs>
    <path d="M15 30 L30 70 L45 42 L60 70 L75 30" stroke="url(#wg)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M62 68 L75 30 L90 10" stroke="url(#wg)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const LogoBig = () => (
  <svg width="68" height="68" viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="wgb" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a6dd4" />
        <stop offset="50%" stopColor="#2a9fd6" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="white" />
    <path d="M18 35 L30 65 L45 44 L60 65 L72 35" stroke="url(#wgb)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M60 63 L72 35 L85 18" stroke="url(#wgb)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
