import { fontStack } from './colors.mjs';

export function renderStudentManagementSvg(theme) {
  const t = theme;
  const isDark = t.name === 'dark';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="100%" height="360">
  <defs>
    <linearGradient id="smAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentBlue}"/>
      <stop offset="100%" stop-color="${t.accentCyan}"/>
    </linearGradient>
    <filter id="smShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${t.shadow}"/>
    </filter>
  </defs>

  <style>
    .mono { font-family: ${fontStack}; }
    @media (prefers-reduced-motion: no-preference) {
      /* Token packet motion */
      .token-packet {
        animation: routeToken 7s ease-in-out infinite;
      }
      /* Faculty chip lighting up */
      .chip-faculty {
        animation: lightFaculty 7s ease-in-out infinite;
      }
      /* Dashboard activation */
      .dash-active {
        animation: showDash 7s ease-in-out infinite;
      }
      /* Locked chips pulse dim */
      .chip-locked {
        opacity: 0.55;
      }
    }
    @keyframes routeToken {
      0%   { transform: translate(0px, 0px); opacity: 0; }
      10%  { opacity: 1; }
      40%  { transform: translate(110px, 0px); }
      60%  { transform: translate(110px, 58px); }
      75%  { transform: translate(145px, 58px); opacity: 1; }
      90%  { transform: translate(145px, 58px); opacity: 0; }
      100% { transform: translate(0px, 0px); opacity: 0; }
    }
    @keyframes lightFaculty {
      0%, 45% { stroke: ${t.border}; fill: ${t.panelBgSubtle}; }
      65%, 90% { stroke: ${t.accentCyan}; fill: ${t.codeBg}; filter: drop-shadow(0 0 8px ${t.borderGlow}); }
      100% { stroke: ${t.border}; fill: ${t.panelBgSubtle}; }
    }
    @keyframes showDash {
      0%, 48% { opacity: 0.4; }
      65%, 90% { opacity: 1; }
      100% { opacity: 0.4; }
    }
  </style>

  <!-- Window Container -->
  <rect x="8" y="8" width="784" height="344" rx="12" fill="${t.cardBg}" stroke="${t.border}" stroke-width="1" filter="url(#smShadow)"/>

  <!-- Title Bar -->
  <path d="M 8 20 A 12 12 0 0 1 20 8 L 780 8 A 12 12 0 0 1 792 20 L 792 44 L 8 44 Z" fill="${t.titleBarBg}" stroke="${t.border}" stroke-width="1"/>
  <circle cx="28" cy="26" r="5" fill="${t.dotRed}"/>
  <circle cx="44" cy="26" r="5" fill="${t.dotYellow}"/>
  <circle cx="60" cy="26" r="5" fill="${t.dotGreen}"/>
  
  <text x="80" y="30" class="mono" font-size="12" fill="${t.textMuted}">proc://laravel-rbac [PID 1088] — Satvik-4web/laravelapp</text>
  
  <!-- Status Badge BUILT -->
  <rect x="696" y="16" width="82" height="20" rx="10" fill="${isDark ? 'rgba(79, 140, 255, 0.15)' : 'rgba(37, 99, 235, 0.12)'}" stroke="${t.accentBlue}" stroke-width="1"/>
  <circle cx="710" cy="26" r="3.5" fill="${t.accentBlue}"/>
  <text x="742" y="30" class="mono" font-size="10.5" font-weight="700" fill="${t.accentBlue}" text-anchor="middle">BUILT</text>

  <!-- Left Column: Description and Highlights -->
  <g transform="translate(28, 64)">
    <text class="mono" font-size="19" font-weight="700" fill="${t.textPrimary}">Student Management</text>
    <text x="240" y="-2" class="mono" font-size="11" font-weight="600" fill="${t.accentBlue}">"RBAC Core"</text>

    <!-- One-line Description -->
    <text y="28" class="mono" font-size="11" fill="${t.textSecondary}">
      <tspan x="0" dy="0">Laravel REST API with Sanctum bearer-token auth and 5-tier</tspan>
      <tspan x="0" dy="16">role-based access control, coupled with Next.js dashboards.</tspan>
    </text>

    <!-- Key Capabilities List -->
    <g transform="translate(0, 72)">
      <text class="mono" font-size="10.5" fill="${t.accentBlue}">▸</text>
      <text x="16" class="mono" font-size="10.5" fill="${t.textPrimary}">Sanctum bearer-token authentication &amp; revocation</text>

      <text y="20" class="mono" font-size="10.5" fill="${t.accentCyan}">▸</text>
      <text x="16" y="20" class="mono" font-size="10.5" fill="${t.textPrimary}">5 roles: Admin, Principal, HOD, Faculty, Student</text>

      <text y="40" class="mono" font-size="10.5" fill="${t.accentViolet}">▸</text>
      <text x="16" y="40" class="mono" font-size="10.5" fill="${t.textPrimary}">Backend middleware-enforced role dashboard routing</text>

      <text y="60" class="mono" font-size="10.5" fill="${t.accentGreen}">▸</text>
      <text x="16" y="60" class="mono" font-size="10.5" fill="${t.textPrimary}">Full student CRUD API + verified Postman collection</text>
    </g>

    <!-- Tech Tags Row -->
    <g transform="translate(0, 162)">
      <rect width="68" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="34" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">Laravel</text>

      <rect x="74" width="46" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="97" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">PHP</text>

      <rect x="126" width="68" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="160" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">Next.js</text>

      <rect x="200" width="70" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="235" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">Sanctum</text>

      <rect x="276" width="60" height="20" rx="4" fill="${t.tagBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="306" y="14" class="mono" font-size="10" fill="${t.tagText}" text-anchor="middle">SQLite</text>
    </g>

    <!-- Footer CLI Link hint -->
    <g transform="translate(0, 204)">
      <rect width="350" height="26" rx="5" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
      <text x="10" y="17" class="mono" font-size="10" fill="${t.textMuted}">$ gh repo view Satvik-4web/laravelapp</text>
      <text x="340" y="17" class="mono" font-size="10" font-weight="700" fill="${t.accentBlue}" text-anchor="end">SOURCE ↗</text>
    </g>
  </g>

  <!-- Right Column: Micro-Visual (Login Box + Token Packet + 5 Role Chips + Dashboard Tile) -->
  <g transform="translate(404, 58)">
    <rect width="372" height="280" rx="8" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>

    <!-- Header bar -->
    <rect x="12" y="12" width="348" height="24" rx="4" fill="${t.panelBgSubtle}"/>
    <text x="22" y="28" class="mono" font-size="10" font-weight="600" fill="${t.textSecondary}">RBAC TOKEN DISPATCHER</text>
    <text x="350" y="28" class="mono" font-size="9.5" fill="${t.accentBlue}" text-anchor="end">SANCTUM v3</text>

    <!-- Circuit Bus Routing Lines -->
    <path d="M 96 74 L 176 74 L 176 132 L 206 132" fill="none" stroke="${t.border}" stroke-width="1.5" stroke-dasharray="3 3"/>

    <!-- Login Box (Left) -->
    <g transform="translate(14, 50)">
      <rect width="82" height="50" rx="6" fill="${t.panelBgSubtle}" stroke="${t.accentBlue}" stroke-width="1"/>
      <text x="41" y="18" class="mono" font-size="8.5" font-weight="700" fill="${t.textSecondary}" text-anchor="middle">POST /auth</text>
      <text x="41" y="32" class="mono" font-size="8" fill="${t.textMuted}" text-anchor="middle">SANCTUM</text>
      <rect x="12" y="38" width="58" height="6" rx="2" fill="${t.accentBlue}" opacity="0.4"/>
    </g>

    <!-- Traveling Token Packet -->
    <g class="token-packet" transform="translate(68, 74)">
      <circle cx="0" cy="0" r="5" fill="${t.accentCyan}"/>
      <circle cx="0" cy="0" r="8" fill="none" stroke="${t.accentCyan}" opacity="0.6"/>
    </g>

    <!-- 5 Role Chips (Right Stack) -->
    <g transform="translate(208, 44)">
      <!-- Role 1: Admin -->
      <g class="chip-locked" transform="translate(0, 0)">
        <rect width="144" height="22" rx="4" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
        <circle cx="12" cy="11" r="2.5" fill="${t.textMuted}"/>
        <text x="24" y="15" class="mono" font-size="9" fill="${t.textMuted}">01 ADMIN</text>
        <text x="136" y="15" class="mono" font-size="8" fill="${t.accentRed}" text-anchor="end">403</text>
      </g>

      <!-- Role 2: Principal -->
      <g class="chip-locked" transform="translate(0, 26)">
        <rect width="144" height="22" rx="4" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
        <circle cx="12" cy="11" r="2.5" fill="${t.textMuted}"/>
        <text x="24" y="15" class="mono" font-size="9" fill="${t.textMuted}">02 PRINCIPAL</text>
        <text x="136" y="15" class="mono" font-size="8" fill="${t.accentRed}" text-anchor="end">403</text>
      </g>

      <!-- Role 3: HOD -->
      <g class="chip-locked" transform="translate(0, 52)">
        <rect width="144" height="22" rx="4" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
        <circle cx="12" cy="11" r="2.5" fill="${t.textMuted}"/>
        <text x="24" y="15" class="mono" font-size="9" fill="${t.textMuted}">03 HOD</text>
        <text x="136" y="15" class="mono" font-size="8" fill="${t.accentRed}" text-anchor="end">403</text>
      </g>

      <!-- Role 4: FACULTY (TARGET MATCHED) -->
      <g class="chip-faculty" transform="translate(0, 78)">
        <rect width="144" height="24" rx="4" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
        <circle cx="12" cy="12" r="3" fill="${t.accentGreen}"/>
        <text x="24" y="16" class="mono" font-size="9.5" font-weight="700" fill="${t.textPrimary}">04 FACULTY</text>
        <text x="136" y="16" class="mono" font-size="8.5" font-weight="700" fill="${t.accentGreen}" text-anchor="end">AUTH ✓</text>
      </g>

      <!-- Role 5: Student -->
      <g class="chip-locked" transform="translate(0, 106)">
        <rect width="144" height="22" rx="4" fill="${t.panelBgSubtle}" stroke="${t.border}" stroke-width="1"/>
        <circle cx="12" cy="11" r="2.5" fill="${t.textMuted}"/>
        <text x="24" y="15" class="mono" font-size="9" fill="${t.textMuted}">05 STUDENT</text>
        <text x="136" y="15" class="mono" font-size="8" fill="${t.accentRed}" text-anchor="end">403</text>
      </g>
    </g>

    <!-- Activated Dashboard Tile (Bottom) -->
    <g class="dash-active" transform="translate(14, 186)">
      <rect width="344" height="82" rx="6" fill="${t.panelBgSubtle}" stroke="${t.accentCyan}" stroke-width="1"/>
      
      <!-- Dash header -->
      <rect x="0" y="0" width="344" height="22" rx="6" fill="${t.titleBarBg}"/>
      <text x="10" y="15" class="mono" font-size="9" font-weight="700" fill="${t.accentCyan}">FACULTY DASHBOARD · ACCESS GRANTED</text>
      <text x="334" y="15" class="mono" font-size="8.5" font-weight="600" fill="${t.accentGreen}" text-anchor="end">HTTP 200 OK</text>

      <!-- Content rows in dashboard -->
      <text x="10" y="38" class="mono" font-size="8.5" fill="${t.textMuted}">TOKEN:</text>
      <text x="54" y="38" class="mono" font-size="8.5" fill="${t.textSecondary}">1|sanctum_0x7b4a2e... [ACTIVE]</text>

      <!-- Mini UI columns -->
      <g transform="translate(10, 48)">
        <rect width="100" height="24" rx="3" fill="${t.cardBg}" stroke="${t.border}" stroke-width="0.8"/>
        <text x="50" y="16" class="mono" font-size="8" fill="${t.textSecondary}" text-anchor="middle">GRADEBOOK</text>

        <rect x="110" width="104" height="24" rx="3" fill="${t.cardBg}" stroke="${t.border}" stroke-width="0.8"/>
        <text x="162" y="16" class="mono" font-size="8" fill="${t.textSecondary}" text-anchor="middle">ATTENDANCE</text>

        <rect x="224" width="98" height="24" rx="3" fill="${t.cardBg}" stroke="${t.border}" stroke-width="0.8"/>
        <text x="273" y="16" class="mono" font-size="8" fill="${t.textSecondary}" text-anchor="middle">STUDENT CRUD</text>
      </g>
    </g>
  </g>
</svg>`;
}
