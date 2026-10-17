import { renderDefs, renderLetterboxFrame } from './shared.mjs';
import { createTextPath } from '../scripts/text-to-path.mjs';

export function renderPosterStudentManagementSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 700;

  const titlePath = createTextPath('STUDENT MANAGEMENT', {
    font: 'bold',
    fontSize: 50,
    tracking: 14,
    align: 'left',
    x: 60,
    y: 115,
    fill: `url(#goldGrad)`
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Poster and scene illustration for Student Management System: 5-role Sanctum auth architecture">
  <title>Student Management System — Feature Poster</title>
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
      .token-packet {
        animation: tokenTransit 8s ease-in-out infinite;
      }
      .faculty-role {
        animation: facultyLight 8s ease-in-out infinite;
      }
      .dash-outline {
        animation: dashGlow 8s ease-in-out infinite;
      }
    }
    @keyframes tokenTransit {
      0%   { transform: translate(0px, 0px); opacity: 0; }
      10%  { opacity: 1; }
      40%  { transform: translate(220px, 0px); }
      60%  { transform: translate(220px, 75px); }
      75%  { transform: translate(320px, 75px); opacity: 1; }
      90%  { transform: translate(320px, 75px); opacity: 0; }
      100% { transform: translate(0px, 0px); opacity: 0; }
    }
    @keyframes facultyLight {
      0%, 45%  { stroke: ${t.hairlineSubtle}; fill: transparent; }
      65%, 90% { stroke: ${t.accentGold}; fill: ${t.hairlineSubtle}; }
      100%     { stroke: ${t.hairlineSubtle}; fill: transparent; }
    }
    @keyframes dashGlow {
      0%, 48%  { opacity: 0.3; }
      65%, 90% { opacity: 1; stroke: ${t.accentGold}; }
      100%     { opacity: 0.3; }
    }
  </style>

  ${renderLetterboxFrame(W, H, theme)}

  <!-- Poster Header -->
  <g transform="translate(60, 68)">
    <text class="sans-track" x="0" y="0" font-size="10" fill="${t.typeMuted}">PRODUCTION 02 &#8226; ROLE SEPARATION ARCHITECTURE</text>
    <rect x="940" y="-12" width="140" height="20" fill="none" stroke="${t.hairline}" stroke-width="1"/>
    <text class="sans-track" x="1010" y="2" font-size="9" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#9670; FEATURED SYSTEM</text>
  </g>

  <!-- Title & Tagline -->
  <g transform="translate(0, 0)">
    ${titlePath.svg}
    <text class="serif-tagline" x="60" y="152">
      "Sanctum bearer-token authentication protecting five distinct institutional tiers via backend middleware."
    </text>
  </g>

  <!-- Cinema Scene Still: Role Marks + Token + Dashboard (60, 180 to 1140, 500) -->
  <g transform="translate(60, 180)">
    <rect width="1080" height="320" fill="${t.surface}" stroke="${t.hairlineSubtle}" stroke-width="1"/>

    <!-- Still Frame Corner Accents -->
    <path d="M 0 16 L 0 0 L 16 0" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 1080 16 L 1080 0 L 1064 0" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 0 304 L 0 320 L 16 320" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 1080 304 L 1080 320 L 1064 320" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>

    <text class="sans-track" x="24" y="32" font-size="9" fill="${t.accentGold}">SCENE STILL 02 &#8226; 5-TIER RBAC DISPATCHER</text>
    <text class="sans-track" x="1056" y="32" font-size="8.5" fill="${t.typeMuted}" text-anchor="end">SANCTUM BEARER PROTOCOL &#8226; POSTMAN VERIFIED</text>

    <!-- Left: Auth Seal & Login Origin -->
    <g transform="translate(30, 80)">
      <rect width="140" height="80" fill="none" stroke="${t.accentGold}" stroke-width="1"/>
      <text class="sans-track" x="70" y="30" font-size="9" fill="${t.typeMuted}" text-anchor="middle">AUTH ORIGIN</text>
      <text class="sans-track" x="70" y="48" font-size="11" font-weight="600" fill="${t.typePrimary}" text-anchor="middle">POST /LOGIN</text>
      <text class="sans-track" x="70" y="66" font-size="8.5" fill="${t.accentGold}" text-anchor="middle">SANCTUM TOKEN</text>
    </g>

    <!-- Circuit Bus Hairline -->
    <path d="M 170 120 L 390 120 L 390 195 L 470 195" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1.2" stroke-dasharray="3 3"/>

    <!-- Gold Token Packet -->
    <g class="token-packet" transform="translate(170, 120)">
      <circle cx="0" cy="0" r="4.5" fill="${t.accentGold}"/>
      <circle cx="0" cy="0" r="8" fill="none" stroke="${t.accentGoldHighlight}" stroke-width="1"/>
    </g>

    <!-- 5 Role Marks (x=470 to 670) -->
    <g transform="translate(470, 60)">
      <!-- Role 1: Admin -->
      <g transform="translate(0, 0)">
        <rect width="180" height="26" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
        <text class="sans-track" x="16" y="17" font-size="8.5" fill="${t.typeMuted}">01 &#8226; ADMIN</text>
        <text class="sans-track" x="164" y="17" font-size="8" fill="${t.typeMuted}" text-anchor="end">403</text>
      </g>
      <!-- Role 2: Principal -->
      <g transform="translate(0, 32)">
        <rect width="180" height="26" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
        <text class="sans-track" x="16" y="17" font-size="8.5" fill="${t.typeMuted}">02 &#8226; PRINCIPAL</text>
        <text class="sans-track" x="164" y="17" font-size="8" fill="${t.typeMuted}" text-anchor="end">403</text>
      </g>
      <!-- Role 3: HOD -->
      <g transform="translate(0, 64)">
        <rect width="180" height="26" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
        <text class="sans-track" x="16" y="17" font-size="8.5" fill="${t.typeMuted}">03 &#8226; HOD</text>
        <text class="sans-track" x="164" y="17" font-size="8" fill="${t.typeMuted}" text-anchor="end">403</text>
      </g>
      <!-- Role 4: FACULTY (MATCHED) -->
      <g class="faculty-role" transform="translate(0, 96)">
        <rect width="180" height="30" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1.2"/>
        <text class="sans-track" x="16" y="19" font-size="9" font-weight="600" fill="${t.accentGold}">04 &#8226; FACULTY</text>
        <text class="sans-track" x="164" y="19" font-size="8.5" font-weight="600" fill="${t.accentGold}" text-anchor="end">&#9670; AUTH</text>
      </g>
      <!-- Role 5: Student -->
      <g transform="translate(0, 132)">
        <rect width="180" height="26" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
        <text class="sans-track" x="16" y="17" font-size="8.5" fill="${t.typeMuted}">05 &#8226; STUDENT</text>
        <text class="sans-track" x="164" y="17" font-size="8" fill="${t.typeMuted}" text-anchor="end">403</text>
      </g>
    </g>

    <!-- Right: Activated Dashboard Wireframe Outline (x=700 to 1040) -->
    <g class="dash-outline" transform="translate(700, 60)">
      <rect width="340" height="180" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
      <rect x="0" y="0" width="340" height="28" fill="${t.surfaceSubtle}"/>
      <text class="sans-track" x="16" y="18" font-size="9" font-weight="600" fill="${t.accentGold}">FACULTY DASHBOARD &#8226; ACCESS GRANTED</text>
      <text class="sans-track" x="324" y="18" font-size="8" fill="${t.typeSecondary}" text-anchor="end">200 OK</text>

      <text class="sans-track" x="16" y="55" font-size="8.5" fill="${t.typeMuted}">SESSION BEARER TOKEN:</text>
      <text class="sans-track" x="180" y="55" font-size="8.5" fill="${t.typeSecondary}">1|sanctum_token_active</text>

      <!-- Sub modules -->
      <g transform="translate(16, 75)">
        <rect width="90" height="40" fill="none" stroke="${t.hairlineSubtle}" stroke-width="0.8"/>
        <text class="sans-track" x="45" y="24" font-size="8" fill="${t.typeSecondary}" text-anchor="middle">GRADEBOOK</text>

        <rect x="104" width="96" height="40" fill="none" stroke="${t.hairlineSubtle}" stroke-width="0.8"/>
        <text class="sans-track" x="152" y="24" font-size="8" fill="${t.typeSecondary}" text-anchor="middle">ATTENDANCE</text>

        <rect x="214" width="94" height="40" fill="none" stroke="${t.hairlineSubtle}" stroke-width="0.8"/>
        <text class="sans-track" x="261" y="24" font-size="8" fill="${t.typeSecondary}" text-anchor="middle">STUDENT CRUD</text>
      </g>

      <text class="sans-track" x="16" y="145" font-size="8" fill="${t.typeMuted}">MIDDLEWARE ENFORCEMENT &#8226; TOKEN REVOCATION ON CHANGE-PASSWORD</text>
    </g>

    <!-- Still Bottom Caption -->
    <text class="sans-track" x="24" y="295" font-size="9" fill="${t.typeMuted}">SPECIFICATION: ROLE-BASED ACCESS CONTROL ENFORCED IN CONTROLLER MIDDLEWARE &#8226; NEXT.JS FRONTEND</text>
  </g>

  <!-- Cinema Credit Block (Bottom) -->
  <g transform="translate(60, 545)">
    <line x1="0" y1="0" x2="1080" y2="0" stroke="${t.hairlineSubtle}" stroke-width="1"/>
    
    <g transform="translate(0, 30)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">ARCHITECTURE</text>
      <text class="sans-track" x="0" y="18" font-size="11" font-weight="600" fill="${t.typePrimary}">SATVIK</text>
    </g>

    <g transform="translate(240, 30)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">PRODUCTION STACK</text>
      <text class="sans-track" x="0" y="18" font-size="11" font-weight="600" fill="${t.accentGold}">LARAVEL &#8226; PHP &#8226; SQLITE &#8226; NEXT.JS &#8226; REACT &#8226; TYPESCRIPT &#8226; TAILWIND</text>
    </g>

    <g transform="translate(900, 30)">
      <text class="sans-track" x="180" y="0" font-size="9" fill="${t.typeMuted}" text-anchor="end">STATUS</text>
      <text class="sans-track" x="180" y="18" font-size="11" font-weight="600" fill="${t.typePrimary}" text-anchor="end">PRODUCTION READY</text>
    </g>

    <text class="sans-track" x="540" y="80" font-size="9.5" fill="${t.accentGold}" text-anchor="middle">
      VIEW REPOSITORY &#8226; GITHUB.COM/SATVIK-4WEB/LARAVELAPP &#8599;
    </text>
  </g>
</svg>`;
}
