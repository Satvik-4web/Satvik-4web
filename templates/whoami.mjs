import { renderTerminalDefs, renderPaneChrome, renderPrompt } from './shared.mjs';
import { createTerminalLine, createTextPath } from '../scripts/text-to-path.mjs';

export function renderWhoamiSvg(theme, config) {
  const t = theme;
  const W = 1600;
  const H = 760;

  // ASCII Banner lines for SATVIK
  const bannerLines = [
    ' ███████╗ █████╗ ████████╗██╗   ██╗██╗██╗  ██╗',
    ' ██╔════╝██╔══██╗╚══██╔══╝██║   ██║██║██║ ██╔╝',
    ' ███████╗███████║   ██║   ██║   ██║██║█████╔╝ ',
    ' ╚════██║██╔══██║   ██║   ╚██╗ ██╔╝██║██╔═██╗',
    ' ███████║██║  ██║   ██║    ╚████╔╝ ██║██║  ██╗',
    ' ╚══════╝╚═╝  ╚═╝   ╚═╝     ╚═══╝  ╚═╝╚═╝  ╚═╝'
  ];

  const bannerSvg = bannerLines.map((line, idx) => {
    const p = createTextPath(line, {
      font: 'bold',
      fontSize: 22,
      x: 70,
      y: 190 + idx * 26,
      fill: 'url(#termGradient)'
    });
    return p.svg;
  }).join('\n');

  // Left side extra specs
  const leftSpecs = [
    [ { text: 'OS: ', fill: t.accentMint, font: 'bold' }, { text: 'Satvik OS (x86_64 Linux)', fill: t.fg } ],
    [ { text: 'Host: ', fill: t.accentMint, font: 'bold' }, { text: 'Thapar Institute (TIET), Patiala', fill: t.fg } ],
    [ { text: 'Kernel: ', fill: t.accentMint, font: 'bold' }, { text: '6.8.0-tiet-generic', fill: t.fgMuted } ],
    [ { text: 'Uptime: ', fill: t.accentMint, font: 'bold' }, { text: 'Since Aug 2024 (Class of 2028)', fill: t.fg } ],
    [ { text: 'Shell: ', fill: t.accentMint, font: 'bold' }, { text: 'zsh 5.9 + tmux 3.4', fill: t.accentPeriwinkle } ],
    [ { text: 'WM / DE: ', fill: t.accentMint, font: 'bold' }, { text: 'Hyprland (tiling rice)', fill: t.fgMuted } ],
    [ { text: 'Terminal: ', fill: t.accentMint, font: 'bold' }, { text: 'Alacritty / JetBrains Mono', fill: t.fgMuted } ]
  ].map((line, idx) => {
    return createTerminalLine(line, { x: 70, y: 390 + idx * 24, fontSize: 13 }).svg;
  }).join('\n');

  // Right side neofetch block lines
  const neofetchLines = [
    [ { text: 'satvik', fill: t.accentMint, font: 'bold' }, { text: '@', fill: t.fgMuted }, { text: 'tiet-ce', fill: t.accentPeriwinkle, font: 'bold' } ],
    [ { text: '----------------------------------------', fill: t.border } ],
    [ { text: 'name     ', fill: t.accentMint, font: 'bold' }, { text: 'Satvik (Satvik-4web)', fill: t.fg } ],
    [ { text: 'uni      ', fill: t.accentMint, font: 'bold' }, { text: 'Thapar Institute (TIET), Patiala', fill: t.fg } ],
    [ { text: 'degree   ', fill: t.accentMint, font: 'bold' }, { text: 'Computer Engineering, 2028', fill: t.accentAmber } ],
    [ { text: 'role     ', fill: t.accentMint, font: 'bold' }, { text: 'Co-founder & CTO, Dev Agency', fill: t.fg } ],
    [ { text: 'building ', fill: t.accentMint, font: 'bold' }, { text: 'Full-stack resilient web products', fill: t.fg } ],
    [ { text: 'learning ', fill: t.accentMint, font: 'bold' }, { text: 'LLM APIs, RAG, vector search', fill: t.accentPeriwinkle } ],
    [ { text: 'stack    ', fill: t.accentMint, font: 'bold' }, { text: 'Next.js, TypeScript, Supabase, Python', fill: t.fgMuted } ],
    [ { text: 'motto    ', fill: t.accentMint, font: 'bold' }, { text: 'BUILD → BREAK → LEARN → REBUILD', fill: t.accentAmber, font: 'bold' } ]
  ];

  const rightLinesSvg = neofetchLines.map((line, idx) => {
    const rendered = createTerminalLine(line, { x: 800, y: 190 + idx * 30, fontSize: 14.5 });
    return `<g class="type-line" style="animation-delay: ${0.15 + idx * 0.18}s;">${rendered.svg}</g>`;
  }).join('\n');

  // Neofetch 8 Color Blocks
  const swatches = [
    t.bg, t.surfaceSubtle, t.accentMint, t.accentAmber,
    t.accentRose, t.accentPeriwinkle, t.fgMuted, t.fg
  ];
  const swatchSvg = swatches.map((c, i) => `
    <rect x="${800 + i * 44}" y="525" width="36" height="18" rx="3" fill="${c}" stroke="${t.border}" stroke-width="0.75"/>
  `).join('');

  // Tmux Status Bar components
  const tmuxLeft = createTerminalLine([
    { text: ' [0] satvik-4web ', fill: t.bg, font: 'bold' }
  ], { x: 20, y: 738, fontSize: 12.5 });

  const tmuxCenter = createTerminalLine([
    { text: ' 1:whoami* ', fill: t.accentMint, font: 'bold' },
    { text: ' 2:projects ', fill: t.fgMuted },
    { text: ' 3:system ', fill: t.fgMuted },
    { text: ' 4:log ', fill: t.fgMuted }
  ], { x: 680, y: 738, fontSize: 12.5 });

  const tmuxRight = createTerminalLine([
    { text: 'TIET · Patiala · 2028 ', fill: t.accentPeriwinkle, font: 'bold' },
    { text: '[24.04 LTS]', fill: t.fgMuted }
  ], { x: 1360, y: 738, fontSize: 12 });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Terminal session: whoami, a neofetch-style summary of Satvik">
  <title>Satvik Terminal — whoami</title>
  <defs>
    ${renderTerminalDefs(theme)}
  </defs>

  <style>
    @media (prefers-reduced-motion: no-preference) {
      .type-line {
        animation: typeReveal 16s ease-in-out infinite both;
      }
      .active-border-glow {
        animation: pulseGlow ${config.motion.glowPulse} ease-in-out infinite alternate;
      }
    }
    @keyframes typeReveal {
      0%   { opacity: 0; transform: translateX(-4px); }
      3%   { opacity: 1; transform: translateX(0); }
      85%  { opacity: 1; transform: translateX(0); }
      92%  { opacity: 0; }
      100% { opacity: 0; }
    }
    @keyframes pulseGlow {
      0%   { stroke-opacity: 0.3; }
      100% { stroke-opacity: 0.8; }
    }
  </style>

  ${renderPaneChrome(W, H, theme, { title: '~/whoami [session: main]', status: '[tmux: 1:whoami*]' })}

  <!-- Top Prompt -->
  <g transform="translate(0, 0)">
    ${renderPrompt(70, 95, theme, 'whoami')}
  </g>

  <!-- Left Column: Wordmark & Machine Info -->
  <g>
    <!-- ASCII Figlet Wordmark -->
    ${bannerSvg}

    <!-- Divider Line -->
    <line x1="70" y1="365" x2="720" y2="365" stroke="${t.border}" stroke-width="1" stroke-dasharray="4 4"/>

    <!-- Left System Specs -->
    ${leftSpecs}
  </g>

  <!-- Vertical Pane Splitter -->
  <line x1="760" y1="130" x2="760" y2="680" stroke="${t.border}" stroke-width="1"/>

  <!-- Right Column: Neofetch Specs Block -->
  <g>
    ${rightLinesSvg}
    <!-- Color Palette Row -->
    ${swatchSvg}
  </g>

  <!-- Tmux Bottom Status Bar -->
  <g transform="translate(0, 712)">
    <rect x="0" y="0" width="${W}" height="48" rx="0" fill="${t.statusBarBg}"/>
    <line x1="0" y1="0" x2="${W}" y2="0" stroke="${t.border}" stroke-width="1"/>
    
    <!-- Left badge -->
    <rect x="15" y="10" width="135" height="28" rx="3" fill="${t.accentMint}"/>
    ${tmuxLeft.svg}

    <!-- Center Window Tabs -->
    ${tmuxCenter.svg}

    <!-- Right Status Info -->
    ${tmuxRight.svg}
  </g>
</svg>`;
}
