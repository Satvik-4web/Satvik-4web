import { renderTerminalDefs, renderPaneChrome, renderPrompt } from './shared.mjs';
import { createTerminalLine } from '../scripts/text-to-path.mjs';

export const DEFAULT_HTOP_DATA = {
  repoCount: 17,
  commits30d: 24,
  lastPushed: { name: 'Satvik-4web', timeAgo: 'TODAY' },
  languages: [
    { name: 'Python', percent: 27.9 },
    { name: 'TypeScript', percent: 22.4 },
    { name: 'PHP / Blade', percent: 18.6 },
    { name: 'PL/SQL', percent: 14.1 },
    { name: 'JavaScript', percent: 9.8 },
    { name: 'C / C++', percent: 7.2 }
  ]
};

function buildMeterSpans(meterNum, label, percent, theme, barWidth = 26) {
  const t = theme;
  const numPipes = Math.max(0, Math.min(barWidth, Math.round((percent / 100) * barWidth)));
  const emptySpaces = Math.max(0, barWidth - numPipes);

  const pipeColor = percent > 50 ? t.accentAmber : t.accentMint;

  return [
    { text: `${meterNum} `, fill: t.accentPeriwinkle, font: 'bold' },
    { text: '[', fill: t.fgMuted },
    { text: '|'.repeat(numPipes), fill: pipeColor },
    { text: ' '.repeat(emptySpaces), fill: t.fgMuted },
    { text: `${percent.toFixed(1).padStart(5, ' ')}%`, fill: t.fg, font: 'bold' },
    { text: '] ', fill: t.fgMuted },
    { text: label, fill: t.fg }
  ];
}

export function renderHtopSvg(theme, config, data = DEFAULT_HTOP_DATA) {
  const t = theme;
  const W = 1200;
  const H = 640;

  const languages = data.languages && data.languages.length > 0 ? data.languages : DEFAULT_HTOP_DATA.languages;
  const repoCount = data.repoCount || DEFAULT_HTOP_DATA.repoCount;
  const commits30d = data.commits30d || DEFAULT_HTOP_DATA.commits30d;
  const lastPushed = data.lastPushed || DEFAULT_HTOP_DATA.lastPushed;

  // CPU Meters from Languages (top 4)
  const meterRows = [];
  const top4Langs = languages.slice(0, 4);
  for (let i = 0; i < 4; i++) {
    const lang = top4Langs[i] || { name: 'idle', percent: 0.0 };
    meterRows.push(
      createTerminalLine(buildMeterSpans(i + 1, lang.name, lang.percent, theme, 26), {
        x: 50,
        y: 125 + i * 24,
        fontSize: 12.5
      }).svg
    );
  }

  // Memory & Swap Meters
  const memPipes = 16;
  const memMeter = createTerminalLine([
    { text: 'Mem', fill: t.accentPeriwinkle, font: 'bold' },
    { text: '[', fill: t.fgMuted },
    { text: '|'.repeat(memPipes), fill: t.accentMint },
    { text: ' '.repeat(10), fill: t.fgMuted },
    { text: ' 1.42G/16.0G', fill: t.fg, font: 'bold' },
    { text: ']', fill: t.fgMuted }
  ], { x: 50, y: 125 + 4 * 24, fontSize: 12.5 }).svg;

  const swpMeter = createTerminalLine([
    { text: 'Swp', fill: t.accentPeriwinkle, font: 'bold' },
    { text: '[', fill: t.fgMuted },
    { text: ' '.repeat(26), fill: t.fgMuted },
    { text: '   0K/8.00G', fill: t.fgMuted },
    { text: ']', fill: t.fgMuted }
  ], { x: 50, y: 125 + 5 * 24, fontSize: 12.5 }).svg;

  // Right Side Telemetry
  const telemetryLines = [
    [
      { text: 'Tasks: ', fill: t.fgMuted },
      { text: `${repoCount}`, fill: t.accentMint, font: 'bold' },
      { text: ' repos, ', fill: t.fgMuted },
      { text: '4', fill: t.accentAmber, font: 'bold' },
      { text: ' thr; ', fill: t.fgMuted },
      { text: '1 running', fill: t.accentMint, font: 'bold' }
    ],
    [
      { text: 'Load average: ', fill: t.fgMuted },
      { text: '0.17  0.24  0.28', fill: t.accentAmber, font: 'bold' }
    ],
    [
      { text: 'Uptime: ', fill: t.fgMuted },
      { text: '2024 - 2028 (TIET · B.Tech COE)', fill: t.accentPeriwinkle }
    ],
    [
      { text: 'Takes (30d): ', fill: t.fgMuted },
      { text: `${commits30d} commits pushed`, fill: t.accentMint, font: 'bold' }
    ],
    [
      { text: 'Last Push: ', fill: t.fgMuted },
      { text: `${lastPushed.name} `, fill: t.accentAmber, font: 'bold' },
      { text: `(${lastPushed.timeAgo})`, fill: t.fgMuted }
    ]
  ].map((line, i) => createTerminalLine(line, { x: 620, y: 125 + i * 24, fontSize: 12.5 }).svg).join('\n');

  // Table Header
  const headerCols = createTerminalLine([
    { text: '  PID USER      PRI  NI  VIRT   RES   SHR S  CPU%  MEM%   TIME+  COMMAND', fill: t.bg, font: 'bold' }
  ], { x: 52, y: 292, fontSize: 12 }).svg;

  // Process Rows
  const processRows = [
    [ { text: ' 1042 satvik     20   0  512M  128M   32M S   4.8   2.1 14:22.01 node nextime-server.mjs', fill: t.accentMint, font: 'bold' } ],
    [ { text: ' 1043 satvik     20   0  384M   96M   24M S   3.4   1.6  8:14.30 php artisan serve --port 8000', fill: t.fg } ],
    [ { text: ' 1044 satvik     20   0  256M   64M   16M S   2.1   1.1  4:05.12 oracle-listener --service orcl', fill: t.fg } ],
    [ { text: ' 1045 satvik     20   0  192M   48M   12M S   1.7   0.8  2:44.80 python train.py --model knn', fill: t.fg } ],
    [ { text: ' 1046 satvik     20   0  128M   32M    8M S   0.9   0.5  1:12.44 arcore-spatial-kiosk --indoor', fill: t.fg } ],
    [ { text: ' 1047 satvik     20   0   96M   24M    6M S   0.4   0.4  0:48.20 rag-streaming-prism --worker', fill: t.fgMuted } ],
    [ { text: ' 1048 satvik     20   0   64M   16M    4M S   0.2   0.2  0:22.10 seat-management-agent --poll', fill: t.fgMuted } ],
    [ { text: ' 1049 satvik     20   0   32M    8M    2M R   0.1   0.1  0:09.05 htop --live-system-monitor', fill: t.accentAmber } ]
  ].map((row, idx) => createTerminalLine(row, { x: 52, y: 320 + idx * 24, fontSize: 12 }).svg).join('\n');

  // Bottom Function Bar
  const fnKeyDefs = [
    { key: 'F1', label: 'Help' },
    { key: 'F2', label: 'Setup' },
    { key: 'F3', label: 'Search' },
    { key: 'F4', label: 'Filter' },
    { key: 'F5', label: 'Tree' },
    { key: 'F6', label: 'SortBy' },
    { key: 'F9', label: 'Kill' },
    { key: 'F10', label: 'Quit' }
  ];

  let fnKeyOffset = 52;
  const fnKeySvgElements = [];
  for (const fn of fnKeyDefs) {
    const keyPath = createTerminalLine([{ text: fn.key, fill: t.bg, font: 'bold' }], {
      x: fnKeyOffset + 4,
      y: 595,
      fontSize: 11
    });
    const keyWidth = keyPath.width + 8;
    const labelPath = createTerminalLine([{ text: ` ${fn.label} `, fill: t.fgMuted }], {
      x: fnKeyOffset + keyWidth,
      y: 595,
      fontSize: 11
    });
    const labelWidth = labelPath.width;

    fnKeySvgElements.push(`
      <rect x="${fnKeyOffset}" y="582" width="${keyWidth}" height="18" rx="3" fill="${t.accentMint}"/>
      ${keyPath.svg}
      ${labelPath.svg}
    `);

    fnKeyOffset += keyWidth + labelWidth + 12;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Terminal pane: htop system monitor displaying repository telemetry, active processes, and language breakdown">
  <title>System Monitor — htop</title>
  <defs>
    ${renderTerminalDefs(theme)}
  </defs>

  ${renderPaneChrome(W, H, theme, { title: '~/system/htop', status: '[HTOP 3.3.0]' })}

  <!-- Command Prompt -->
  <g transform="translate(0, 0)">
    ${renderPrompt(50, 75, theme, 'htop --system-monitor', false)}
  </g>

  <!-- Left Column: CPU & Memory Meters -->
  <g>
    ${meterRows.join('\n')}
    ${memMeter}
    ${swpMeter}
  </g>

  <!-- Vertical Divider in Header -->
  <line x1="580" y1="110" x2="580" y2="260" stroke="${t.border}" stroke-width="1" stroke-dasharray="2 2"/>

  <!-- Right Column: System Telemetry -->
  <g>
    ${telemetryLines}
  </g>

  <!-- Process Table Header Bar -->
  <rect x="50" y="276" width="1100" height="24" rx="3" fill="${t.accentMint}"/>
  ${headerCols}

  <!-- Process Rows -->
  <g>
    ${processRows}
  </g>

  <!-- Divider before Function Key Bar -->
  <line x1="50" y1="565" x2="1150" y2="565" stroke="${t.border}" stroke-width="1"/>

  <!-- Function Key Bar -->
  <g>
    ${fnKeySvgElements.join('\n')}
  </g>
</svg>`;
}
