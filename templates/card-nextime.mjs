import { renderTerminalDefs, renderPaneChrome, renderPrompt } from './shared.mjs';
import { createTerminalLine, createTextPath } from '../scripts/text-to-path.mjs';

export function renderCardNextimeSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 640;

  // Description & Readme summary lines
  const summaryLines = [
    [ { text: '# NexTime — Student Operating System', fill: t.accentMint, font: 'bold' } ],
    [ { text: 'The timetable is the core, orchestrating every academic action.', fill: t.fg } ],
    [ { text: '', fill: t.fg } ],
    [ { text: 'KEY CAPABILITIES:', fill: t.accentAmber, font: 'bold' } ],
    [ { text: '• Live current/next class and free-slot detection', fill: t.fg } ],
    [ { text: '• Multi-tier attendance tracker (<75% crit, 75-80% warn, >80% safe)', fill: t.fg } ],
    [ { text: '• 45/10/20 Pomodoro focus mode & CGPA forecasting', fill: t.fg } ],
    [ { text: '• Realtime friend schedule viewer & student community', fill: t.fg } ],
    [ { text: '• Installable Progressive Web App (PWA)', fill: t.fgMuted } ],
    [ { text: '', fill: t.fg } ],
    [ { text: 'TECH STACK:', fill: t.accentAmber, font: 'bold' } ],
    [
      { text: '[Next.js 14] ', fill: t.accentMint },
      { text: '[TypeScript] ', fill: t.accentPeriwinkle },
      { text: '[Tailwind] ', fill: t.fg },
      { text: '[Zustand]', fill: t.fgMuted }
    ],
    [
      { text: '[Supabase Realtime] ', fill: t.accentMint },
      { text: '[Upstash Redis] ', fill: t.accentAmber },
      { text: '[Vercel]', fill: t.accentPeriwinkle }
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

  // Secondary command prompt for demo URL
  const demoPrompt = renderPrompt(50, 570, theme, 'open https://nextime-omega.vercel.app', false);

  // TUI Scene Still: Timetable + gauges
  const tuiHeader = createTerminalLine([
    { text: '┌── TUI MONITOR: NEXTIME TIMETABLE ────────┐', fill: t.accentPeriwinkle }
  ], { x: 620, y: 185, fontSize: 13 }).svg;

  const tuiSlots = [
    [ { text: '│ 09:00 │ MATH-201    │ DONE       [safe]  │', fill: t.fgMuted } ],
    [ { text: '│ 10:30 │ CS-304 OS   │ NOW ▌      [LIVE]  │', fill: t.accentMint, font: 'bold' } ],
    [ { text: '│ 12:00 │ FREE SLOT   │ NEXT       [study] │', fill: t.accentAmber } ],
    [ { text: '│ 13:30 │ AI LAB      │ SCHEDULED  [lab]   │', fill: t.fgMuted } ]
  ].map((l, i) => createTerminalLine(l, { x: 620, y: 215 + i * 26, fontSize: 13 }).svg).join('\n');

  const tuiGaugeLabel = createTerminalLine([
    { text: '├── ATTENDANCE & FOCUS ─────────────────────┤', fill: t.accentPeriwinkle }
  ], { x: 620, y: 325, fontSize: 13 }).svg;

  const tuiGaugeRow1 = createTerminalLine([
    { text: '│ Attendance: ', fill: t.fg },
    { text: '[████████░░] 86.4% ', fill: t.accentMint, font: 'bold' },
    { text: '(SAFE TIER)│', fill: t.accentMint }
  ], { x: 620, y: 355, fontSize: 13 }).svg;

  const tuiGaugeRow2 = createTerminalLine([
    { text: '│ Pomodoro:   ', fill: t.fg },
    { text: '[45:00 -> 32:14]   ', fill: t.accentAmber, font: 'bold' },
    { text: '● FOCUS ON │', fill: t.accentRose }
  ], { x: 620, y: 385, fontSize: 13 }).svg;

  const tuiGaugeRow3 = createTerminalLine([
    { text: '│ Community:  ', fill: t.fg },
    { text: '14 peers online · Supabase RT│', fill: t.fgMuted }
  ], { x: 620, y: 415, fontSize: 13 }).svg;

  const tuiFooter = createTerminalLine([
    { text: '└── STATUS: ACTIVE CLASS DISPATCHED ────────┘', fill: t.accentPeriwinkle }
  ], { x: 620, y: 445, fontSize: 13 }).svg;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Terminal project card for NexTime: student operating system with live timetable">
  <title>NexTime — Terminal Card</title>
  <defs>
    ${renderTerminalDefs(theme)}
  </defs>

  <style>
    @media (prefers-reduced-motion: no-preference) {
      .marker-pulse {
        animation: markerBlink 1.4s ease-in-out infinite;
      }
      .active-border-pulse {
        animation: borderPulse 4s ease-in-out infinite alternate;
      }
    }
    @keyframes markerBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.2; }
    }
    @keyframes borderPulse {
      0% { stroke-opacity: 0.4; }
      100% { stroke-opacity: 0.9; }
    }
  </style>

  ${renderPaneChrome(W, H, theme, { title: '~/projects/nextime', status: '[LIVE RELEASE]' })}

  <!-- Primary Command Prompt -->
  <g transform="translate(0, 0)">
    ${renderPrompt(50, 85, theme, 'cat nextime/README.md')}
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
    <rect x="605" y="150" width="545" height="320" rx="6" fill="${t.surfaceSubtle}" stroke="${t.border}" stroke-width="1" class="active-border-pulse"/>
    ${tuiHeader}
    ${tuiSlots}
    ${tuiGaugeLabel}
    ${tuiGaugeRow1}
    ${tuiGaugeRow2}
    ${tuiGaugeRow3}
    ${tuiFooter}
  </g>

  <!-- Bottom Divider Line -->
  <line x1="50" y1="535" x2="${W - 50}" y2="535" stroke="${t.border}" stroke-width="1"/>

  <!-- Second Prompt: Open Live Demo -->
  <g>
    ${demoPrompt}
  </g>
</svg>`;
}
