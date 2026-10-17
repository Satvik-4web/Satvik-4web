import { renderTerminalDefs, renderPaneChrome, renderPrompt } from './shared.mjs';
import { createTerminalLine } from '../scripts/text-to-path.mjs';

export function renderCardBanknoteSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 640;

  // Description & Readme summary lines
  const summaryLines = [
    [ { text: '# Banknote Authentication — ML Benchmark', fill: t.accentMint, font: 'bold' } ],
    [ { text: 'Machine learning classification on UCI banknote wavelet features.', fill: t.fg } ],
    [ { text: '', fill: t.fg } ],
    [ { text: 'KEY CAPABILITIES:', fill: t.accentAmber, font: 'bold' } ],
    [ { text: '• Supervised benchmark: Logistic Reg, KNN, SVM, Decision Tree', fill: t.fg } ],
    [ { text: '• 4 wavelet transform attributes: variance, skewness, curtosis, entropy', fill: t.fg } ],
    [ { text: '• Full confusion matrix, ROC-AUC, and precision-recall trade-offs', fill: t.fg } ],
    [ { text: '• K-Nearest Neighbors classifier achieving 99.7%+ test accuracy', fill: t.fg } ],
    [ { text: '', fill: t.fg } ],
    [ { text: 'TECH STACK:', fill: t.accentAmber, font: 'bold' } ],
    [
      { text: '[Python 3] ', fill: t.accentMint },
      { text: '[Scikit-Learn] ', fill: t.accentPeriwinkle },
      { text: '[Pandas / NumPy] ', fill: t.accentAmber }
    ],
    [
      { text: '[Matplotlib / Seaborn] ', fill: t.fg },
      { text: '[Wavelet Transform] ', fill: t.accentMint },
      { text: '[Jupyter]', fill: t.fgMuted }
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
  const repoPrompt = renderPrompt(50, 570, theme, 'git remote get-url origin # github.com/Satvik-4web/banknote-authentication-machine-learning', false);

  // TUI Scene Still: 2D Scatter & Model Metrics
  const tuiHeader = createTerminalLine([
    { text: '┌── TUI CLASSIFIER: 2D SCATTER & BOUNDARY ──┐', fill: t.accentPeriwinkle }
  ], { x: 620, y: 185, fontSize: 13 }).svg;

  const tuiLines = [
    [ { text: '│ SKEWNESS (Y) vs VARIANCE (X)              │', fill: t.fgMuted } ],
    [ { text: '│  +4 │      ●   ●    ●  : ▲    ▲           │', fill: t.fg } ],
    [ { text: '│  +2 │   ●    ●   ●     :   ▲    ▲    ▲    │', fill: t.fg } ],
    [ { text: '│   0 │     ●    ●   ●   : ▲    ▲   ▲       │', fill: t.fg } ],
    [ { text: '│  -2 │       ●    ●     :    ▲   ▲         │', fill: t.fg } ],
    [ { text: '│  -4 │  [● Genuine]     : [▲ Counterfeit]  │', fill: t.accentAmber } ],
    [ { text: '│     └──┴───┴───┴───┴───┴───┴───┴───┴───   │', fill: t.fgMuted } ],
    [ { text: '├── MODEL BENCHMARK: KNN (K=5) ─────────────┤', fill: t.accentPeriwinkle } ],
    [ { text: '│ ACCURACY:  99.71% │ PRECISION: 1.000      │', fill: t.accentMint, font: 'bold' } ],
    [ { text: '│ RECALL:    0.994  │ F1-SCORE:  0.997      │', fill: t.accentMint, font: 'bold' } ],
    [ { text: '└── TEST EVAL: ZERO FALSE POSITIVES DETECTED ┘', fill: t.accentPeriwinkle } ]
  ].map((l, i) => createTerminalLine(l, { x: 620, y: 215 + i * 23, fontSize: 12.5 }).svg).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Terminal project card for Banknote Authentication: Machine learning classifier comparing KNN and decision boundaries">
  <title>Banknote Authentication — Terminal Card</title>
  <defs>
    ${renderTerminalDefs(theme)}
  </defs>

  ${renderPaneChrome(W, H, theme, { title: '~/projects/banknote-ml', status: '[MODEL: 99.7%]' })}

  <!-- Command Prompt -->
  <g transform="translate(0, 0)">
    ${renderPrompt(50, 85, theme, 'cat banknote/README.md')}
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
