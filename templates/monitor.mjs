import { fontStack } from './colors.mjs';

const defaultLangColors = {
  'Python': '#3572A5',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'C#': '#178600',
  'C++': '#F34B7D',
  'PHP': '#4F5D95',
  'Blade': '#F05340',
  'HTML': '#E34C26',
  'CSS': '#563D7C',
  'ShaderLab': '#222C37',
  'Other': '#8B5CF6'
};

export function renderMonitorSvg(theme, data = {}) {
  const t = theme;
  const isDark = t.name === 'dark';

  const publicRepos = data.publicRepos ?? 17;
  const commits30d = data.commits30d ?? 17;
  const lastPushedRepo = data.lastPushedRepo ?? 'SceneNav-AI';
  const lastPushedTime = data.lastPushedTime ?? 'recent';

  const languages = data.languages && data.languages.length > 0 ? data.languages : [
    { name: 'Python', percent: 30.5, bytes: 866658, color: '#3572A5' },
    { name: 'TypeScript', percent: 28.8, bytes: 817564, color: '#3178C6' },
    { name: 'JavaScript', percent: 16.4, bytes: 465977, color: '#F1E05A' },
    { name: 'C#', percent: 11.6, bytes: 329737, color: '#178600' },
    { name: 'PHP/Blade', percent: 5.4, bytes: 154013, color: '#4F5D95' },
    { name: 'C++', percent: 2.5, bytes: 70372, color: '#F34B7D' },
    { name: 'Other', percent: 4.8, bytes: 136195, color: '#8B5CF6' }
  ];

  // Calculate cumulative widths for the segmented multi-bar
  let cumPercent = 0;
  const segments = languages.map(l => {
    const x = (cumPercent / 100) * 392;
    const w = Math.max((l.percent / 100) * 392, 2);
    cumPercent += l.percent;
    return { ...l, x, w };
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 290" width="100%" height="290">
  <defs>
    <linearGradient id="monAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentBlue}"/>
      <stop offset="50%" stop-color="${t.accentCyan}"/>
      <stop offset="100%" stop-color="${t.accentViolet}"/>
    </linearGradient>
    <filter id="monShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${t.shadow}"/>
    </filter>
  </defs>

  <style>
    .mono { font-family: ${fontStack}; }
    @media (prefers-reduced-motion: no-preference) {
      .bar-fill {
        animation: growBar 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .pulse-dot {
        animation: pulseLight 3s ease-in-out infinite;
      }
    }
    @keyframes growBar {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes pulseLight {
      0%, 100% { opacity: 0.8; }
      50%      { opacity: 1; filter: drop-shadow(0 0 4px ${t.accentGreen}); }
    }
  </style>

  <!-- Window Container -->
  <rect x="8" y="8" width="784" height="274" rx="12" fill="${t.cardBg}" stroke="${t.border}" stroke-width="1" filter="url(#monShadow)"/>

  <!-- Title Bar -->
  <path d="M 8 20 A 12 12 0 0 1 20 8 L 780 8 A 12 12 0 0 1 792 20 L 792 44 L 8 44 Z" fill="${t.titleBarBg}" stroke="${t.border}" stroke-width="1"/>
  <circle cx="28" cy="26" r="5" fill="${t.dotRed}"/>
  <circle cx="44" cy="26" r="5" fill="${t.dotYellow}"/>
  <circle cx="60" cy="26" r="5" fill="${t.dotGreen}"/>
  
  <text x="80" y="30" class="mono" font-size="12" fill="${t.textMuted}">sysmon://telemetry [PID 0001] — github-actions nightly sync</text>
  
  <!-- Right status tag -->
  <g transform="translate(670, 16)">
    <rect width="102" height="20" rx="10" fill="${t.codeBg}" stroke="${t.border}" stroke-width="1"/>
    <circle class="pulse-dot" cx="12" cy="10" r="3" fill="${t.accentGreen}"/>
    <text x="56" y="14" class="mono" font-size="9.5" font-weight="700" fill="${t.accentGreen}" text-anchor="middle">SYNCED</text>
  </g>

  <!-- Left Column: KPI Cards -->
  <g transform="translate(28, 58)">
    <!-- KPI 1: Public Repos -->
    <g transform="translate(0, 0)">
      <rect width="320" height="64" rx="8" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="16" y="24" class="mono" font-size="9.5" fill="${t.textMuted}" letter-spacing="0.5">PUBLIC REPOSITORIES</text>
      <text x="16" y="50" class="mono" font-size="22" font-weight="700" fill="${t.accentCyan}">${publicRepos}</text>
      <text x="70" y="50" class="mono" font-size="10.5" fill="${t.textSecondary}">verified repositories</text>
    </g>

    <!-- KPI 2: Commits in last 30 days -->
    <g transform="translate(0, 72)">
      <rect width="320" height="64" rx="8" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="16" y="24" class="mono" font-size="9.5" fill="${t.textMuted}" letter-spacing="0.5">COMMITS (LAST 30 DAYS)</text>
      <text x="16" y="50" class="mono" font-size="22" font-weight="700" fill="${t.accentGreen}">${commits30d}</text>
      <text x="70" y="50" class="mono" font-size="10.5" fill="${t.textSecondary}">pushed across branches</text>
    </g>

    <!-- KPI 3: Last Pushed Repo -->
    <g transform="translate(0, 144)">
      <rect width="320" height="64" rx="8" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>
      <text x="16" y="24" class="mono" font-size="9.5" fill="${t.textMuted}" letter-spacing="0.5">LATEST PUSHED REPO</text>
      <text x="16" y="50" class="mono" font-size="14" font-weight="700" fill="${t.textPrimary}">${lastPushedRepo}</text>
      <text x="304" y="50" class="mono" font-size="10" fill="${t.accentCyan}" text-anchor="end">${lastPushedTime}</text>
    </g>
  </g>

  <!-- Right Column: Languages by Bytes -->
  <g transform="translate(366, 58)">
    <rect width="406" height="208" rx="8" fill="${t.panelBg}" stroke="${t.border}" stroke-width="1"/>

    <!-- Panel Header -->
    <text x="16" y="24" class="mono" font-size="10" font-weight="700" fill="${t.textPrimary}" letter-spacing="0.5">LANGUAGES BY BYTES</text>
    <text x="390" y="24" class="mono" font-size="9" fill="${t.textMuted}" text-anchor="end">GITHUB API SCAN</text>

    <!-- Segmented Multi-Bar -->
    <g transform="translate(14, 34)">
      <rect width="378" height="10" rx="5" fill="${t.panelBgSubtle}"/>
      ${segments.map(s => `
      <rect x="${(s.x * 378 / 392).toFixed(1)}" y="0" width="${(s.w * 378 / 392).toFixed(1)}" height="10" fill="${s.color}" rx="2"/>
      `).join('')}
    </g>

    <!-- Language Breakdown Rows -->
    <g transform="translate(14, 60)">
      ${languages.slice(0, 6).map((lang, idx) => {
        const y = idx * 22;
        const barWidth = Math.max((lang.percent / 100) * 160, 4);
        const kb = (lang.bytes / 1024).toFixed(0);
        return `
      <!-- Row ${idx}: ${lang.name} -->
      <g transform="translate(0, ${y})">
        <circle cx="6" cy="11" r="3.5" fill="${lang.color}"/>
        <text x="18" y="14" class="mono" font-size="10" font-weight="600" fill="${t.textPrimary}">${lang.name}</text>
        
        <!-- Individual mini bar -->
        <rect x="110" y="6" width="160" height="7" rx="3.5" fill="${t.panelBgSubtle}"/>
        <rect class="bar-fill" style="transform-origin: 110px 0px;" x="110" y="6" width="${barWidth.toFixed(1)}" height="7" rx="3.5" fill="${lang.color}"/>
        
        <text x="282" y="14" class="mono" font-size="9" fill="${t.textMuted}">${kb} KB</text>
        <text x="374" y="14" class="mono" font-size="10" font-weight="700" fill="${t.accentCyan}" text-anchor="end">${lang.percent}%</text>
      </g>`;
      }).join('')}
    </g>
  </g>
</svg>`;
}
