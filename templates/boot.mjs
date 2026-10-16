import { fontStack } from './colors.mjs';

export function renderBootSvg(theme) {
  const t = theme;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 250" width="100%" height="250">
  <defs>
    <linearGradient id="bootProgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentBlue}"/>
      <stop offset="50%" stop-color="${t.accentCyan}"/>
      <stop offset="100%" stop-color="${t.accentViolet}"/>
    </linearGradient>
    <filter id="bootGlow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${t.shadow}"/>
    </filter>
  </defs>

  <style>
    .mono { font-family: ${fontStack}; }
    @media (prefers-reduced-motion: no-preference) {
      .line-1 { animation: fadeIn 0.2s ease-out 0.1s both; }
      .line-2 { animation: fadeIn 0.2s ease-out 0.3s both; }
      .line-3 { animation: fadeIn 0.2s ease-out 0.5s both; }
      .line-4 { animation: fadeIn 0.2s ease-out 0.7s both; }
      .prog-track { animation: fadeIn 0.2s ease-out 0.9s both; }
      .prog-fill { animation: fillBar 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.0s both; }
      .line-welcome { animation: fadeIn 0.3s ease-out 1.5s both; }
      .line-prompt { animation: fadeIn 0.3s ease-out 1.7s both; }
      .cursor { animation: blink 0.9s step-end 1.7s infinite; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes fillBar {
      from { width: 0px; }
      to   { width: 440px; }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0; }
    }
  </style>

  <!-- Window Container -->
  <rect x="8" y="8" width="784" height="234" rx="12" fill="${t.cardBg}" stroke="${t.border}" stroke-width="1" filter="url(#bootGlow)"/>

  <!-- Title Bar -->
  <path d="M 8 20 A 12 12 0 0 1 20 8 L 780 8 A 12 12 0 0 1 792 20 L 792 42 L 8 42 Z" fill="${t.titleBarBg}" stroke="${t.border}" stroke-width="1"/>
  <circle cx="28" cy="25" r="5" fill="${t.dotRed}"/>
  <circle cx="44" cy="25" r="5" fill="${t.dotYellow}"/>
  <circle cx="60" cy="25" r="5" fill="${t.dotGreen}"/>
  
  <text x="80" y="29" class="mono" font-size="12" fill="${t.textMuted}" letter-spacing="0.5">satvik-os -- boot sequence -- v1.0.4-LTS (x86_64)</text>
  <rect x="682" y="17" width="94" height="16" rx="4" fill="${t.codeBg}"/>
  <text x="729" y="29" class="mono" font-size="10" font-weight="600" fill="${t.accentCyan}" text-anchor="middle">UEFI SECURE</text>

  <!-- Terminal Content Lines -->

  <!-- Line 1 -->
  <g class="line-1" transform="translate(28, 68)">
    <text class="mono" font-size="12" fill="${t.textMuted}">[ 0.000000 ]</text>
    <text x="96" class="mono" font-size="12" fill="${t.textSecondary}">Linux satvik-os 6.12.0-satvik-lts x86_64</text>
  </g>

  <!-- Line 2 -->
  <g class="line-2" transform="translate(28, 92)">
    <text class="mono" font-size="12" fill="${t.textMuted}">[ 0.142091 ]</text>
    <text x="96" class="mono" font-size="12" fill="${t.textSecondary}">init: core CPU and memory subsystem</text>
    <text x="490" class="mono" font-size="12" font-weight="600" fill="${t.accentGreen}">[  OK  ]</text>
  </g>

  <!-- Line 3 -->
  <g class="line-3" transform="translate(28, 116)">
    <text class="mono" font-size="12" fill="${t.textMuted}">[ 0.318492 ]</text>
    <text x="96" class="mono" font-size="12" fill="${t.textSecondary}">auth: Satvik-4web (TIET Patiala '28)</text>
    <text x="490" class="mono" font-size="12" font-weight="600" fill="${t.accentGreen}">[  OK  ]</text>
  </g>

  <!-- Line 4 -->
  <g class="line-4" transform="translate(28, 140)">
    <text class="mono" font-size="12" fill="${t.textMuted}">[ 0.490182 ]</text>
    <text x="96" class="mono" font-size="12" fill="${t.textSecondary}">mount: /dev/fullstack-ai-workspace</text>
    <text x="490" class="mono" font-size="12" font-weight="600" fill="${t.accentGreen}">[  OK  ]</text>
  </g>

  <!-- Progress Bar Line -->
  <g class="prog-track" transform="translate(28, 166)">
    <text class="mono" font-size="12" fill="${t.textMuted}">[  BOOT  ]</text>
    <!-- Track -->
    <rect x="96" y="-11" width="440" height="12" rx="3" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
    <!-- Fill bar -->
    <rect class="prog-fill" x="96" y="-11" width="440" height="12" rx="3" fill="url(#bootProgGrad)"/>
    <text x="550" class="mono" font-size="12" font-weight="600" fill="${t.accentCyan}">100%</text>
  </g>

  <!-- Welcome Line -->
  <g class="line-welcome" transform="translate(28, 196)">
    <text class="mono" font-size="13" font-weight="600" fill="${t.accentCyan}">welcome, visitor.</text>
    <text x="145" class="mono" font-size="13" fill="${t.textSecondary}">satvik-os interactive session active.</text>
  </g>

  <!-- Prompt Line and Blinking Cursor -->
  <g class="line-prompt" transform="translate(28, 222)">
    <text class="mono" font-size="12" fill="${t.accentGreen}">visitor@satvik-os</text>
    <text x="124" class="mono" font-size="12" fill="${t.textMuted}">:</text>
    <text x="134" class="mono" font-size="12" fill="${t.accentBlue}">~</text>
    <text x="144" class="mono" font-size="12" fill="${t.textSecondary}">$ explore ./processes</text>
    <rect class="cursor" x="306" y="-11" width="8" height="14" fill="${t.accentCyan}"/>
  </g>
</svg>`;
}
