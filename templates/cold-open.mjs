import { renderDefs, renderLetterboxFrame } from './shared.mjs';
import { createTextPath } from '../scripts/text-to-path.mjs';

export function renderColdOpenSvg(theme, config) {
  const t = theme;
  const W = 1600;
  const H = 670;

  // Generate outlined SVG path for the main title SATVIK
  const titlePath = createTextPath('SATVIK', {
    font: 'bold',
    fontSize: 124,
    tracking: 28,
    align: 'center',
    x: 800,
    y: 320,
    fill: `url(#goldGrad)`,
    id: 'heroTitlePath'
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Title sequence: SATVIK, a film about building things">
  <title>SATVIK — A Film About Building Things</title>
  <defs>
    ${renderDefs(theme)}
  </defs>

  <style>
    .sans-track {
      font-family: ${config.fonts.bodySans};
      letter-spacing: 0.38em;
      text-transform: uppercase;
    }
    .serif-title {
      font-family: ${config.fonts.serifFallback};
    }
    @media (prefers-reduced-motion: no-preference) {
      .camera-push {
        transform-origin: 800px 335px;
        animation: pushIn ${config.motion.pushInDur} ease-in-out infinite alternate;
      }
      .flare-streak {
        animation: flareSweep ${config.motion.flareDur} ease-in-out infinite;
      }
      .card-1 { animation: cycleCard1 10s ease-in-out infinite; }
      .card-2 { animation: cycleCard2 10s ease-in-out infinite; }
      .card-3 { animation: cycleCard3 10s ease-in-out infinite; }
      .card-4 { animation: cycleCard4 10s ease-in-out infinite; }
      .draw-line {
        stroke-dasharray: 800;
        stroke-dashoffset: 800;
        animation: drawLine 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .fade-sub {
        animation: fadeIn 2.0s ease-out 0.8s both;
      }
    }
    @keyframes pushIn {
      0%   { transform: scale(1.0); }
      100% { transform: scale(1.035); }
    }
    @keyframes flareSweep {
      0%   { transform: translate(-700px, 0); opacity: 0; }
      20%  { opacity: 0.9; }
      70%  { opacity: 0.9; }
      100% { transform: translate(1900px, 0); opacity: 0; }
    }
    @keyframes drawLine {
      to { stroke-dashoffset: 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes cycleCard1 {
      0%, 20%  { opacity: 1; }
      25%, 95% { opacity: 0; }
      100%     { opacity: 1; }
    }
    @keyframes cycleCard2 {
      0%, 20%  { opacity: 0; }
      25%, 45% { opacity: 1; }
      50%, 100%{ opacity: 0; }
    }
    @keyframes cycleCard3 {
      0%, 45%  { opacity: 0; }
      50%, 70% { opacity: 1; }
      75%, 100%{ opacity: 0; }
    }
    @keyframes cycleCard4 {
      0%, 70%  { opacity: 0; }
      75%, 95% { opacity: 1; }
      100%     { opacity: 0; }
    }
  </style>

  ${renderLetterboxFrame(W, H, theme)}

  <!-- Camera Push Group -->
  <g class="camera-push">
    <!-- Top Metadata / Production Mark -->
    <text class="sans-track" x="800" y="110" font-size="11" fill="${t.accentGold}" text-anchor="middle">A PICTURE BY SATVIK-4WEB</text>

    <!-- Outlined Prestige Title: SATVIK -->
    <g transform="translate(0, 0)">
      ${titlePath.svg}
    </g>

    <!-- Horizontal Hairline Under Title -->
    <line class="draw-line" x1="420" y1="360" x2="1180" y2="360" stroke="${t.hairline}" stroke-width="1"/>

    <!-- Subtitle: A FILM ABOUT BUILDING THINGS -->
    <text class="sans-track fade-sub" x="800" y="405" font-size="12" fill="${t.typeSecondary}" text-anchor="middle">A FILM ABOUT BUILDING THINGS</text>

    <!-- Lower Third: 4 Cycling Title Cards (Calm Cross-Fades) -->
    <g transform="translate(800, 520)">
      <!-- Card 1: BUILD -->
      <g class="card-1">
        <text class="sans-track" x="0" y="0" font-size="13" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#9670; I. BUILD &#9670;</text>
        <text class="sans-track" x="0" y="24" font-size="9" fill="${t.typeMuted}" text-anchor="middle">THE FIRST DRAFT OF EVERY SYSTEM</text>
      </g>

      <!-- Card 2: BREAK -->
      <g class="card-2" opacity="0">
        <text class="sans-track" x="0" y="0" font-size="13" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#9670; II. BREAK &#9670;</text>
        <text class="sans-track" x="0" y="24" font-size="9" fill="${t.typeMuted}" text-anchor="middle">STRESS-TESTING AT THE PERIMETER</text>
      </g>

      <!-- Card 3: LEARN -->
      <g class="card-3" opacity="0">
        <text class="sans-track" x="0" y="0" font-size="13" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#9670; III. LEARN &#9670;</text>
        <text class="sans-track" x="0" y="24" font-size="9" fill="${t.typeMuted}" text-anchor="middle">ANALYSIS OF FAILURE &amp; ARCHITECTURE</text>
      </g>

      <!-- Card 4: REBUILD -->
      <g class="card-4" opacity="0">
        <text class="sans-track" x="0" y="0" font-size="13" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#9670; IV. REBUILD &#9670;</text>
        <text class="sans-track" x="0" y="24" font-size="9" fill="${t.typeMuted}" text-anchor="middle">PRODUCTION-GRADE INTELLIGENCE</text>
      </g>
    </g>
  </g>

  <!-- Anamorphic Lens Flare Sweep -->
  <g class="flare-streak" transform="translate(0, 340)">
    <ellipse cx="0" cy="0" rx="340" ry="1.2" fill="url(#flareGrad)"/>
    <circle cx="0" cy="0" r="3" fill="${t.flare}" opacity="0.7"/>
  </g>
</svg>`;
}
