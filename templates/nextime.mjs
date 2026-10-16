import { fontStack } from './colors.mjs';

export function renderNextimeSvg(theme) {
  const t = theme;
  const isDark = t.name === 'dark';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="100%" height="360">
  <defs>
    <linearGradient id="nxtAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentBlue}"/>
      <stop offset="100%" stop-color="${t.accentCyan}"/>
    </linearGradient>
    <linearGradient id="nxtRingGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentGreen}"/>
      <stop offset="100%" stop-color="${t.accentCyan}"/>
    </linearGradient>
    <filter id="nxtShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${t.shadow}"/>
    </filter>
  </defs>

  <style>
    .mono { font-family: ${fontStack}; }
    @media (prefers-reduced-motion: no-preference) {
      /* Sweeping "NOW" timeline scanner */
      .scan-line {
        animation: sweepTimeline 6s ease-in-out infinite;
      }
      /* Pulsing active class block */
      .active-block {
        animation: blockPulse 6s ease-in-out infinite;
      }
      /* Attendance gauge fill */
      .attendance-arc {
        stroke-dasharray: 264;
        stroke-dashoffset: 264;
        animation: fillGauge 2.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      /* Pomodoro arc tick */
      .pomodoro-arc {
        stroke-dasharray: 264;
        stroke-dashoffset: 264;
        animation: fillPomo 6s ease-in-out infinite;
      }
      /* State badge flip NEXT -> NOW -> DONE */
      .state-next { animation: showNext 6s step-end infinite; }
      .state-now  { animation: showNow 6s step-end infinite; }
      .state-done { animation: showDone 6s step-end infinite; }
    }
    @keyframes sweepTimeline {
      0%   { transform: translateX(0px); opacity: 0; }
      10%  { opacity: 1; }
      85%  { opacity: 1; }
      95%  { transform: translateX(330px); opacity: 0; }
      100% { transform: translateX(0px); opacity: 0; }
    }
    @keyframes blockPulse {
      0%, 25% { stroke: ${t.border}; fill: ${t.panelBgSubtle}; }
      35%, 65% { stroke: ${t.accentCyan}; fill: ${t.codeBg}; filter: drop-shadow(0 0 6px ${t.borderGlow}); }
      75%, 100% { stroke: ${t.accentGreen}; fill: ${t.panelBgSubtle}; }
    }
    @keyframes fillGauge {
      to { stroke-dashoffset: 37; } /* 86% of 264 */
    }
    @keyframes fillPomo {
      0%   { stroke-dashoffset: 264; }
      50%  { stroke-dashoffset: 66; }
      100% { stroke-dashoffset: 264; }
    }
    @keyframes showNext {
      0%, 100% { opacity: 1; }
      30%      { opacity: 0; }
      80%      { opacity: 0; }
    }
    @keyframes showNow {
      0%, 29%  { opacity: 0; }
      30%, 75% { opacity: 1; }
      76%, 100%{ opacity: 0; }
    }
    @keyframes showDone {
      0%, 74%  { opacity: 0; }
      75%, 99% { opacity: 1; }
      100%     { opacity: 0; }
    }
  </style>

  <!-- Window Container -->
  <rect x="8" y="8" width="784" height="344" rx="12" fill="${t.cardBg}" stroke="${t.border}" stroke-width="1" filter="url(#nxtShadow)"/>

  <!-- Title Bar -->
  <path d="M 8 20 A 12 12 0 0 1 20 8 L 780 8 A 12 12 0 0 1 792 20 L 792 44 L 8 44 Z" fill="${t.titleBarBg}" stroke="${t.border}" stroke-width="1"/>
  <circle cx="28" cy="26" r="5" fill="${t.dotRed}"/>
  <circle cx="44" cy="26" r="5" fill="${t.dotYellow}"/>
  <circle cx="60" cy="26" r="5" fill="${t.dotGreen}"/>
  
  <text x="80" y="30" class="mono" font-size="12" fill="${t.textMuted}">proc://nextime.app [PID 1024] — Satvik-4web/Nextime</text>
  
  <!-- Status Badge LIVE -->
  <rect x="702" y="16" width="76" height="20" rx="10" fill="${isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.12)'}" stroke="${t.accentGreen}" stroke-width="1"/>
  <circle cx="716" cy="26" r="3.5" fill="${t.accentGreen}"/>
  <text x="742" y="30" class="mono" font-size="10.5" font-weight="700" fill="${t.accentGreen}" text-anchor="middle">LIVE</text>

  <!-- Left Column: Details and Tech Stack -->
  <g transform="translate(28, 64)">
    <text class="mono" font-size="20" font-weight="700" fill="${t.textPrimary}">NexTime</text>
    <text x="100" y="-3" class="mono" font-size="11" font-weight="600" fill="${t.accentCyan}">"Student OS"</text>

    <!-- One-line Description -->
    <text y="28" class="mono" font-size="11" fill="${t.textSecondary}">
      <tspan x="0" dy="0">Timetable-first student operating system with live free-slot</tspan>
      <tspan x="0" dy="16">detection, attendance safety tracking, and Pomodoro focus.</tspan>
    </text>

    <!-- Key Capabilities List -->
    <g transform="translate(0, 72)">
      <text class="mono" font-size="10.5" fill="${t.accentBlue}">▸</text>
      <text x="16" class="mono" font-size="10.5" fill="${t.textPrimary}">Live current &amp; next class detection</text>

      <text y="20" class="mono" font-size="10.5" fill="${t.accentGreen}">▸</text>
      <text x="16" y="20" class="mono" font-size="10.5" fill="${t.textPrimary}">Attendance tracking (&gt;80% safe, &lt;75% critical)</text>

      <text y="40" class="mono" font-size="10.5" fill="${t.accentViolet}">▸</text>
      <text x="16" y="40" class="mono" font-size="10.5" fill="${t.textPrimary}">Pomodoro study mode (45/10/20) &amp; CGPA forecast</text>

      <text y="60" class="mono" font-size="10.5" fill="${t.accentCyan}">▸</text>
      <text x="16" y="60" class="mono" font-size="10.5" fill="${t.textPrimary}">Friend timetables &amp; Supabase realtime community</text>
    </g>

    <!-- Tech Tags Row -->
    <g transform="translate(0, 162)">
      <rect width="78" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="39" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">Next.js 14</text>

      <rect x="84" width="86" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="127" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">TypeScript</text>

      <rect x="176" width="76" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="214" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">Supabase</text>

      <rect x="258" width="66" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="291" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">Tailwind</text>

      <rect x="330" width="30" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="345" y="14" class="mono" font-size="9" fill="${t.tagText}" text-anchor="middle">PWA</text>
    </g>

    <!-- Footer CLI Link hint -->
    <g transform="translate(0, 204)">
      <rect width="350" height="26" rx="5" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
      <text x="10" y="17" class="mono" font-size="10" fill="${t.textMuted}">$ curl -I https://nextime-omega.vercel.app</text>
      <text x="340" y="17" class="mono" font-size="10" font-weight="700" fill="${t.accentCyan}" text-anchor="end">200 OK ↗</text>
    </g>
  </g>

  <!-- Right Column: Micro-Visual (Timetable + Sweep Line + Attendance + Pomodoro) -->
  <g transform="translate(404, 58)">
    <!-- Canvas Frame -->
    <rect width="372" height="280" rx="8" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>

    <!-- Mini Timetable Header -->
    <rect x="12" y="12" width="348" height="24" rx="4" fill="${t.panelBgSubtle}"/>
    <text x="22" y="28" class="mono" font-size="10" font-weight="600" fill="${t.textSecondary}">TIMETABLE ENGINE · MONDAY</text>
    <text x="350" y="28" class="mono" font-size="9.5" fill="${t.accentCyan}" text-anchor="end">SYS: SYNCED</text>

    <!-- Timetable Slots Frame -->
    <g transform="translate(12, 44)">
      <!-- Background grid lines -->
      <line x1="0" y1="0" x2="348" y2="0" stroke="${t.border}" stroke-dasharray="2 2"/>
      <line x1="0" y1="56" x2="348" y2="56" stroke="${t.border}" stroke-dasharray="2 2"/>

      <!-- Block 1: 09:00 MATH -->
      <rect x="4" y="8" width="70" height="40" rx="5" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
      <text x="39" y="24" class="mono" font-size="9" fill="${t.textMuted}" text-anchor="middle">09:00-10:00</text>
      <text x="39" y="38" class="mono" font-size="9.5" font-weight="600" fill="${t.textSecondary}" text-anchor="middle">MATH-201</text>

      <!-- Block 2: 10:15 CS-304 OS (ACTIVE BLOCK WITH PULSE) -->
      <rect class="active-block" x="80" y="8" width="105" height="40" rx="5" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
      <text x="132" y="24" class="mono" font-size="9" fill="${t.textMuted}" text-anchor="middle">10:15-11:45</text>
      <text x="132" y="38" class="mono" font-size="9.5" font-weight="700" fill="${t.accentCyan}" text-anchor="middle">CS-304 OS</text>
      
      <!-- Dynamic State Pill above Block 2 -->
      <g transform="translate(108, -6)">
        <rect width="48" height="14" rx="7" fill="${t.titleBarBg}" stroke="${t.accentCyan}" stroke-width="0.8"/>
        <text class="mono state-next" x="24" y="10.5" font-size="8" font-weight="700" fill="${t.accentAmber}" text-anchor="middle">NEXT</text>
        <text class="mono state-now"  x="24" y="10.5" font-size="8" font-weight="700" fill="${t.accentCyan}" text-anchor="middle">● NOW</text>
        <text class="mono state-done" x="24" y="10.5" font-size="8" font-weight="700" fill="${t.accentGreen}" text-anchor="middle">✓ DONE</text>
      </g>

      <!-- Block 3: FREE SLOT -->
      <rect x="191" y="8" width="72" height="40" rx="5" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1" stroke-dasharray="3 3"/>
      <text x="227" y="24" class="mono" font-size="8.5" fill="${t.textMuted}" text-anchor="middle">12:00-13:00</text>
      <text x="227" y="38" class="mono" font-size="9" font-weight="600" fill="${t.accentGreen}" text-anchor="middle">FREE SLOT</text>

      <!-- Block 4: AI LAB -->
      <rect x="269" y="8" width="74" height="40" rx="5" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
      <text x="306" y="24" class="mono" font-size="8.5" fill="${t.textMuted}" text-anchor="middle">13:15-15:00</text>
      <text x="306" y="38" class="mono" font-size="9.5" font-weight="600" fill="${t.accentViolet}" text-anchor="middle">AI LAB</text>

      <!-- Animated Sweeping "NOW" Laser Line -->
      <g class="scan-line" transform="translate(10, 0)">
        <line x1="0" y1="4" x2="0" y2="52" stroke="${t.accentCyan}" stroke-width="2"/>
        <circle cx="0" cy="4" r="2.5" fill="${t.accentCyan}"/>
        <circle cx="0" cy="52" r="2.5" fill="${t.accentCyan}"/>
      </g>
    </g>

    <!-- Lower Section: Attendance Ring + Focus Arc -->
    <!-- Attendance Gauge (Left) -->
    <g transform="translate(90, 192)">
      <!-- Track Circle -->
      <circle cx="0" cy="0" r="42" fill="none" stroke="${t.panelBgSubtle}" stroke-width="7"/>
      <!-- Animated Fill Ring (86%) -->
      <circle class="attendance-arc" cx="0" cy="0" r="42" fill="none" stroke="url(#nxtRingGrad)" stroke-width="7" stroke-linecap="round" transform="rotate(-90)"/>
      <text y="6" class="mono" font-size="16" font-weight="700" fill="${t.accentGreen}" text-anchor="middle">86%</text>
      <text y="58" class="mono" font-size="9.5" font-weight="700" fill="${t.textPrimary}" text-anchor="middle">ATTENDANCE</text>
      <text y="70" class="mono" font-size="8.5" fill="${t.accentGreen}" text-anchor="middle">SAFE (&gt;80%)</text>
    </g>

    <!-- Divider Line -->
    <line x1="186" y1="125" x2="186" y2="265" stroke="${t.border}" stroke-width="1" stroke-dasharray="3 3"/>

    <!-- Pomodoro Focus Arc (Right) -->
    <g transform="translate(282, 192)">
      <!-- Track Arc -->
      <circle cx="0" cy="0" r="42" fill="none" stroke="${t.panelBgSubtle}" stroke-width="7"/>
      <!-- Animated Pomodoro Arc -->
      <circle class="pomodoro-arc" cx="0" cy="0" r="42" fill="none" stroke="url(#nxtAccentGrad)" stroke-width="7" stroke-linecap="round" transform="rotate(-90)"/>
      <text y="6" class="mono" font-size="14" font-weight="700" fill="${t.accentCyan}" text-anchor="middle">45:00</text>
      <text y="58" class="mono" font-size="9.5" font-weight="700" fill="${t.textPrimary}" text-anchor="middle">POMODORO</text>
      <text y="70" class="mono" font-size="8.5" fill="${t.accentBlue}" text-anchor="middle">FOCUS CYCLE</text>
    </g>
  </g>
</svg>`;
}
