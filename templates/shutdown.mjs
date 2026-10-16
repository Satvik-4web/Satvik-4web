import { fontStack } from './colors.mjs';

export function renderShutdownSvg(theme) {
  const t = theme;
  const isDark = t.name === 'dark';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 130" width="100%" height="130">
  <defs>
    <linearGradient id="shutAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentBlue}"/>
      <stop offset="50%" stop-color="${t.accentCyan}"/>
      <stop offset="100%" stop-color="${t.accentViolet}"/>
    </linearGradient>
    <filter id="shutShadow" x="-5%" y="-10%" width="110%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="${t.shadow}"/>
    </filter>
  </defs>

  <style>
    .mono { font-family: ${fontStack}; }
    @media (prefers-reduced-motion: no-preference) {
      .shut-cursor {
        animation: shutBlink 1s step-end infinite;
      }
      .tagline-shine {
        animation: textShine 8s ease-in-out infinite;
      }
    }
    @keyframes shutBlink {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0; }
    }
    @keyframes textShine {
      0%, 100% { opacity: 0.9; }
      50%      { opacity: 1; filter: drop-shadow(0 0 8px ${t.accentCyan}); }
    }
  </style>

  <!-- Window Container -->
  <rect x="8" y="8" width="784" height="114" rx="12" fill="${t.cardBg}" stroke="${t.border}" stroke-width="1" filter="url(#shutShadow)"/>

  <!-- Title Bar -->
  <path d="M 8 20 A 12 12 0 0 1 20 8 L 780 8 A 12 12 0 0 1 792 20 L 792 38 L 8 38 Z" fill="${t.titleBarBg}" stroke="${t.border}" stroke-width="1"/>
  <circle cx="28" cy="23" r="4.5" fill="${t.dotRed}"/>
  <circle cx="44" cy="23" r="4.5" fill="${t.dotYellow}"/>
  <circle cx="60" cy="23" r="4.5" fill="${t.dotGreen}"/>
  
  <text x="80" y="27" class="mono" font-size="11" fill="${t.textMuted}">satvik-os -- terminal session summary</text>
  
  <rect x="674" y="14" width="102" height="18" rx="4" fill="${t.codeBg}"/>
  <text x="725" y="26" class="mono" font-size="9.5" font-weight="600" fill="${t.accentCyan}" text-anchor="middle">SESSION IDLE</text>

  <!-- Terminal Body Lines -->
  <!-- Line 1: Prompt -->
  <g transform="translate(28, 60)">
    <text class="mono" font-size="11" fill="${t.accentGreen}">satvik@os</text>
    <text x="64" class="mono" font-size="11" fill="${t.textMuted}">:</text>
    <text x="72" y="0" class="mono" font-size="11" fill="${t.accentBlue}">~</text>
    <text x="80" y="0" class="mono" font-size="11" fill="${t.textSecondary}">$ echo $CORE_PHILOSOPHY</text>
  </g>

  <!-- Line 2: Tagline Banner -->
  <g class="tagline-shine" transform="translate(28, 86)">
    <text class="mono" font-size="14" font-weight="700" fill="url(#shutAccentGrad)" letter-spacing="1">BUILD → BREAK → LEARN → REBUILD</text>
  </g>

  <!-- Line 3: Session Active with Blinking Cursor -->
  <g transform="translate(28, 108)">
    <circle cx="5" cy="-4" r="3.5" fill="${t.accentGreen}"/>
    <text x="16" y="0" class="mono" font-size="11" fill="${t.textSecondary}">session active · standby for incoming signals</text>
    <rect class="shut-cursor" x="335" y="-10" width="7" height="13" fill="${t.accentCyan}"/>
  </g>
</svg>`;
}
