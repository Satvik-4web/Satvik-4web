import { fontStack } from './colors.mjs';

export function renderDesktopSvg(theme) {
  const t = theme;
  const isDark = t.name === 'dark';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 340" width="100%" height="340">
  <defs>
    <!-- Wallpaper Animated Gradient -->
    <radialGradient id="deskGlow1" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${isDark ? '#1E293B' : '#DBEAFE'}" stop-opacity="0.7">
        <animate attributeName="cx" values="20%;35%;20%" dur="12s" repeatCount="indefinite" />
        <animate attributeName="cy" values="30%;45%;30%" dur="12s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="${t.baseBg}" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="deskGlow2" cx="80%" cy="70%" r="50%">
      <stop offset="0%" stop-color="${isDark ? '#2E1065' : '#EDE9FE'}" stop-opacity="${isDark ? '0.4' : '0.6'}">
        <animate attributeName="cx" values="80%;65%;80%" dur="10s" repeatCount="indefinite" />
        <animate attributeName="cy" values="70%;50%;70%" dur="10s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="${t.baseBg}" stop-opacity="0"/>
    </radialGradient>

    <!-- Accent Gradient -->
    <linearGradient id="deskAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentBlue}"/>
      <stop offset="50%" stop-color="${t.accentCyan}"/>
      <stop offset="100%" stop-color="${t.accentViolet}"/>
    </linearGradient>

    <filter id="deskWindowShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="${t.shadow}"/>
    </filter>
  </defs>

  <style>
    .mono { font-family: ${fontStack}; }
    @media (prefers-reduced-motion: no-preference) {
      .pulse-tagline {
        animation: taglineGlow 6s ease-in-out infinite;
      }
    }
    @keyframes taglineGlow {
      0%, 100% { opacity: 0.9; }
      50% { opacity: 1; filter: drop-shadow(0 0 6px ${t.accentCyan}); }
    }
  </style>

  <!-- Wallpaper Background -->
  <rect width="800" height="340" rx="12" fill="${t.baseBg}"/>
  <rect width="800" height="340" rx="12" fill="url(#deskGlow1)"/>
  <rect width="800" height="340" rx="12" fill="url(#deskGlow2)"/>

  <!-- Desktop Top Menu Bar -->
  <rect x="0" y="0" width="800" height="28" rx="12" fill="${t.titleBarBg}" stroke="${t.border}" stroke-width="1"/>
  <rect x="0" y="16" width="800" height="12" fill="${t.titleBarBg}"/>
  <line x1="0" y1="28" x2="800" y2="28" stroke="${t.border}" stroke-width="1"/>

  <!-- Menu Bar Items -->
  <text x="20" y="18" class="mono" font-size="11" font-weight="700" fill="${t.accentCyan}">⬡ SATVIK-OS</text>
  <text x="120" y="18" class="mono" font-size="11" fill="${t.textSecondary}">about.sh</text>
  <text x="195" y="18" class="mono" font-size="11" fill="${t.textMuted}">processes/</text>
  <text x="285" y="18" class="mono" font-size="11" fill="${t.textMuted}">stack/</text>
  <text x="345" y="18" class="mono" font-size="11" fill="${t.textMuted}">telemetry</text>

  <!-- Menu Bar Right Items -->
  <text x="640" y="18" class="mono" font-size="11" fill="${t.textSecondary}">TIET Patiala '28</text>
  <circle cx="760" cy="14" r="4" fill="${t.accentGreen}"/>
  <text x="770" y="18" class="mono" font-size="10" font-weight="600" fill="${t.accentGreen}">UP</text>

  <!-- Floating Window: about.sh -->
  <g transform="translate(24, 42)" filter="url(#deskWindowShadow)">
    <!-- Window Frame -->
    <rect width="752" height="282" rx="10" fill="${t.cardBg}" stroke="${t.border}" stroke-width="1"/>
    
    <!-- Window Titlebar -->
    <path d="M 0 10 A 10 10 0 0 1 10 0 L 742 0 A 10 10 0 0 1 752 10 L 752 34 L 0 34 Z" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
    <circle cx="20" cy="17" r="4.5" fill="${t.dotRed}"/>
    <circle cx="35" cy="17" r="4.5" fill="${t.dotYellow}"/>
    <circle cx="50" cy="17" r="4.5" fill="${t.dotGreen}"/>
    <text x="72" y="21" class="mono" font-size="11" fill="${t.textMuted}">about.sh — nano 7.2</text>
    <rect x="652" y="9" width="84" height="16" rx="4" fill="${t.codeBg}"/>
    <text x="694" y="21" class="mono" font-size="9" font-weight="600" fill="${t.accentBlue}" text-anchor="middle">SHELL SCRIPT</text>

    <!-- Window Body Layout -->
    <!-- Prompt Header -->
    <text x="24" y="58" class="mono" font-size="11" fill="${t.accentGreen}">satvik@os</text>
    <text x="88" y="58" class="mono" font-size="11" fill="${t.textMuted}">:</text>
    <text x="96" y="58" class="mono" font-size="11" fill="${t.accentBlue}">~</text>
    <text x="104" y="58" class="mono" font-size="11" fill="${t.textSecondary}">$ cat /etc/identity.conf</text>

    <!-- Inner Data Grid Card (Left / Main Info) -->
    <rect x="24" y="72" width="460" height="142" rx="8" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>
    
    <text x="40" y="94" class="mono" font-size="11" fill="${t.textMuted}">NAME</text>
    <text x="140" y="94" class="mono" font-size="12" font-weight="700" fill="${t.textPrimary}">Satvik <tspan fill="${t.accentCyan}" font-weight="500">(@Satvik-4web)</tspan></text>

    <text x="40" y="118" class="mono" font-size="11" fill="${t.textMuted}">ROLE</text>
    <text x="140" y="118" class="mono" font-size="11" font-weight="600" fill="${t.textPrimary}">Co-founder &amp; CTO <tspan fill="${t.textSecondary}">at dev agency</tspan></text>

    <text x="40" y="142" class="mono" font-size="11" fill="${t.textMuted}">EDUCATION</text>
    <text x="140" y="142" class="mono" font-size="11" fill="${t.textSecondary}">Computer Engineering, TIET Patiala</text>
    <rect x="392" y="130" width="80" height="18" rx="4" fill="${t.codeBg}"/>
    <text x="432" y="143" class="mono" font-size="10" font-weight="600" fill="${t.accentBlue}" text-anchor="middle">GRAD 2028</text>

    <text x="40" y="166" class="mono" font-size="11" fill="${t.textMuted}">DIRECTION</text>
    <text x="140" y="166" class="mono" font-size="11" fill="${t.textPrimary}">Full-Stack Products → AI Engineering</text>

    <text x="40" y="194" class="mono" font-size="11" fill="${t.textMuted}">LEARNING</text>
    <!-- Learning Badges -->
    <g transform="translate(140, 182)">
      <rect width="78" height="18" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="39" y="13" class="mono" font-size="9.5" fill="${t.tagText}" text-anchor="middle">LLM APIs</text>
      
      <rect x="86" width="102" height="18" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="137" y="13" class="mono" font-size="9.5" fill="${t.tagText}" text-anchor="middle">RAG Pipelines</text>

      <rect x="196" width="98" height="18" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="245" y="13" class="mono" font-size="9.5" fill="${t.tagText}" text-anchor="middle">Vector Search</text>
    </g>

    <!-- Right Side Panel: System Motto and Status -->
    <rect x="496" y="72" width="232" height="142" rx="8" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>
    
    <text x="512" y="94" class="mono" font-size="10" fill="${t.textMuted}" letter-spacing="1">SYSTEM CORE MOTTO</text>
    
    <!-- Tagline Banner -->
    <g class="pulse-tagline">
      <rect x="512" y="106" width="200" height="48" rx="6" fill="${t.panelBgSubtle}" stroke="${t.borderGlow}" stroke-width="1"/>
      <text x="612" y="127" class="mono" font-size="11" font-weight="700" fill="${t.accentCyan}" text-anchor="middle">BUILD → BREAK</text>
      <text x="612" y="144" class="mono" font-size="11" font-weight="700" fill="${t.accentViolet}" text-anchor="middle">LEARN → REBUILD</text>
    </g>

    <!-- Status Indicator -->
    <g transform="translate(512, 172)">
      <circle cx="6" cy="14" r="3.5" fill="${t.accentGreen}"/>
      <text x="18" y="18" class="mono" font-size="10" fill="${t.textSecondary}">DAEMON: ACTIVE</text>
      <rect x="130" y="6" width="70" height="16" rx="4" fill="${t.codeBg}"/>
      <text x="165" y="18" class="mono" font-size="9" font-weight="600" fill="${t.accentBlue}" text-anchor="middle">ARM64/x86</text>
    </g>

    <!-- Footer Status Line -->
    <rect x="24" y="226" width="704" height="42" rx="6" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
    <text x="40" y="251" class="mono" font-size="11" fill="${t.textMuted}">STATUS:</text>
    <text x="96" y="251" class="mono" font-size="11" fill="${t.textSecondary}">Boot sequence completed · Interactive session initialized · 5 core processes running</text>
  </g>
</svg>`;
}
