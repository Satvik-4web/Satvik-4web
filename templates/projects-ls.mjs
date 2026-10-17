import { renderTerminalDefs, renderPaneChrome, renderPrompt } from './shared.mjs';
import { createTerminalLine } from '../scripts/text-to-path.mjs';

export function renderProjectsLsSvg(theme, config) {
  const t = theme;
  const W = 1600;
  const H = 340;

  const rows = [
    [
      { text: 'total 5 projects (directories)', fill: t.fgMuted }
    ],
    [
      { text: 'drwxr-xr-x  12 satvik staff  384  ', fill: t.fgMuted },
      { text: 'Nextime/', fill: t.accentMint, font: 'bold' },
      { text: '                         ', fill: t.fgMuted },
      { text: '[LIVE APPLICATION · nextime-omega.vercel.app]', fill: t.accentAmber, font: 'bold' }
    ],
    [
      { text: 'drwxr-xr-x  10 satvik staff  320  ', fill: t.fgMuted },
      { text: 'laravelapp/', fill: t.accentPeriwinkle, font: 'bold' },
      { text: '                      ', fill: t.fgMuted },
      { text: '[5-ROLE RBAC · SANCTUM AUTH · LARAVEL + NEXT.JS]', fill: t.fgMuted }
    ],
    [
      { text: 'drwxr-xr-x   9 satvik staff  288  ', fill: t.fgMuted },
      { text: 'dbms-project/', fill: t.accentPeriwinkle, font: 'bold' },
      { text: '                    ', fill: t.fgMuted },
      { text: '[ORACLE 3NF/BCNF · PL/SQL TRIGGERS · ACID TRANS]', fill: t.fgMuted }
    ],
    [
      { text: 'drwxr-xr-x   7 satvik staff  224  ', fill: t.fgMuted },
      { text: 'campus-verse/', fill: t.accentPeriwinkle, font: 'bold' },
      { text: '                    ', fill: t.fgMuted },
      { text: '[AR/VR DIGITAL KIOSK · TIET ELC GRANT FUNDED]', fill: t.fgMuted }
    ],
    [
      { text: 'drwxr-xr-x   8 satvik staff  256  ', fill: t.fgMuted },
      { text: 'banknote-authentication-machine-learning/', fill: t.accentPeriwinkle, font: 'bold' },
      { text: '  ', fill: t.fgMuted },
      { text: '[ML CLASSIFIER COMPARISON · SCIKIT-LEARN]', fill: t.fgMuted }
    ]
  ];

  const rowsSvg = rows.map((line, idx) => {
    const rendered = createTerminalLine(line, {
      x: 70,
      y: 135 + idx * 28,
      fontSize: 13.5
    });
    return rendered.svg;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Terminal listing projects: ls -la ~/projects">
  <title>Terminal — ls -la ~/projects</title>
  <defs>
    ${renderTerminalDefs(theme)}
  </defs>

  ${renderPaneChrome(W, H, theme, { title: '~/projects [ls -la]', status: '[tmux: 2:projects]' })}

  <!-- Top Command Prompt -->
  <g transform="translate(0, 0)">
    ${renderPrompt(70, 85, theme, 'ls -la ~/projects')}
  </g>

  <!-- Output rows -->
  <g>
    ${rowsSvg}
  </g>
</svg>`;
}
