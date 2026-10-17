import { createTerminalLine } from '../scripts/text-to-path.mjs';

export function renderTerminalDefs(theme, idPrefix = '') {
  const t = theme;
  return `
    <!-- Subtle Terminal Glow -->
    <filter id="${idPrefix}activeGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <!-- Scanline Texture -->
    <pattern id="${idPrefix}scanlines" width="100%" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="2000" y2="0" stroke="#000000" stroke-width="1.2" opacity="${t.scanlineOpacity}"/>
    </pattern>

    <!-- Linear Gradient for ASCII Wordmark -->
    <linearGradient id="${idPrefix}termGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.accentMint}"/>
      <stop offset="60%" stop-color="${t.accentPeriwinkle}"/>
      <stop offset="100%" stop-color="${t.accentAmber}"/>
    </linearGradient>

    <!-- Linear Gradient for CPU/Language Bar -->
    <linearGradient id="${idPrefix}barGradMint" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentMint}"/>
      <stop offset="100%" stop-color="${t.accentMint}"/>
    </linearGradient>
    <linearGradient id="${idPrefix}barGradAmber" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentAmber}"/>
      <stop offset="100%" stop-color="${t.accentAmber}"/>
    </linearGradient>
    <linearGradient id="${idPrefix}barGradRose" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentRose}"/>
      <stop offset="100%" stop-color="${t.accentRose}"/>
    </linearGradient>
  `;
}

export function renderPaneChrome(width, height, theme, options = {}) {
  const t = theme;
  const {
    title = '~/terminal',
    status = '[tmux 3.4]',
    isActive = true,
    titleBarHeight = 36,
    idPrefix = ''
  } = options;

  const titleText = createTerminalLine([{ text: title, fill: t.fgMuted, font: 'bold' }], {
    x: 72,
    y: 22,
    fontSize: 12
  });

  const statusText = createTerminalLine([{ text: status, fill: t.fgSubtle, font: 'regular' }], {
    x: width - 110,
    y: 22,
    fontSize: 11
  });

  const activeBorder = isActive
    ? `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="10" fill="none" stroke="${t.borderActive}" stroke-opacity="0.6" stroke-width="1.2"/>`
    : '';

  return `
    <!-- Outer Base Window -->
    <rect width="${width}" height="${height}" rx="10" fill="${t.bg}"/>

    <!-- Inner Pane Container -->
    <rect width="${width}" height="${height}" rx="10" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>
    ${activeBorder}

    <!-- Title Bar Header -->
    <path d="M 0 10 Q 0 0 10 0 L ${width - 10} 0 Q ${width} 0 ${width} 10 L ${width} ${titleBarHeight} L 0 ${titleBarHeight} Z" fill="${t.surfaceSubtle}"/>
    <line x1="0" y1="${titleBarHeight}" x2="${width}" y2="${titleBarHeight}" stroke="${t.border}" stroke-width="1"/>

    <!-- 3 Muted Title Bar Dots -->
    <circle cx="20" cy="18" r="4.5" fill="${t.trafficDotsActive}"/>
    <circle cx="34" cy="18" r="4.5" fill="${t.trafficDots}"/>
    <circle cx="48" cy="18" r="4.5" fill="${t.trafficDots}"/>

    <!-- Title & Status Text -->
    ${titleText.svg}
    ${statusText.svg}

    <!-- Scanline Overlay -->
    <rect width="${width}" height="${height}" rx="10" fill="url(#${idPrefix}scanlines)" pointer-events="none"/>
  `;
}

export function renderPrompt(x, y, theme, cmd = '', cursor = true) {
  const t = theme;
  const line = createTerminalLine([
    { text: 'satvik@tiet', fill: t.accentPeriwinkle, font: 'bold' },
    { text: ':', fill: t.fgMuted },
    { text: '~', fill: t.accentMint },
    { text: ' ❯ ', fill: t.accentMint, font: 'bold' },
    { text: cmd, fill: t.fg, font: 'bold' }
  ], { x, y, fontSize: 14 });

  const cursorX = x + line.width + 2;
  const cursorSvg = cursor ? `
    <rect x="${cursorX}" y="${y - 12}" width="8" height="15" fill="${t.accentMint}">
      <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.49;0.5;0.99;1" dur="1.1s" repeatCount="indefinite"/>
    </rect>
  ` : '';

  return `
    ${line.svg}
    ${cursorSvg}
  `;
}
