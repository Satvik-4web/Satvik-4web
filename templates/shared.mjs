export function renderDefs(theme, idPrefix = '') {
  const t = theme;
  return `
    <linearGradient id="${idPrefix}goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.accentGold}"/>
      <stop offset="50%" stop-color="${t.accentGoldHighlight}"/>
      <stop offset="100%" stop-color="${t.accentGold}"/>
    </linearGradient>

    <linearGradient id="${idPrefix}flareGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${t.flare}" stop-opacity="0"/>
      <stop offset="30%" stop-color="${t.flare}" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="${t.flare}" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="${t.flare}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${t.flare}" stop-opacity="0"/>
    </linearGradient>

    <linearGradient id="${idPrefix}fadeMaskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="15%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="85%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>

    <!-- Subtle filmic grain -->
    <filter id="${idPrefix}filmGrain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="2" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${t.grainOpacity} 0"/>
    </filter>
  `;
}

export function renderLetterboxFrame(width, height, theme, idPrefix = '') {
  const t = theme;
  const barHeight = Math.round(height * 0.07);
  const inset = 24;

  return `
    <!-- Letterbox Base Surface -->
    <rect width="${width}" height="${height}" fill="${t.base}"/>

    <!-- Top & Bottom Cinematic Letterbox Bars -->
    <rect x="0" y="0" width="${width}" height="${barHeight}" fill="${t.letterbox}"/>
    <rect x="0" y="${height - barHeight}" width="${width}" height="${barHeight}" fill="${t.letterbox}"/>
    <line x1="0" y1="${barHeight}" x2="${width}" y2="${barHeight}" stroke="${t.hairlineSubtle}" stroke-width="1"/>
    <line x1="0" y1="${height - barHeight}" x2="${width}" y2="${height - barHeight}" stroke="${t.hairlineSubtle}" stroke-width="1"/>

    <!-- Inset Hairline Frame -->
    <rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" fill="none" stroke="${t.hairline}" stroke-width="1"/>

    <!-- Corner Registration Marks -->
    <!-- Top-Left -->
    <path d="M ${inset - 8} ${inset} L ${inset + 8} ${inset} M ${inset} ${inset - 8} L ${inset} ${inset + 8}" stroke="${t.accentGold}" stroke-width="1"/>
    <!-- Top-Right -->
    <path d="M ${width - inset - 8} ${inset} L ${width - inset + 8} ${inset} M ${width - inset} ${inset - 8} L ${width - inset} ${inset + 8}" stroke="${t.accentGold}" stroke-width="1"/>
    <!-- Bottom-Left -->
    <path d="M ${inset - 8} ${height - inset} L ${inset + 8} ${height - inset} M ${inset} ${height - inset - 8} L ${inset} ${height - inset + 8}" stroke="${t.accentGold}" stroke-width="1"/>
    <!-- Bottom-Right -->
    <path d="M ${width - inset - 8} ${height - inset} L ${width - inset + 8} ${height - inset} M ${width - inset} ${height - inset - 8} L ${width - inset} ${height - inset + 8}" stroke="${t.accentGold}" stroke-width="1"/>

    <!-- Subtle Film Grain Overlay -->
    <rect width="${width}" height="${height}" filter="url(#${idPrefix}filmGrain)" pointer-events="none"/>
  `;
}
