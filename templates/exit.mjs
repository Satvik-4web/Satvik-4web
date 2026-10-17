import { renderTerminalDefs, renderPaneChrome, renderPrompt } from './shared.mjs';
import { createTerminalLine, createTextPath } from '../scripts/text-to-path.mjs';

export function renderExitSvg(theme, config) {
  const t = theme;
  const W = 1600;
  const H = 340;

  // Echo command prompt
  const echoPrompt = renderPrompt(60, 85, theme, 'echo "BUILD → BREAK → LEARN → REBUILD"', false);

  // Large Motto display line
  const mottoSpans = [
    { text: 'BUILD ', fill: t.accentMint, font: 'bold' },
    { text: '→ ', fill: t.fgMuted, font: 'bold' },
    { text: 'BREAK ', fill: t.accentRose, font: 'bold' },
    { text: '→ ', fill: t.fgMuted, font: 'bold' },
    { text: 'LEARN ', fill: t.accentPeriwinkle, font: 'bold' },
    { text: '→ ', fill: t.fgMuted, font: 'bold' },
    { text: 'REBUILD', fill: t.accentAmber, font: 'bold' }
  ];
  const mottoLine = createTerminalLine(mottoSpans, { x: 60, y: 145, fontSize: 24 });

  // Secondary subtext
  const subtextLine = createTerminalLine([
    { text: '// engineering resilient systems, full-stack tools & intelligent interfaces.', fill: t.fgMuted }
  ], { x: 60, y: 185, fontSize: 13.5 });

  // Active Final Prompt with blinking cursor
  const finalPrompt = renderPrompt(60, 235, theme, '', true);

  // Tmux Bottom Status Bar
  const tmuxLeft = createTerminalLine([
    { text: ' [0] satvik-4web ', fill: t.bg, font: 'bold' }
  ], { x: 20, y: 318, fontSize: 12.5 });

  const tmuxCenter = createTerminalLine([
    { text: ' 1:whoami ', fill: t.fgMuted },
    { text: ' 2:projects ', fill: t.fgMuted },
    { text: ' 3:system ', fill: t.fgMuted },
    { text: ' 4:exit* ', fill: t.accentMint, font: 'bold' }
  ], { x: 680, y: 318, fontSize: 12.5 });

  const tmuxRight = createTerminalLine([
    { text: 'session active · socket: /tmp/tmux-1000/default ', fill: t.accentPeriwinkle },
    { text: '[detached: 0]', fill: t.fgMuted }
  ], { x: 1220, y: 318, fontSize: 12 });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Terminal session exit card displaying developer motto and active prompt">
  <title>Terminal Session — Exit</title>
  <defs>
    ${renderTerminalDefs(theme)}
  </defs>

  ${renderPaneChrome(W, H, theme, { title: '~/exit [session: detached]', status: '[tmux: 4:exit*]' })}

  <!-- Echo Command Prompt -->
  <g transform="translate(0, 0)">
    ${echoPrompt}
  </g>

  <!-- Motto Display -->
  <g>
    ${mottoLine.svg}
    ${subtextLine.svg}
  </g>

  <!-- Divider -->
  <line x1="60" y1="205" x2="${W - 60}" y2="205" stroke="${t.border}" stroke-width="1" stroke-dasharray="3 3"/>

  <!-- Active Prompt -->
  <g>
    ${finalPrompt}
  </g>

  <!-- Tmux Bottom Status Bar -->
  <g transform="translate(0, 292)">
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
