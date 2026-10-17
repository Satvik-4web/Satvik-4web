import { renderDefs, renderLetterboxFrame } from './shared.mjs';
import { createTextPath } from '../scripts/text-to-path.mjs';

export function renderPosterCampusverseSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 700;

  const titlePath = createTextPath('CAMPUSVERSE', {
    font: 'bold',
    fontSize: 54,
    tracking: 16,
    align: 'left',
    x: 60,
    y: 115,
    fill: `url(#goldGrad)`
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Poster and scene illustration for CampusVerse: AR/VR digital kiosk funded by TIET ELC">
  <title>CampusVerse — Feature Poster</title>
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
      .ar-frame {
        transform-origin: 540px 160px;
        animation: frameRotate 10s ease-in-out infinite;
      }
      .laser-sweep {
        animation: laserMotion 5s ease-in-out infinite;
      }
    }
    @keyframes frameRotate {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50%      { transform: translateY(-6px) rotate(2deg); }
    }
    @keyframes laserMotion {
      0%   { transform: translateY(0px); opacity: 0; }
      15%  { opacity: 0.9; }
      85%  { opacity: 0.9; }
      100% { transform: translateY(180px); opacity: 0; }
    }
  </style>

  ${renderLetterboxFrame(W, H, theme)}

  <!-- Poster Header -->
  <g transform="translate(60, 68)">
    <text class="sans-track" x="0" y="0" font-size="10" fill="${t.typeMuted}">PRODUCTION 04 &#8226; SPATIAL AR WEB ARCHITECTURE</text>
    <rect x="940" y="-12" width="140" height="20" fill="none" stroke="${t.hairline}" stroke-width="1"/>
    <text class="sans-track" x="1010" y="2" font-size="9" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#9670; FEATURED SYSTEM</text>
  </g>

  <!-- Title & Tagline -->
  <g transform="translate(0, 0)">
    ${titlePath.svg}
    <text class="serif-tagline" x="60" y="152">
      "Interactive digital kiosk and spatial student web platform funded through TIET's Experiential Learning Centre."
    </text>
  </g>

  <!-- Cinema Scene Still: Wireframe Kiosk + AR Reticle + Scan Line (60, 180 to 1140, 500) -->
  <g transform="translate(60, 180)">
    <rect width="1080" height="320" fill="${t.surface}" stroke="${t.hairlineSubtle}" stroke-width="1"/>

    <!-- Still Frame Corner Accents -->
    <path d="M 0 16 L 0 0 L 16 0" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 1080 16 L 1080 0 L 1064 0" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 0 304 L 0 320 L 16 320" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 1080 304 L 1080 320 L 1064 320" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>

    <text class="sans-track" x="24" y="32" font-size="9" fill="${t.accentGold}">SCENE STILL 04 &#8226; SPATIAL KIOSK MESH</text>
    <text class="sans-track" x="1056" y="32" font-size="8.5" fill="${t.typeMuted}" text-anchor="end">TIET ELC GRANT &#8226; 6-DOF ANCHOR</text>

    <!-- Isometric Wireframe Kiosk (Centered at x=540, y=160) -->
    <g transform="translate(300, 30)">
      <!-- Isometric Ground Grid -->
      <path d="M 80 200 L 240 140 L 400 200 L 240 260 Z" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
      <path d="M 160 170 L 320 230 M 320 170 L 160 230" stroke="${t.hairlineSubtle}" stroke-width="0.8" stroke-dasharray="2 2"/>

      <!-- Kiosk Core Prism -->
      <!-- Vertical lines -->
      <line x1="200" y1="190" x2="200" y2="90" stroke="${t.accentGold}" stroke-width="1.4"/>
      <line x1="240" y1="205" x2="240" y2="105" stroke="${t.accentGold}" stroke-width="1.4"/>
      <line x1="280" y1="190" x2="280" y2="90" stroke="${t.accentGold}" stroke-width="1.4"/>
      <line x1="240" y1="175" x2="240" y2="75" stroke="${t.hairlineSubtle}" stroke-width="1" stroke-dasharray="2 2"/>

      <!-- Front screen face -->
      <polygon points="200,90 240,105 240,65 200,50" fill="${t.hairlineSubtle}" stroke="${t.accentGold}" stroke-width="1.2"/>
      <!-- Right face -->
      <polygon points="240,105 280,90 280,50 240,65" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
      <!-- Top face -->
      <polygon points="200,50 240,35 280,50 240,65" fill="${t.surfaceSubtle}" stroke="${t.accentGold}" stroke-width="1.2"/>

      <!-- Ambient Architectural Pavilion Framework -->
      <line x1="140" y1="160" x2="140" y2="70" stroke="${t.hairlineSubtle}" stroke-width="1"/>
      <line x1="340" y1="160" x2="340" y2="70" stroke="${t.hairlineSubtle}" stroke-width="1"/>
      <line x1="140" y1="70" x2="240" y2="20" stroke="${t.hairlineSubtle}" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="340" y1="70" x2="240" y2="20" stroke="${t.hairlineSubtle}" stroke-width="1" stroke-dasharray="3 3"/>

      <!-- Rotating AR Reticle Corners (Targeting Kiosk) -->
      <g class="ar-frame">
        <path d="M 160 50 L 160 30 L 180 30" fill="none" stroke="${t.accentGold}" stroke-width="2"/>
        <path d="M 300 30 L 320 30 L 320 50" fill="none" stroke="${t.accentGold}" stroke-width="2"/>
        <path d="M 160 170 L 160 190 L 180 190" fill="none" stroke="${t.accentGold}" stroke-width="2"/>
        <path d="M 300 190 L 320 190 L 320 170" fill="none" stroke="${t.accentGold}" stroke-width="2"/>
        <!-- Central crosshairs -->
        <circle cx="240" cy="110" r="3" fill="${t.accentGold}"/>
        <line x1="230" y1="110" x2="250" y2="110" stroke="${t.accentGold}" stroke-width="1"/>
        <line x1="240" y1="100" x2="240" y2="120" stroke="${t.accentGold}" stroke-width="1"/>
      </g>

      <!-- Laser Scan Sweep -->
      <g class="laser-sweep" transform="translate(140, 30)">
        <line x1="0" y1="0" x2="200" y2="0" stroke="${t.accentGoldHighlight}" stroke-width="1.8"/>
      </g>
    </g>

    <!-- Telemetry Readout Details (Bottom Left & Right inside still) -->
    <g transform="translate(24, 255)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">HARDWARE &#8226; DIGITAL KIOSK TERMINAL</text>
      <text class="sans-track" x="0" y="16" font-size="9.5" font-weight="600" fill="${t.typePrimary}">PATIALA CAMPUS COORDINATES: 30.3564&#176; N, 76.3647&#176; E</text>
    </g>

    <g transform="translate(1056, 255)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}" text-anchor="end">EXPERIENTIAL LEARNING CENTRE</text>
      <text class="sans-track" x="0" y="16" font-size="9.5" font-weight="600" fill="${t.accentGold}" text-anchor="end">GRANT FUNDED &#8226; TIET ELC</text>
    </g>
  </g>

  <!-- Cinema Credit Block (Bottom) -->
  <g transform="translate(60, 545)">
    <line x1="0" y1="0" x2="1080" y2="0" stroke="${t.hairlineSubtle}" stroke-width="1"/>
    
    <g transform="translate(0, 30)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">CORE PLATFORM</text>
      <text class="sans-track" x="0" y="18" font-size="11" font-weight="600" fill="${t.typePrimary}">SATVIK</text>
    </g>

    <g transform="translate(240, 30)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">FOUNDATION &amp; STACK</text>
      <text class="sans-track" x="0" y="18" font-size="11" font-weight="600" fill="${t.accentGold}">JAVASCRIPT &#8226; WEBAR / VR &#8226; 3D KIOSK PLATFORM &#8226; TIET ELC</text>
    </g>

    <g transform="translate(900, 30)">
      <text class="sans-track" x="180" y="0" font-size="9" fill="${t.typeMuted}" text-anchor="end">DEPLOYMENT</text>
      <text class="sans-track" x="180" y="18" font-size="11" font-weight="600" fill="${t.typePrimary}" text-anchor="end">CAMPUS WEB KIOSK</text>
    </g>

    <text class="sans-track" x="540" y="80" font-size="9.5" fill="${t.accentGold}" text-anchor="middle">
      VIEW REPOSITORY &#8226; GITHUB.COM/SATVIK-4WEB/CAMPUS-VERSE &#8599;
    </text>
  </g>
</svg>`;
}
