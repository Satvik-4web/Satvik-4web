import { renderTerminalDefs, renderPaneChrome, renderPrompt } from './shared.mjs';
import { createTerminalLine } from '../scripts/text-to-path.mjs';

export function renderCardStudentManagementSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 640;

  // Description & Readme summary lines
  const summaryLines = [
    [ { text: '# Student Management System — Multi-Tier RBAC', fill: t.accentMint, font: 'bold' } ],
    [ { text: 'Decoupled role-based institutional administration platform.', fill: t.fg } ],
    [ { text: '', fill: t.fg } ],
    [ { text: 'KEY CAPABILITIES:', fill: t.accentAmber, font: 'bold' } ],
    [ { text: '• 5 institutional tiers: Admin, Principal, HOD, Faculty, Student', fill: t.fg } ],
    [ { text: '• Controller middleware enforcing per-route RBAC gates', fill: t.fg } ],
    [ { text: '• Sanctum bearer token auth with instant revocation on pwd reset', fill: t.fg } ],
    [ { text: '• Full student records CRUD API & verified Postman test suites', fill: t.fg } ],
    [ { text: '', fill: t.fg } ],
    [ { text: 'TECH STACK:', fill: t.accentAmber, font: 'bold' } ],
    [
      { text: '[Laravel] ', fill: t.accentMint },
      { text: '[PHP] ', fill: t.accentPeriwinkle },
      { text: '[SQLite] ', fill: t.fg },
      { text: '[Sanctum Auth]', fill: t.accentAmber }
    ],
    [
      { text: '[Next.js 14] ', fill: t.accentMint },
      { text: '[React] ', fill: t.accentPeriwinkle },
      { text: '[TypeScript] ', fill: t.fg },
      { text: '[Tailwind CSS]', fill: t.fgMuted }
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
  const repoPrompt = renderPrompt(50, 570, theme, 'git remote get-url origin # github.com/Satvik-4web/laravelapp', false);

  // TUI Scene Still: 5-Role RBAC Dispatcher
  const tuiHeader = createTerminalLine([
    { text: '┌── TUI RBAC DISPATCHER: SANCTUM AUTH ─────┐', fill: t.accentPeriwinkle }
  ], { x: 620, y: 185, fontSize: 13 }).svg;

  const tuiRoles = [
    [ { text: '│ [01] ADMIN     │ token ····> ✗ 403 (locked)│', fill: t.fgMuted } ],
    [ { text: '│ [02] PRINCIPAL │ token ····> ✗ 403 (locked)│', fill: t.fgMuted } ],
    [ { text: '│ [03] HOD       │ token ····> ✗ 403 (locked)│', fill: t.fgMuted } ],
    [ { text: '│ [04] FACULTY   │ token ====> ✓ 200 GRANTED │', fill: t.accentMint, font: 'bold' } ],
    [ { text: '│ [05] STUDENT   │ token ····> ✗ 403 (locked)│', fill: t.fgMuted } ]
  ].map((l, i) => createTerminalLine(l, { x: 620, y: 215 + i * 26, fontSize: 13 }).svg).join('\n');

  const tuiMiddleware = createTerminalLine([
    { text: '├── MIDDLEWARE & SESSION INTEGRITY ─────────┤', fill: t.accentPeriwinkle }
  ], { x: 620, y: 350, fontSize: 13 }).svg;

  const tuiStatusRow1 = createTerminalLine([
    { text: '│ Active Bearer:  ', fill: t.fg },
    { text: '1|sanctum_token_fac_9921', fill: t.accentPeriwinkle }
  ], { x: 620, y: 380, fontSize: 13 }).svg;

  const tuiStatusRow2 = createTerminalLine([
    { text: '│ Gate Enforced:  ', fill: t.fg },
    { text: 'RoleMiddleware::class [PASS]', fill: t.accentMint, font: 'bold' }
  ], { x: 620, y: 405, fontSize: 13 }).svg;

  const tuiStatusRow3 = createTerminalLine([
    { text: '│ Revoke Trigger: ', fill: t.fg },
    { text: 'Password reset -> tokens:revoke', fill: t.accentAmber }
  ], { x: 620, y: 430, fontSize: 13 }).svg;

  const tuiFooter = createTerminalLine([
    { text: '└── POSTMAN SUITE: ALL CONTRACTS PASSING ───┘', fill: t.accentPeriwinkle }
  ], { x: 620, y: 455, fontSize: 13 }).svg;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Terminal project card for Student Management System: 5-role Laravel Sanctum authentication architecture">
  <title>Student Management System — Terminal Card</title>
  <defs>
    ${renderTerminalDefs(theme)}
  </defs>

  ${renderPaneChrome(W, H, theme, { title: '~/projects/student-management', status: '[RBAC ACTIVE]' })}

  <!-- Command Prompt -->
  <g transform="translate(0, 0)">
    ${renderPrompt(50, 85, theme, 'cat student-management/README.md')}
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
    ${tuiRoles}
    ${tuiMiddleware}
    ${tuiStatusRow1}
    ${tuiStatusRow2}
    ${tuiStatusRow3}
    ${tuiFooter}
  </g>

  <!-- Bottom Divider Line -->
  <line x1="50" y1="535" x2="${W - 50}" y2="535" stroke="${t.border}" stroke-width="1"/>

  <!-- Second Prompt: Git Remote -->
  <g>
    ${repoPrompt}
  </g>
</svg>`;
}
