import { renderTerminalDefs, renderPaneChrome, renderPrompt } from './shared.mjs';
import { createTerminalLine } from '../scripts/text-to-path.mjs';

export function renderCardWasteManagementSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 640;

  // Description & Readme summary lines
  const summaryLines = [
    [ { text: '# Waste Management System — Oracle PL/SQL', fill: t.accentMint, font: 'bold' } ],
    [ { text: 'Relational database architecture for municipal logistics & billing.', fill: t.fg } ],
    [ { text: '', fill: t.fg } ],
    [ { text: 'KEY CAPABILITIES:', fill: t.accentAmber, font: 'bold' } ],
    [ { text: '• 11 normalized 3NF relational tables with strict foreign integrity', fill: t.fg } ],
    [ { text: '• PL/SQL triggers enforcing vehicle weight & payload safety limits', fill: t.fg } ],
    [ { text: '• Automated billing procedures computed on weight tier & category', fill: t.fg } ],
    [ { text: '• Audit tables capturing schedule modifications & fee updates', fill: t.fg } ],
    [ { text: '', fill: t.fg } ],
    [ { text: 'TECH STACK:', fill: t.accentAmber, font: 'bold' } ],
    [
      { text: '[Oracle SQL] ', fill: t.accentMint },
      { text: '[PL/SQL Triggers] ', fill: t.accentPeriwinkle },
      { text: '[Stored Procedures] ', fill: t.accentAmber }
    ],
    [
      { text: '[Relational 3NF] ', fill: t.fg },
      { text: '[Transaction ACID] ', fill: t.accentMint },
      { text: '[Audit Logging]', fill: t.fgMuted }
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
  const repoPrompt = renderPrompt(50, 570, theme, 'git remote get-url origin # github.com/Satvik-4web/dbms-project', false);

  // TUI Scene Still: Oracle PL/SQL Transaction Flow
  const tuiHeader = createTerminalLine([
    { text: '┌── TUI SQL MONITOR: ORACLE PL/SQL ENGINE ──┐', fill: t.accentPeriwinkle }
  ], { x: 620, y: 185, fontSize: 13 }).svg;

  const tuiLines = [
    [ { text: '│ SQL> EXECUTE RecordCollection(T_04, 520);  │', fill: t.fg } ],
    [ { text: '│ [TRIGGER trg_check_capacity] FIRED        │', fill: t.fgMuted } ],
    [ { text: '│ Current: 4,820kg + 520kg > 5,000kg MAX     │', fill: t.accentAmber } ],
    [ { text: '│ ORA-20001: Truck capacity exceeded         │', fill: t.accentRose, font: 'bold' } ],
    [ { text: '│ TRANSACTION ABORTED ───> [ROLLBACK]        │', fill: t.accentRose, font: 'bold' } ],
    [ { text: '├── RE-DISPATCH LOGISTICS: TRUCK T-08 ───────┤', fill: t.accentPeriwinkle } ],
    [ { text: '│ SQL> EXECUTE RecordCollection(T_08, 520);  │', fill: t.fg } ],
    [ { text: '│ Current: 2,100kg + 520kg = 2,620kg [SAFE]  │', fill: t.accentMint } ],
    [ { text: '│ PL/SQL procedure successfully completed.   │', fill: t.accentMint, font: 'bold' } ],
    [ { text: '│ TRANSACTION COMMITTED ─> [COMMIT 200 OK]   │', fill: t.accentMint, font: 'bold' } ],
    [ { text: '└── AUDIT LOG: TRANSACTION #9402 RECORDED ───┘', fill: t.accentPeriwinkle } ]
  ].map((l, i) => createTerminalLine(l, { x: 620, y: 215 + i * 24, fontSize: 13 }).svg).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Terminal project card for Waste Management System: Oracle PL/SQL relational transaction engine">
  <title>Waste Management System — Terminal Card</title>
  <defs>
    ${renderTerminalDefs(theme)}
  </defs>

  ${renderPaneChrome(W, H, theme, { title: '~/projects/dbms-project', status: '[PL/SQL ACID]' })}

  <!-- Command Prompt -->
  <g transform="translate(0, 0)">
    ${renderPrompt(50, 85, theme, 'cat dbms-project/README.md')}
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
