import { renderTerminalDefs, renderPaneChrome, renderPrompt } from './shared.mjs';
import { createTerminalLine } from '../scripts/text-to-path.mjs';

export const DEFAULT_COMMITS = [
  {
    graph: '*   ',
    graphColor: 'accentMint',
    hash: '3f8a12c',
    decorations: '(HEAD -> master, origin/master)',
    message: 'feat: implement interactive terminal system & htop monitor',
    time: '2 hours ago'
  },
  {
    graph: '|\\  ',
    graphColor: 'accentPeriwinkle',
    hash: '94a1b02',
    decorations: '(feature/student-mgmt)',
    message: 'docs: specify multi-role RBAC gates & Sanctum auth flow',
    time: '1 day ago'
  },
  {
    graph: '| * ',
    graphColor: 'accentPeriwinkle',
    hash: '77e4d81',
    decorations: '',
    message: 'feat(nextime): live current-class detection & attendance rings',
    time: '3 days ago'
  },
  {
    graph: '* | ',
    graphColor: 'accentAmber',
    hash: '5c2b09a',
    decorations: '',
    message: 'fix(dbms): enforce transaction rollback on vehicle capacity check',
    time: '5 days ago'
  },
  {
    graph: '|/  ',
    graphColor: 'accentAmber',
    hash: 'b83021f',
    decorations: '',
    message: 'refactor(spatial): integrate indoor waypoint anchor mesh & A* pathing',
    time: '1 week ago'
  },
  {
    graph: '*   ',
    graphColor: 'accentMint',
    hash: 'e019a4d',
    decorations: '',
    message: 'feat(banknote): benchmark KNN against decision tree classifiers',
    time: '2 weeks ago'
  },
  {
    graph: '*   ',
    graphColor: 'accentMint',
    hash: '1a9f4c3',
    decorations: '',
    message: 'ci: add nightly profile telemetry & SVG build pipeline',
    time: '3 weeks ago'
  },
  {
    graph: '*   ',
    graphColor: 'accentMint',
    hash: '42c810b',
    decorations: '',
    message: 'chore: initial workstation configuration & dotfiles',
    time: '1 month ago'
  }
];

export function renderGitlogSvg(theme, config, commits = DEFAULT_COMMITS) {
  const t = theme;
  const W = 1200;
  const H = 480;

  const commitList = (Array.isArray(commits) && commits.length > 0) ? commits.slice(0, 8) : DEFAULT_COMMITS;

  const rowsSvg = commitList.map((item, idx) => {
    const graphColor = t[item.graphColor] || t.accentMint;
    const spans = [
      { text: item.graph, fill: graphColor, font: 'bold' },
      { text: `${item.hash} `, fill: t.accentAmber, font: 'bold' }
    ];

    if (item.decorations) {
      spans.push({ text: `${item.decorations} `, fill: t.accentMint, font: 'bold' });
    }

    spans.push({ text: `${item.message} `, fill: t.fg });
    spans.push({ text: `(${item.time})`, fill: t.fgMuted });

    const rendered = createTerminalLine(spans, {
      x: 50,
      y: 130 + idx * 36,
      fontSize: 12.5
    });

    return rendered.svg;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Terminal pane: git log graph showing recent commits and branches">
  <title>Git Log — Graph View</title>
  <defs>
    ${renderTerminalDefs(theme)}
  </defs>

  ${renderPaneChrome(W, H, theme, { title: '~/projects/Satvik-4web', status: '[git log]' })}

  <!-- Command Prompt -->
  <g transform="translate(0, 0)">
    ${renderPrompt(50, 75, theme, 'git log --graph --oneline --decorate -n 8', false)}
  </g>

  <!-- Commit Graph Lines -->
  <g>
    ${rowsSvg}
  </g>

  <!-- Subtle Bottom Status -->
  <line x1="50" y1="435" x2="${W - 50}" y2="435" stroke="${t.border}" stroke-width="1"/>
  ${createTerminalLine([
    { text: 'satvik@tiet', fill: t.accentPeriwinkle, font: 'bold' },
    { text: ':~/projects$ ', fill: t.fgMuted },
    { text: 'press q to quit, enter for more', fill: t.fgMuted }
  ], { x: 50, y: 455, fontSize: 11 }).svg}
</svg>`;
}
