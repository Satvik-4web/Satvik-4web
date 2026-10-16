import { fontStack } from './colors.mjs';

export function renderCampusverseSvg(theme) {
  const t = theme;
  const isDark = t.name === 'dark';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="100%" height="360">
  <defs>
    <linearGradient id="cvAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentCyan}"/>
      <stop offset="100%" stop-color="${t.accentViolet}"/>
    </linearGradient>
    <filter id="cvShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${t.shadow}"/>
    </filter>
  </defs>

  <style>
    .mono { font-family: ${fontStack}; }
    @media (prefers-reduced-motion: no-preference) {
      /* AR Reticle slow floating/rotation */
      .ar-reticle {
        transform-origin: 186px 130px;
        animation: reticleFloat 8s ease-in-out infinite;
      }
      /* Vertical laser scanning line */
      .scan-laser {
        animation: laserScan 4s ease-in-out infinite;
      }
      /* Wireframe vertices pulse */
      .vertex-pulse {
        animation: vPulse 3s ease-in-out infinite;
      }
    }
    @keyframes reticleFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50%      { transform: translateY(-8px) rotate(3deg); }
    }
    @keyframes laserScan {
      0%   { transform: translateY(0px); opacity: 0; }
      15%  { opacity: 1; }
      85%  { opacity: 1; }
      100% { transform: translateY(140px); opacity: 0; }
    }
    @keyframes vPulse {
      0%, 100% { fill: ${t.accentCyan}; opacity: 0.7; }
      50%      { fill: ${t.accentViolet}; opacity: 1; filter: drop-shadow(0 0 4px ${t.accentCyan}); }
    }
  </style>

  <!-- Window Container -->
  <rect x="8" y="8" width="784" height="344" rx="12" fill="${t.cardBg}" stroke="${t.border}" stroke-width="1" filter="url(#cvShadow)"/>

  <!-- Title Bar -->
  <path d="M 8 20 A 12 12 0 0 1 20 8 L 780 8 A 12 12 0 0 1 792 20 L 792 44 L 8 44 Z" fill="${t.titleBarBg}" stroke="${t.border}" stroke-width="1"/>
  <circle cx="28" cy="26" r="5" fill="${t.dotRed}"/>
  <circle cx="44" cy="26" r="5" fill="${t.dotYellow}"/>
  <circle cx="60" cy="26" r="5" fill="${t.dotGreen}"/>
  
  <text x="80" y="30" class="mono" font-size="12" fill="${t.textMuted}">proc://campusverse-ar [PID 1216] — Satvik-4web/campus-verse</text>
  
  <!-- Status Badge BUILT -->
  <rect x="696" y="16" width="82" height="20" rx="10" fill="${isDark ? 'rgba(79, 140, 255, 0.15)' : 'rgba(37, 99, 235, 0.12)'}" stroke="${t.accentBlue}" stroke-width="1"/>
  <circle cx="710" cy="26" r="3.5" fill="${t.accentBlue}"/>
  <text x="742" y="30" class="mono" font-size="10.5" font-weight="700" fill="${t.accentBlue}" text-anchor="middle">BUILT</text>

  <!-- Left Column: Description and Highlights -->
  <g transform="translate(28, 64)">
    <text class="mono" font-size="19" font-weight="700" fill="${t.textPrimary}">CampusVerse</text>
    <text x="162" y="-2" class="mono" font-size="11" font-weight="600" fill="${t.accentViolet}">"AR/VR Kiosk"</text>

    <!-- One-line Description -->
    <text y="28" class="mono" font-size="11" fill="${t.textSecondary}">
      <tspan x="0" dy="0">AR/VR interactive digital kiosk and student web platform,</tspan>
      <tspan x="0" dy="16">funded through TIET's Experiential Learning Centre (ELC).</tspan>
    </text>

    <!-- Key Capabilities List -->
    <g transform="translate(0, 72)">
      <text class="mono" font-size="10.5" fill="${t.accentViolet}">▸</text>
      <text x="16" class="mono" font-size="10.5" fill="${t.textPrimary}">Funded by TIET Experiential Learning Centre (ELC)</text>

      <text y="20" class="mono" font-size="10.5" fill="${t.accentCyan}">▸</text>
      <text x="16" y="20" class="mono" font-size="10.5" fill="${t.textPrimary}">Interactive digital kiosk for campus spatial exploration</text>

      <text y="40" class="mono" font-size="10.5" fill="${t.accentBlue}">▸</text>
      <text x="16" y="40" class="mono" font-size="10.5" fill="${t.textPrimary}">Realtime student web platform &amp; campus event mesh</text>

      <text y="60" class="mono" font-size="10.5" fill="${t.accentGreen}">▸</text>
      <text x="16" y="60" class="mono" font-size="10.5" fill="${t.textPrimary}">Optimized 3D rendering pipeline for low-power displays</text>
    </g>

    <!-- Tech Tags Row -->
    <g transform="translate(0, 162)">
      <rect width="90" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="45" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">JavaScript</text>

      <rect x="96" width="94" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="143" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">WebAR / VR</text>

      <rect x="196" width="80" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="236" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">3D Kiosk</text>

      <rect x="282" width="76" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="320" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">TIET ELC</text>
    </g>

    <!-- Footer CLI Link hint -->
    <g transform="translate(0, 204)">
      <rect width="350" height="26" rx="5" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
      <text x="10" y="17" class="mono" font-size="10" fill="${t.textMuted}">$ gh repo view Satvik-4web/campus-verse</text>
      <text x="340" y="17" class="mono" font-size="10" font-weight="700" fill="${t.accentViolet}" text-anchor="end">SOURCE ↗</text>
    </g>
  </g>

  <!-- Right Column: Micro-Visual (Isometric Wireframe Kiosk + AR Reticle + Scan Line) -->
  <g transform="translate(404, 58)">
    <rect width="372" height="280" rx="8" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>

    <!-- Header bar -->
    <rect x="12" y="12" width="348" height="24" rx="4" fill="${t.panelBgSubtle}"/>
    <text x="22" y="28" class="mono" font-size="10" font-weight="600" fill="${t.textSecondary}">SPATIAL AR ENGINE · ELC LAB</text>
    <text x="350" y="28" class="mono" font-size="9.5" fill="${t.accentViolet}" text-anchor="end">6-DOF TRACK</text>

    <!-- Isometric Wireframe Kiosk and Campus Pavilion -->
    <g transform="translate(0, 10)">
      <!-- Isometric Ground Grid -->
      <path d="M 80 180 L 186 130 L 292 180 L 186 230 Z" fill="none" stroke="${t.gridLine}" stroke-width="1.5"/>
      <path d="M 133 155 L 239 205 M 239 155 L 133 205" stroke="${t.gridLine}" stroke-width="1" stroke-dasharray="2 2"/>

      <!-- Kiosk Base Box -->
      <!-- Bottom face: (156, 175) to (186, 160) to (216, 175) to (186, 190) -->
      <!-- Vertical pillars -->
      <line x1="156" y1="175" x2="156" y2="120" stroke="${t.accentCyan}" stroke-width="1.2"/>
      <line x1="186" y1="190" x2="186" y2="135" stroke="${t.accentCyan}" stroke-width="1.2"/>
      <line x1="216" y1="175" x2="216" y2="120" stroke="${t.accentCyan}" stroke-width="1.2"/>
      <line x1="186" y1="160" x2="186" y2="105" stroke="${t.border}" stroke-width="1" stroke-dasharray="2 2"/>

      <!-- Kiosk Screen Face (Isometric angle) -->
      <polygon points="156,120 186,135 186,95 156,80" fill="${isDark ? 'rgba(34, 211, 238, 0.12)' : 'rgba(8, 145, 178, 0.1)'}" stroke="${t.accentCyan}" stroke-width="1.4"/>
      <!-- Kiosk Side Face -->
      <polygon points="186,135 216,120 216,80 186,95" fill="${isDark ? 'rgba(139, 92, 246, 0.12)' : 'rgba(124, 58, 237, 0.1)'}" stroke="${t.accentViolet}" stroke-width="1.4"/>
      <!-- Kiosk Roof Top -->
      <polygon points="156,80 186,65 216,80 186,95" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1.2"/>

      <!-- Campus pavilion backdrop columns -->
      <line x1="110" y1="155" x2="110" y2="90" stroke="${t.border}" stroke-width="1"/>
      <line x1="262" y1="155" x2="262" y2="90" stroke="${t.border}" stroke-width="1"/>
      <line x1="110" y1="90" x2="186" y2="55" stroke="${t.border}" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="262" y1="90" x2="186" y2="55" stroke="${t.border}" stroke-width="1" stroke-dasharray="3 3"/>

      <!-- Vertices dots -->
      <circle class="vertex-pulse" cx="156" cy="120" r="3"/>
      <circle class="vertex-pulse" cx="186" cy="135" r="3"/>
      <circle class="vertex-pulse" cx="216" cy="120" r="3"/>
      <circle class="vertex-pulse" cx="186" cy="95" r="3"/>
      <circle class="vertex-pulse" cx="156" cy="80" r="3"/>
      <circle class="vertex-pulse" cx="216" cy="80" r="3"/>
      <circle class="vertex-pulse" cx="186" cy="65" r="3"/>

      <!-- Floating Rotating AR Bounding Reticle -->
      <g class="ar-reticle">
        <!-- Reticle corners around the kiosk (approx box: 130 to 242, 50 to 160) -->
        <!-- Top-Left -->
        <path d="M 130 65 L 130 50 L 145 50" fill="none" stroke="${t.accentCyan}" stroke-width="2"/>
        <!-- Top-Right -->
        <path d="M 227 50 L 242 50 L 242 65" fill="none" stroke="${t.accentCyan}" stroke-width="2"/>
        <!-- Bottom-Left -->
        <path d="M 130 145 L 130 160 L 145 160" fill="none" stroke="${t.accentViolet}" stroke-width="2"/>
        <!-- Bottom-Right -->
        <path d="M 227 160 L 242 160 L 242 145" fill="none" stroke="${t.accentViolet}" stroke-width="2"/>
        <!-- Crosshairs in center -->
        <line x1="181" y1="105" x2="191" y2="105" stroke="${t.accentCyan}" stroke-width="1.2"/>
        <line x1="186" y1="100" x2="186" y2="110" stroke="${t.accentCyan}" stroke-width="1.2"/>
      </g>

      <!-- Laser Scan-Line Sweep -->
      <g class="scan-laser" transform="translate(100, 50)">
        <line x1="0" y1="0" x2="172" y2="0" stroke="${t.accentCyan}" stroke-width="2" filter="drop-shadow(0 0 6px ${t.accentCyan})"/>
        <line x1="0" y1="0" x2="172" y2="0" stroke="#FFFFFF" stroke-width="1"/>
      </g>
    </g>

    <!-- Telemetry Readout Panel (Bottom) -->
    <g transform="translate(14, 206)">
      <rect width="344" height="60" rx="6" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
      <text x="12" y="20" class="mono" font-size="9" fill="${t.textMuted}">ANCHOR:</text>
      <text x="68" y="20" class="mono" font-size="9" font-weight="700" fill="${t.accentCyan}">TIET-ELC-KIOSK-01 [LOCKED]</text>
      
      <text x="12" y="36" class="mono" font-size="9" fill="${t.textMuted}">RENDER:</text>
      <text x="68" y="36" class="mono" font-size="9" fill="${t.textSecondary}">WebGL Spatial Wireframe · 60 FPS Target</text>
      
      <text x="12" y="50" class="mono" font-size="8.5" fill="${t.textMuted}">FUNDING:</text>
      <text x="68" y="50" class="mono" font-size="8.5" font-weight="600" fill="${t.accentViolet}">TIET Experiential Learning Centre (ELC)</text>
    </g>
  </g>
</svg>`;
}
