import { renderDefs, renderLetterboxFrame } from './shared.mjs';
import { createTextPath } from '../scripts/text-to-path.mjs';

export function renderEndCardSvg(theme, config) {
  const t = theme;
  const W = 1600;
  const H = 400;

  const titlePath = createTextPath('TO BE CONTINUED.', {
    font: 'bold',
    fontSize: 56,
    tracking: 18,
    align: 'center',
    x: 800,
    y: 200,
    fill: `url(#goldGrad)`
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="End Card: TO BE CONTINUED.">
  <title>To Be Continued</title>
  <defs>
    ${renderDefs(theme)}
  </defs>

  <style>
    .sans-track {
      font-family: ${config.fonts.bodySans};
      letter-spacing: 0.38em;
      text-transform: uppercase;
    }
    @media (prefers-reduced-motion: no-preference) {
      .fade-in {
        animation: fadeIn 2.4s ease-out forwards;
      }
      .flare-sweep {
        animation: flareSweep 8s ease-in-out infinite;
      }
      .pulse-line {
        animation: pulseLine 6s ease-in-out infinite alternate;
      }
    }
    @keyframes fadeIn {
      0%   { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes flareSweep {
      0%   { transform: translate(-600px, 0); opacity: 0; }
      20%  { opacity: 0.85; }
      70%  { opacity: 0.85; }
      100% { transform: translate(1800px, 0); opacity: 0; }
    }
    @keyframes pulseLine {
      0%   { opacity: 0.4; }
      100% { opacity: 0.9; }
    }
  </style>

  ${renderLetterboxFrame(W, H, theme)}

  <g class="fade-in">
    <!-- Top Tiny Production Mark -->
    <text class="sans-track" x="800" y="95" font-size="10" fill="${t.accentGold}" text-anchor="middle">&#9670; FIN &#8226; SCENE IN PROGRESS &#9670;</text>

    <!-- Outlined Prestige Title: TO BE CONTINUED. -->
    <g transform="translate(0, 0)">
      ${titlePath.svg}
    </g>

    <!-- Hairline Accent -->
    <line class="pulse-line" x1="560" y1="230" x2="1040" y2="230" stroke="${t.hairline}" stroke-width="1"/>

    <!-- Bottom Tagline -->
    <text class="sans-track" x="800" y="275" font-size="11" fill="${t.typeSecondary}" text-anchor="middle">BUILD &#8226; BREAK &#8226; LEARN &#8226; REBUILD</text>
    <text class="sans-track" x="800" y="305" font-size="8.5" fill="${t.typeMuted}" text-anchor="middle">PRODUCTION OF SATVIK-4WEB &#8226; MMXXIV &#8211; PRESENT</text>
  </g>

  <!-- Anamorphic Flare Streak -->
  <g class="flare-sweep" transform="translate(0, 200)">
    <ellipse cx="0" cy="0" rx="280" ry="1.2" fill="url(#flareGrad)"/>
    <circle cx="0" cy="0" r="2.5" fill="${t.flare}" opacity="0.6"/>
  </g>
</svg>`;
}
