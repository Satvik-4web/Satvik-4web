import { renderTerminalDefs, renderPaneChrome, renderPrompt } from './shared.mjs';
import { createTerminalLine } from '../scripts/text-to-path.mjs';

export function renderCardCampusVerseSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 640;

  // Description & Readme summary lines
  const summaryLines = [
    [ { text: '# CampusVerse — Spatial Indoor Navigation', fill: t.accentMint, font: 'bold' } ],
    [ { text: 'Augmented reality wayfinding & interactive kiosk architecture.', fill: t.fg } ],
    [ { text: '', fill: t.fg } ],
    [ { text: 'KEY CAPABILITIES:', fill: t.accentAmber, font: 'bold' } ],
    [ { text: '• Multi-floor indoor campus wayfinding with topological graphs', fill: t.fg } ],
    [ { text: '• AR visual anchoring with floating waypoint reticles & vectors', fill: t.fg } ],
    [ { text: '• Seamless kiosk-to-mobile route transfer via synchronized QR', fill: t.fg } ],
    [ { text: '• A* shortest-path solver computing accessible elevation routes', fill: t.fg } ],
    [ { text: '', fill: t.fg } ],
    [ { text: 'TECH STACK:', fill: t.accentAmber, font: 'bold' } ],
    [
      { text: '[AR / Spatial] ', fill: t.accentMint },
      { text: '[A* Graph Engine] ', fill: t.accentPeriwinkle },
      { text: '[Three.js / WebGL] ', fill: t.accentAmber }
    ],
    [
      { text: '[TypeScript] ', fill: t.fg },
      { text: '[Tailwind CSS] ', fill: t.accentMint },
      { text: '[Interactive Kiosk]', fill: t.fgMuted }
    ]
  ];

  const summarySvg = summaryLines.map((line, idx) => {
    if (line.length === 1 && line[0].text === '') return '';
    const rendered = createTerminalLine(line, {
      x: 50,
      y: 185 + idx * 24,
      fontSize: 13
    });
    return rendered.svg;
  }).join('\n');

  // Secondary command prompt for Repo URL
  const repoPrompt = renderPrompt(50, 570, theme, 'git remote get-url origin # github.com/Satvik-4web/campus-verse', false);

  // TUI Scene Still: AR Spatial Reticle & Navigation
  const tuiHeader = createTerminalLine([
    { text: '┌── TUI KIOSK TERMINAL: SPATIAL WAYFINDING ─┐', fill: t.accentPeriwinkle }
  ], { x: 620, y: 185, fontSize: 13 }).svg;

  const tuiLines = [
    [ { text: '│ TARGET: BLOCK-C · ROOM 302 (OS LAB)       │', fill: t.fg, font: 'bold' } ],
    [ { text: '│ DISTANCE: 68 METERS │ ELEVATION: +1 FLOOR │', fill: t.accentAmber } ],
    [ { text: '│ ┌────────── AR SPATIAL VIEW ────────────┐ │', fill: t.fgMuted } ],
    [ { text: '│ │   ▲ [WAYPOINT: STAIRWELL B]           │ │', fill: t.accentMint } ],
    [ { text: '│ │   │                                   │ │', fill: t.fgMuted } ],
    [ { text: '│ │  [+] ────> ┌── AR RETICLE ──┐         │ │', fill: t.accentPeriwinkle } ],
    [ { text: '│ │            │  ● TRACKING   │         │ │', fill: t.accentMint, font: 'bold' } ],
    [ { text: '│ │            └────────────────┘ ──> [R] │ │', fill: t.accentPeriwinkle } ],
    [ { text: '│ └───────────────────────────────────────┘ │', fill: t.fgMuted } ],
    [ { text: '│ KIOSK HANDOFF: QR TOKEN [ACTIVE_SESSION]  │', fill: t.fg } ],
    [ { text: '│ SOLVER: A* GRAPH MATRIX (68ms LATENCY)    │', fill: t.accentMint } ],
    [ { text: '└── STATUS: SPATIAL ANCHOR 302 ACQUIRED ────┘', fill: t.accentPeriwinkle } ]
  ].map((l, i) => createTerminalLine(l, { x: 620, y: 215 + i * 22, fontSize: 12.5 }).svg).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Terminal project card for CampusVerse: AR spatial indoor wayfinding and kiosk navigation">
  <title>CampusVerse — Terminal Card</title>
  <defs>
    ${renderTerminalDefs(theme)}
  </defs>

  ${renderPaneChrome(W, H, theme, { title: '~/projects/campus-verse', status: '[AR ENGINE]' })}

  <!-- Command Prompt -->
  <g transform="translate(0, 0)">
    ${renderPrompt(50, 85, theme, 'cat campus-verse/README.md')}
  </g>

  <!-- Left Column: README output -->
  <g>
    ${summarySvg}
  </g>

  <!-- Vertical Pane Divider -->
  <line x1="580" y1="120" x2="580" y2="520" stroke="${t.border}" stroke-width="1" stroke-dasharray="3 3"/>

  <!-- Right Column: TUI Scene Still -->
  <g transform="translate(0, 0)">
    <!-- TUI Box background container -->
    <rect x="605" y="150" width="545" height="330" rx="6" fill="${t.surfaceSubtle}" stroke="${t.border}" stroke-width="1"/>
    ${tuiHeader}
    ${tuiLines}
  </g>

  <!-- Bottom Divider Line -->
  <line x1="50" y1="535" x2="${W - 50}" y2="535" stroke="${t.border}" stroke-width="1"/>

  <!-- Second Prompt: Git Remote -->
  <g>
    ${repoPrompt}
  </g>
</svg>`;
}
