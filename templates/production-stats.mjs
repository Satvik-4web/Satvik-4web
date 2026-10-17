import { renderDefs, renderLetterboxFrame } from './shared.mjs';
import { createTextPath } from '../scripts/text-to-path.mjs';

export const DEFAULT_STATS = {
  repoCount: 17,
  commits30d: 17,
  lastPushed: {
    name: 'SceneNav-AI',
    timeAgo: 'today'
  },
  languages: [
    { name: 'Python', percent: 28.9 },
    { name: 'TypeScript', percent: 27.3 },
    { name: 'JavaScript', percent: 15.5 },
    { name: 'C#', percent: 11.0 },
    { name: 'PHP/Blade', percent: 5.1 },
    { name: 'Other', percent: 12.2 }
  ]
};

export function renderProductionStatsSvg(theme, config, data = DEFAULT_STATS) {
  const t = theme;
  const W = 1200;
  const H = 700;

  const stats = {
    repoCount: data.repoCount || DEFAULT_STATS.repoCount,
    commits30d: data.commits30d !== undefined ? data.commits30d : DEFAULT_STATS.commits30d,
    lastPushed: data.lastPushed || DEFAULT_STATS.lastPushed,
    languages: Array.isArray(data.languages) && data.languages.length > 0 ? data.languages : DEFAULT_STATS.languages
  };

  const titlePath = createTextPath('BEHIND THE SCENES', {
    font: 'bold',
    fontSize: 34,
    tracking: 14,
    align: 'center',
    x: 600,
    y: 110,
    fill: t.accentGold
  });

  const langBars = stats.languages.slice(0, 6).map((lang, i) => {
    const yPos = 65 + i * 36;
    const barMaxWidth = 660;
    const barWidth = Math.max(8, Math.round(barMaxWidth * (lang.percent / 100)));
    return `
      <g transform="translate(90, ${yPos})">
        <text class="sans-track" x="0" y="0" font-size="10.5" font-weight="600" fill="${t.typePrimary}">${escapeXml(lang.name)}</text>
        <text class="sans-track" x="180" y="0" font-size="10.5" fill="${t.accentGold}">${lang.percent.toFixed(1)}%</text>
        
        <!-- Track -->
        <rect x="250" y="-10" width="${barMaxWidth}" height="8" rx="4" fill="${t.surfaceSubtle}" stroke="${t.border}" stroke-width="0.75"/>
        
        <!-- Animated Fill Bar -->
        <rect x="250" y="-10" width="${barWidth}" height="8" rx="4" fill="url(#goldGrad)" opacity="0.9">
          <animate attributeName="width" from="0" to="${barWidth}" dur="1.2s" begin="${0.15 + i * 0.1}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>
        </rect>
      </g>
    `;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Behind The Scenes: Production statistics slate detailing repositories, commits, and language footprint">
  <title>Behind The Scenes — Production Stats Slate</title>
  <defs>
    ${renderDefs(theme)}
    <pattern id="slateStripe" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="10" height="20" fill="${t.accentGold}" opacity="0.15"/>
      <rect x="10" width="10" height="20" fill="transparent"/>
    </pattern>
  </defs>

  <style>
    .sans-track {
      font-family: ${config.fonts.bodySans};
      letter-spacing: 0.28em;
      text-transform: uppercase;
    }
    .serif-num {
      font-family: ${config.fonts.serifFallback};
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    @media (prefers-reduced-motion: no-preference) {
      .fade-in {
        animation: fadeIn 1.8s ease-out forwards;
      }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  </style>

  ${renderLetterboxFrame(W, H, theme)}

  <!-- Header -->
  <g class="fade-in">
    <text class="sans-track" x="600" y="70" font-size="9.5" fill="${t.typeMuted}" text-anchor="middle">PRODUCTION CALL SHEET &#8226; ACTIVE REEL TELEMETRY</text>
    ${titlePath.svg}
    <line x1="440" y1="126" x2="760" y2="126" stroke="${t.hairlineSubtle}" stroke-width="1"/>
  </g>

  <!-- Slate Clap Strip Header -->
  <g transform="translate(60, 150)">
    <rect x="0" y="0" width="1080" height="24" rx="2" fill="${t.surfaceSubtle}" stroke="${t.border}" stroke-width="1"/>
    <rect x="0" y="0" width="1080" height="24" fill="url(#slateStripe)" rx="2"/>
    <text class="sans-track" x="20" y="16" font-size="8.5" font-weight="600" fill="${t.accentGold}">SCENE: PRODUCTION-TELEMETRY</text>
    <text class="sans-track" x="540" y="16" font-size="8.5" fill="${t.typeSecondary}" text-anchor="middle">ROLL: NIGHTLY-ACTIONS-DAEMON</text>
    <text class="sans-track" x="1060" y="16" font-size="8.5" fill="${t.accentGold}" text-anchor="end">STATUS: IN REEL</text>
  </g>

  <!-- 3 Slate Metric Boxes -->
  <g transform="translate(60, 186)">
    <!-- Box 1: REPOSITORIES -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="346" height="110" rx="3" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>
      <rect x="0" y="0" width="4" height="110" fill="${t.accentGold}"/>
      <text class="sans-track" x="24" y="28" font-size="9" font-weight="600" fill="${t.typeMuted}">SCENE / REPOSITORIES</text>
      <text class="serif-num" x="24" y="72" font-size="40" fill="${t.accentGold}">${stats.repoCount}</text>
      <text class="sans-track" x="24" y="96" font-size="8.5" fill="${t.typeSecondary}">PUBLIC ARCHIVES ON RECORD</text>
    </g>

    <!-- Box 2: TAKES THIS MONTH -->
    <g transform="translate(367, 0)">
      <rect x="0" y="0" width="346" height="110" rx="3" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>
      <rect x="0" y="0" width="4" height="110" fill="${t.accentGold}"/>
      <text class="sans-track" x="24" y="28" font-size="9" font-weight="600" fill="${t.typeMuted}">TAKES THIS MONTH</text>
      <text class="serif-num" x="24" y="72" font-size="40" fill="${t.accentGold}">${stats.commits30d} <tspan font-size="16" class="sans-track">COMMITS</tspan></text>
      <text class="sans-track" x="24" y="96" font-size="8.5" fill="${t.typeSecondary}">PAST 30 DAYS REEL VELOCITY</text>
    </g>

    <!-- Box 3: LAST SHOT -->
    <g transform="translate(734, 0)">
      <rect x="0" y="0" width="346" height="110" rx="3" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>
      <rect x="0" y="0" width="4" height="110" fill="${t.accentGold}"/>
      <text class="sans-track" x="24" y="28" font-size="9" font-weight="600" fill="${t.typeMuted}">LAST SHOT / ACTIVE REPO</text>
      <text class="serif-num" x="24" y="68" font-size="24" fill="${t.accentGold}">${escapeXml(stats.lastPushed.name)}</text>
      <text class="sans-track" x="24" y="96" font-size="8.5" fill="${t.typeSecondary}">PUSHED ${escapeXml(stats.lastPushed.timeAgo.toUpperCase())}</text>
    </g>
  </g>

  <!-- Languages Distribution Panel -->
  <g transform="translate(60, 310)">
    <rect x="0" y="0" width="1080" height="290" rx="3" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>
    
    <!-- Sub-header -->
    <rect x="0" y="0" width="1080" height="34" rx="3" fill="${t.surfaceSubtle}"/>
    <line x1="0" y1="34" x2="1080" y2="34" stroke="${t.border}" stroke-width="1"/>
    <text class="sans-track" x="24" y="22" font-size="9.5" font-weight="600" fill="${t.accentGold}">LANGUAGES &#8226; CODEBASE FOOTPRINT BY BYTES</text>
    <text class="sans-track" x="1056" y="22" font-size="9" fill="${t.typeMuted}" text-anchor="end">CALCULATED ACROSS ALL PUBLIC REPOSITORIES</text>

    <!-- Language Bars -->
    <g transform="translate(0, -10)">
      ${langBars}
    </g>
  </g>

  <!-- Bottom Slate Note -->
  <g transform="translate(600, 630)">
    <text class="sans-track" x="0" y="0" font-size="8" fill="${t.typeMuted}" text-anchor="middle">DATA SOURCE: GITHUB API &#8226; REFRESHED VIA GITHUB ACTION &#8226; ZERO 3RD-PARTY TRACKERS</text>
  </g>
</svg>`;
}

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
