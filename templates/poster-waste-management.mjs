import { renderDefs, renderLetterboxFrame } from './shared.mjs';
import { createTextPath } from '../scripts/text-to-path.mjs';

export function renderPosterWasteManagementSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 700;

  const titlePath = createTextPath('WASTE MANAGEMENT', {
    font: 'bold',
    fontSize: 50,
    tracking: 14,
    align: 'left',
    x: 60,
    y: 115,
    fill: `url(#goldGrad)`
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Poster and scene illustration for Waste Management System: Oracle PL/SQL normalized relational model">
  <title>Waste Management System — Feature Poster</title>
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
      .packet-bounce {
        animation: animBounce 8s ease-in-out infinite;
      }
      .packet-commit {
        animation: animCommit 8s ease-in-out infinite;
      }
      .trigger-signal {
        animation: animSignal 8s ease-in-out infinite;
      }
      .banner-rej { animation: showRej 8s step-end infinite; }
      .banner-com { animation: showCom 8s step-end infinite; }
    }
    @keyframes animBounce {
      0%   { transform: translate(0px, 0px); opacity: 0; }
      8%   { opacity: 1; }
      24%  { transform: translate(250px, 0px); }
      38%  { transform: translate(80px, 0px); opacity: 1; }
      48%  { transform: translate(80px, 0px); opacity: 0; }
      100% { opacity: 0; }
    }
    @keyframes animCommit {
      0%, 48% { opacity: 0; transform: translate(0px, 0px); }
      52%     { opacity: 1; }
      70%     { transform: translate(250px, 0px); }
      88%     { transform: translate(500px, 0px); opacity: 1; }
      96%     { transform: translate(500px, 0px); opacity: 0; }
      100%    { opacity: 0; }
    }
    @keyframes animSignal {
      0%, 18%  { stroke: ${t.hairlineSubtle}; fill: transparent; }
      24%, 42% { stroke: #D9534F; fill: rgba(217, 83, 79, 0.12); }
      48%, 64% { stroke: ${t.hairlineSubtle}; fill: transparent; }
      70%, 90% { stroke: ${t.accentGold}; fill: ${t.hairlineSubtle}; }
      100%     { stroke: ${t.hairlineSubtle}; fill: transparent; }
    }
    @keyframes showRej {
      0%, 48%   { opacity: 1; }
      49%, 100% { opacity: 0; }
    }
    @keyframes showCom {
      0%, 48%   { opacity: 0; }
      49%, 100% { opacity: 1; }
    }
  </style>

  ${renderLetterboxFrame(W, H, theme)}

  <!-- Poster Header -->
  <g transform="translate(60, 68)">
    <text class="sans-track" x="0" y="0" font-size="10" fill="${t.typeMuted}">PRODUCTION 03 &#8226; RELATIONAL DATABASE ARCHITECTURE</text>
    <rect x="940" y="-12" width="140" height="20" fill="none" stroke="${t.hairline}" stroke-width="1"/>
    <text class="sans-track" x="1010" y="2" font-size="9" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#9670; FEATURED SYSTEM</text>
  </g>

  <!-- Title & Tagline -->
  <g transform="translate(0, 0)">
    ${titlePath.svg}
    <text class="serif-tagline" x="60" y="152">
      "Normalized 3NF/BCNF relational schemas enforcing ACID transactions via automated PL/SQL database triggers."
    </text>
  </g>

  <!-- Cinema Scene Still: ER Graph & Constraint Validation (60, 180 to 1140, 500) -->
  <g transform="translate(60, 180)">
    <rect width="1080" height="320" fill="${t.surface}" stroke="${t.hairlineSubtle}" stroke-width="1"/>

    <!-- Still Frame Corner Accents -->
    <path d="M 0 16 L 0 0 L 16 0" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 1080 16 L 1080 0 L 1064 0" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 0 304 L 0 320 L 16 320" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 1080 304 L 1080 320 L 1064 320" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>

    <text class="sans-track" x="24" y="32" font-size="9" fill="${t.accentGold}">SCENE STILL 03 &#8226; RELATIONAL INTEGRITY VERIFICATION</text>
    <text class="sans-track" x="1056" y="32" font-size="8.5" fill="${t.typeMuted}" text-anchor="end">ORACLE 3NF/BCNF &#8226; PL/SQL TRIGGERS</text>

    <!-- Connected ER Relational Nodes (Center section) -->
    <g transform="translate(180, 70)">
      <!-- Connecting Relational Lines -->
      <line x1="80" y1="50" x2="330" y2="50" stroke="${t.hairlineSubtle}" stroke-width="1.5"/>
      <line x1="330" y1="50" x2="580" y2="50" stroke="${t.hairlineSubtle}" stroke-width="1.5"/>
      <line x1="330" y1="50" x2="330" y2="120" stroke="${t.hairlineSubtle}" stroke-width="1.5" stroke-dasharray="2 2"/>

      <!-- Node 1: Household -->
      <g transform="translate(0, 20)">
        <rect width="160" height="60" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
        <text class="sans-track" x="80" y="24" font-size="8.5" fill="${t.typeMuted}" text-anchor="middle">ENTITY</text>
        <text class="sans-track" x="80" y="44" font-size="10.5" font-weight="600" fill="${t.typePrimary}" text-anchor="middle">HOUSEHOLD</text>
      </g>

      <!-- Node 2: Collection -->
      <g transform="translate(250, 20)">
        <rect width="160" height="60" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
        <text class="sans-track" x="80" y="24" font-size="8.5" fill="${t.typeMuted}" text-anchor="middle">RELATION</text>
        <text class="sans-track" x="80" y="44" font-size="10.5" font-weight="600" fill="${t.accentGold}" text-anchor="middle">COLLECTION</text>
      </g>

      <!-- Node 3: Vehicle -->
      <g transform="translate(500, 20)">
        <rect width="160" height="60" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
        <text class="sans-track" x="80" y="24" font-size="8.5" fill="${t.typeMuted}" text-anchor="middle">CAPACITY</text>
        <text class="sans-track" x="80" y="44" font-size="10.5" font-weight="600" fill="${t.typePrimary}" text-anchor="middle">VEHICLE</text>
      </g>

      <!-- Trigger Node -->
      <g class="trigger-signal" transform="translate(240, 120)">
        <rect width="180" height="40" fill="none" stroke="${t.hairlineSubtle}" stroke-width="1"/>
        <text class="sans-track" x="90" y="18" font-size="8.5" font-weight="600" fill="${t.typePrimary}" text-anchor="middle">TRIGGER: CHECK_CAPACITY</text>
        <text class="sans-track" x="90" y="32" font-size="7.5" fill="${t.typeMuted}" text-anchor="middle">BEFORE INSERT &#8226; ACID VERIFY</text>
      </g>

      <!-- Over-capacity Packet (Bounce / Rollback) -->
      <g class="packet-bounce" transform="translate(80, 50)">
        <circle cx="0" cy="0" r="5" fill="#D9534F"/>
        <text class="sans-track" x="0" y="-10" font-size="8" font-weight="600" fill="#D9534F" text-anchor="middle">120KG &gt; CAP</text>
      </g>

      <!-- Valid Packet (Commit) -->
      <g class="packet-commit" transform="translate(80, 50)">
        <circle cx="0" cy="0" r="5" fill="${t.accentGold}"/>
        <text class="sans-track" x="0" y="-10" font-size="8" font-weight="600" fill="${t.accentGold}" text-anchor="middle">35KG OK</text>
      </g>
    </g>

    <!-- Dynamic Status Banner (Bottom inside still) -->
    <g transform="translate(24, 250)">
      <rect width="1032" height="48" fill="${t.surfaceSubtle}" stroke="${t.hairlineSubtle}" stroke-width="1"/>
      
      <!-- Rejected banner -->
      <g class="banner-rej">
        <text class="sans-track" x="20" y="28" font-size="9.5" font-weight="600" fill="#D9534F">
          &#9670; CONSTRAINT BREACH: CAPACITY EXCEEDED &#8226; PL/SQL TRIGGER FIRED: REJECTED (AUTOMATIC ROLLBACK)
        </text>
        <text class="sans-track" x="1012" y="28" font-size="8.5" fill="${t.typeMuted}" text-anchor="end">ORA-20001 &#8226; 400</text>
      </g>

      <!-- Commit banner -->
      <g class="banner-com">
        <text class="sans-track" x="20" y="28" font-size="9.5" font-weight="600" fill="${t.accentGold}">
          &#9670; VALIDATION VERIFIED: CAPACITY COMPLIANT &#8226; TRANSACTION COMMITTED TO 3NF/BCNF RELATIONS
        </text>
        <text class="sans-track" x="1012" y="28" font-size="8.5" fill="${t.typeSecondary}" text-anchor="end">ACID COMMIT &#8226; 200</text>
      </g>
    </g>
  </g>

  <!-- Cinema Credit Block (Bottom) -->
  <g transform="translate(60, 545)">
    <line x1="0" y1="0" x2="1080" y2="0" stroke="${t.hairlineSubtle}" stroke-width="1"/>
    
    <g transform="translate(0, 30)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">DATA ARCHITECTURE</text>
      <text class="sans-track" x="0" y="18" font-size="11" font-weight="600" fill="${t.typePrimary}">SATVIK</text>
    </g>

    <g transform="translate(240, 30)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">DATABASE &amp; API STACK</text>
      <text class="sans-track" x="0" y="18" font-size="11" font-weight="600" fill="${t.accentGold}">ORACLE DATABASE &#8226; PL/SQL &#8226; NODE.JS &#8226; EXPRESS &#8226; JAVASCRIPT</text>
    </g>

    <g transform="translate(900, 30)">
      <text class="sans-track" x="180" y="0" font-size="9" fill="${t.typeMuted}" text-anchor="end">SCHEMA DESIGN</text>
      <text class="sans-track" x="180" y="18" font-size="11" font-weight="600" fill="${t.typePrimary}" text-anchor="end">3NF &#8226; BCNF VERIFIED</text>
    </g>

    <text class="sans-track" x="540" y="80" font-size="9.5" fill="${t.accentGold}" text-anchor="middle">
      VIEW REPOSITORY &#8226; GITHUB.COM/SATVIK-4WEB/DBMS-PROJECT &#8599;
    </text>
  </g>
</svg>`;
}
