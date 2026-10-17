import { renderDefs, renderLetterboxFrame } from './shared.mjs';
import { createTextPath } from '../scripts/text-to-path.mjs';

export function renderPosterNextimeSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 700;

  const titlePath = createTextPath('NEXTIME', {
    font: 'bold',
    fontSize: 54,
    tracking: 16,
    align: 'left',
    x: 60,
    y: 115,
    fill: `url(#goldGrad)`
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Poster and scene illustration for NexTime: student operating system with live timetable and attendance">
  <title>NexTime — Feature Poster</title>
  <defs>
    ${renderDefs(theme)}
  </defs>

  <style>
    .sans-track {
      font-family: ${config.fonts.bodySans};
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
    .serif-tagline {
      font-family: ${config.fonts.serifFallback};
      font-size: 20px;
      font-style: italic;
      fill: ${t.typeSecondary};
    }
    @media (prefers-reduced-motion: no-preference) {
      /* Gold "now" scanner hairline */
      .scan-line {
        animation: sweepHairline 8s ease-in-out infinite;
      }
      /* Active block highlight */
      .active-slot {
        animation: slotGlow 8s ease-in-out infinite;
      }
      /* Label cycle NEXT -> NOW -> DONE */
      .tag-next { animation: showNext 8s step-end infinite; }
      .tag-now  { animation: showNow 8s step-end infinite; }
      .tag-done { animation: showDone 8s step-end infinite; }
      /* Attendance ring fill */
      .ring-fill {
        stroke-dasharray: 251;
        stroke-dashoffset: 251;
        animation: fillRing 2.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      /* Pomodoro arc */
      .arc-focus {
        stroke-dasharray: 251;
        stroke-dashoffset: 251;
        animation: focusLoop 8s ease-in-out infinite;
      }
    }
    @keyframes sweepHairline {
      0%   { transform: translateX(0px); opacity: 0; }
      10%  { opacity: 1; }
      85%  { opacity: 1; }
      95%  { transform: translateX(540px); opacity: 0; }
      100% { transform: translateX(0px); opacity: 0; }
    }
    @keyframes slotGlow {
      0%, 25%  { stroke: ${t.hairlineSubtle}; fill: transparent; }
      35%, 65% { stroke: ${t.accentGold}; fill: ${t.hairlineSubtle}; }
      75%, 100%{ stroke: ${t.hairlineSubtle}; fill: transparent; }
    }
    @keyframes showNext {
      0%, 28%  { opacity: 1; }
      29%, 100%{ opacity: 0; }
    }
    @keyframes showNow {
      0%, 28%  { opacity: 0; }
      29%, 74% { opacity: 1; }
      75%, 100%{ opacity: 0; }
    }
    @keyframes showDone {
      0%, 74%  { opacity: 0; }
      75%, 100%{ opacity: 1; }
    }
    @keyframes fillRing {
      to { stroke-dashoffset: 35; } /* ~86% */
    }
    @keyframes focusLoop {
      0%   { stroke-dashoffset: 251; }
      50%  { stroke-dashoffset: 62; }
      100% { stroke-dashoffset: 251; }
    }
  </style>

  ${renderLetterboxFrame(W, H, theme)}

  <!-- Poster Header -->
  <g transform="translate(60, 68)">
    <text class="sans-track" x="0" y="0" font-size="10" fill="${t.typeMuted}">PRODUCTION 01 &#8226; TIME ARCHITECTURE</text>
    <rect x="940" y="-12" width="140" height="20" fill="none" stroke="${t.accentGold}" stroke-width="1"/>
    <text class="sans-track" x="1010" y="2" font-size="9" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#9679; LIVE IN RELEASE</text>
  </g>

  <!-- Title & Tagline -->
  <g transform="translate(0, 0)">
    ${titlePath.svg}
    <text class="serif-tagline" x="60" y="152">
      "The student operating system where the daily timetable orchestrates every academic action."
    </text>
  </g>

  <!-- Cinema Scene Still: Gold Line Timetable + Gauges (60, 180 to 1140, 500) -->
  <g transform="translate(60, 180)">
    <!-- Still Container Frame -->
    <rect width="1080" height="320" fill="${t.surface}" stroke="${t.hairlineSubtle}" stroke-width="1"/>

    <!-- Still Frame Corner Accents -->
    <path d="M 0 16 L 0 0 L 16 0" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 1080 16 L 1080 0 L 1064 0" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 0 304 L 0 320 L 16 320" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 1080 304 L 1080 320 L 1064 320" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>

    <!-- Sub-heading inside Scene Still -->
    <text class="sans-track" x="24" y="32" font-size="9" fill="${t.accentGold}">SCENE STILL 01 &#8226; DAY CYCLE TIMELINE</text>
    <text class="sans-track" x="1056" y="32" font-size="8.5" fill="${t.typeMuted}" text-anchor="end">45/10 POMODORO &#8226; CGPA FORECAST</text>

    <!-- Timetable Section (Left: width 620) -->
    <g transform="translate(24, 60)">
      <line x1="0" y1="0" x2="600" y2="0" stroke="${t.hairlineSubtle}" stroke-dasharray="3 3"/>
      <line x1="0" y1="120" x2="600" y2="120" stroke="${t.hairlineSubtle}" stroke-dasharray="3 3"/>

      <!-- Slot 1: 09:00 MATH -->
      <g transform="translate(0, 20)">
        <rect width="110" height="70" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
        <text class="sans-track" x="55" y="28" font-size="8.5" fill="${t.typeMuted}" text-anchor="middle">09:00</text>
        <text class="sans-track" x="55" y="48" font-size="10" font-weight="600" fill="${t.typeSecondary}" text-anchor="middle">MATH-201</text>
      </g>

      <!-- Slot 2: 10:30 CS-304 (ACTIVE) -->
      <g transform="translate(130, 20)">
        <rect class="active-slot" width="160" height="70" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1.2"/>
        <text class="sans-track" x="80" y="28" font-size="8.5" fill="${t.typeMuted}" text-anchor="middle">10:30 &#8226; LIVE</text>
        <text class="sans-track" x="80" y="48" font-size="11" font-weight="600" fill="${t.accentGold}" text-anchor="middle">CS-304 OS</text>
        
        <!-- Status indicator tag above -->
        <g transform="translate(80, -10)">
          <text class="sans-track tag-next" x="0" y="0" font-size="8" fill="${t.typeMuted}" text-anchor="middle">NEXT</text>
          <text class="sans-track tag-now"  x="0" y="0" font-size="8.5" font-weight="600" fill="${t.accentGoldHighlight}" text-anchor="middle">&#9670; NOW &#9670;</text>
          <text class="sans-track tag-done" x="0" y="0" font-size="8" fill="${t.typeSecondary}" text-anchor="middle">&#10003; DONE</text>
        </g>
      </g>

      <!-- Slot 3: 12:00 FREE -->
      <g transform="translate(310, 20)">
        <rect width="120" height="70" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1" stroke-dasharray="2 2"/>
        <text class="sans-track" x="60" y="28" font-size="8.5" fill="${t.typeMuted}" text-anchor="middle">12:00</text>
        <text class="sans-track" x="60" y="48" font-size="9.5" fill="${t.accentGold}" text-anchor="middle">FREE SLOT</text>
      </g>

      <!-- Slot 4: 13:30 AI LAB -->
      <g transform="translate(450, 20)">
        <rect width="140" height="70" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
        <text class="sans-track" x="70" y="28" font-size="8.5" fill="${t.typeMuted}" text-anchor="middle">13:30</text>
        <text class="sans-track" x="70" y="48" font-size="10" font-weight="600" fill="${t.typeSecondary}" text-anchor="middle">AI LAB</text>
      </g>

      <!-- Sweeping Gold Hairline Scanner -->
      <g class="scan-line" transform="translate(10, 10)">
        <line x1="0" y1="0" x2="0" y2="90" stroke="${t.accentGold}" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="2.5" fill="${t.accentGoldHighlight}"/>
        <circle cx="0" cy="90" r="2.5" fill="${t.accentGoldHighlight}"/>
      </g>
    </g>

    <!-- Still Timeline Lower Telemetry -->
    <text class="sans-track" x="24" y="210" font-size="9" fill="${t.typeMuted}">FEATURE: REALTIME ATTENDANCE THRESHOLD (&gt;80% SAFE &#8226; &lt;75% CRITICAL) &#8226; REALTIME FRIEND MESH</text>

    <!-- Right Side Gauges: Attendance Ring & Pomodoro Arc (x=720 to 1040) -->
    <!-- Gauge 1: Attendance Ring -->
    <g transform="translate(770, 140)">
      <circle cx="0" cy="0" r="40" fill="none" stroke="${t.hairlineSubtle}" stroke-width="3"/>
      <circle class="ring-fill" cx="0" cy="0" r="40" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" transform="rotate(-90)"/>
      <text class="sans-track" x="0" y="6" font-size="14" font-weight="600" fill="${t.accentGold}" text-anchor="middle">86%</text>
      <text class="sans-track" x="0" y="60" font-size="8.5" fill="${t.typeSecondary}" text-anchor="middle">ATTENDANCE</text>
      <text class="sans-track" x="0" y="74" font-size="7.5" fill="${t.accentGold}" text-anchor="middle">SAFE TIER</text>
    </g>

    <!-- Divider between gauges -->
    <line x1="880" y1="80" x2="880" y2="240" stroke="${t.hairlineSubtle}" stroke-width="1" stroke-dasharray="2 2"/>

    <!-- Gauge 2: Pomodoro Arc -->
    <g transform="translate(980, 140)">
      <circle cx="0" cy="0" r="40" fill="none" stroke="${t.hairlineSubtle}" stroke-width="3"/>
      <circle class="arc-focus" cx="0" cy="0" r="40" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" transform="rotate(-90)"/>
      <text class="sans-track" x="0" y="6" font-size="13" font-weight="600" fill="${t.typePrimary}" text-anchor="middle">45:00</text>
      <text class="sans-track" x="0" y="60" font-size="8.5" fill="${t.typeSecondary}" text-anchor="middle">POMODORO</text>
      <text class="sans-track" x="0" y="74" font-size="7.5" fill="${t.typeMuted}" text-anchor="middle">45 / 10 / 20</text>
    </g>
  </g>

  <!-- Cinema Credit Block (Bottom) -->
  <g transform="translate(60, 545)">
    <line x1="0" y1="0" x2="1080" y2="0" stroke="${t.hairlineSubtle}" stroke-width="1"/>
    
    <g transform="translate(0, 30)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">EXECUTIVE PRODUCER</text>
      <text class="sans-track" x="0" y="18" font-size="11" font-weight="600" fill="${t.typePrimary}">SATVIK</text>
    </g>

    <g transform="translate(240, 30)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">TECHNICAL ARCHITECTURE</text>
      <text class="sans-track" x="0" y="18" font-size="11" font-weight="600" fill="${t.accentGold}">NEXT.JS 14 &#8226; TYPESCRIPT &#8226; SUPABASE REALTIME &#8226; TAILWIND &#8226; REDIS</text>
    </g>

    <g transform="translate(900, 30)">
      <text class="sans-track" x="180" y="0" font-size="9" fill="${t.typeMuted}" text-anchor="end">DISTRIBUTION</text>
      <text class="sans-track" x="180" y="18" font-size="11" font-weight="600" fill="${t.typePrimary}" text-anchor="end">VERCEL PWA</text>
    </g>

    <!-- Bottom link hint -->
    <text class="sans-track" x="540" y="80" font-size="9.5" fill="${t.accentGold}" text-anchor="middle">
      VIEW SOURCE &#8226; GITHUB.COM/SATVIK-4WEB/NEXTIME &#8226; LIVE DEMO IN RELEASE &#8599;
    </text>
  </g>
</svg>`;
}
