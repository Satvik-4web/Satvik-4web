import { renderDefs, renderLetterboxFrame } from './shared.mjs';
import { createTextPath } from '../scripts/text-to-path.mjs';

export function renderSynopsisSvg(theme, config) {
  const t = theme;
  const W = 1600;
  const H = 500;

  const synopsisHeading = createTextPath('SYNOPSIS', {
    font: 'bold',
    fontSize: 28,
    tracking: 8,
    align: 'left',
    x: 120,
    y: 190,
    fill: t.accentGold
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Synopsis: Satvik bio, education at TIET, and CTO role">
  <title>Synopsis — Satvik-4web</title>
  <defs>
    ${renderDefs(theme)}
  </defs>

  <style>
    .sans-track {
      font-family: ${config.fonts.bodySans};
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
    .serif-bio {
      font-family: ${config.fonts.serifFallback};
      font-size: 26px;
      font-weight: 400;
      line-height: 1.6;
      fill: ${t.typePrimary};
    }
    @media (prefers-reduced-motion: no-preference) {
      .bio-1 { animation: fadeIn 1.2s ease-out 0.2s both; }
      .bio-2 { animation: fadeIn 1.2s ease-out 0.7s both; }
      .bio-3 { animation: fadeIn 1.2s ease-out 1.2s both; }
      .credit-row { animation: fadeIn 1.2s ease-out 1.7s both; }
    }
    @keyframes fadeIn {
      from { opacity: 0.6; }
      to   { opacity: 1; }
    }
  </style>

  ${renderLetterboxFrame(W, H, theme)}

  <!-- Left Column: Title & Act Label -->
  <g transform="translate(0, 0)">
    <text class="sans-track" x="120" y="145" font-size="11" fill="${t.typeMuted}">ACT I &#8226; THE PROFILE</text>
    ${synopsisHeading.svg}
    <line x1="120" y1="210" x2="220" y2="210" stroke="${t.accentGold}" stroke-width="1.2"/>
    <text class="sans-track" x="120" y="240" font-size="9.5" fill="${t.typeMuted}">SCENE 01 / PATIALA</text>
  </g>

  <!-- Right Column: 3-line Bio in Prestige Serif -->
  <g transform="translate(360, 0)">
    <text class="serif-bio bio-1" x="0" y="155">
      Computer engineering student developing high-performance full-stack architectures
    </text>
    <text class="serif-bio bio-2" x="0" y="200">
      while moving deep into AI engineering—LLM APIs, retrieval-augmented generation,
    </text>
    <text class="serif-bio bio-3" x="0" y="245">
      and vector embeddings to turn raw algorithms into enduring products.
    </text>

    <!-- Thin Filmic Divider -->
    <g transform="translate(0, 290)">
      <line x1="0" y1="0" x2="1100" y2="0" stroke="${t.hairlineSubtle}" stroke-width="1"/>
      <polygon points="550,-3 553,0 550,3 547,0" fill="${t.accentGold}"/>
    </g>

    <!-- Credit-Style Facts in Tracked Rows -->
    <g class="credit-row" transform="translate(0, 335)">
      <text class="sans-track" x="0" y="0" font-size="11" font-weight="600" fill="${t.accentGold}">
        COMPUTER ENGINEERING &#8226; TIET &#8226; CLASS OF 2028
      </text>
      <text class="sans-track" x="0" y="26" font-size="10.5" fill="${t.typeSecondary}">
        CO-FOUNDER &amp; CTO &#8226; DEV AGENCY &#8226; FULL-STACK &amp; AI SYSTEMS
      </text>
      <text class="sans-track" x="0" y="50" font-size="10" fill="${t.typeMuted}">
        ACTIVE STUDY: LLM APIS &#8226; RAG PIPELINES &#8226; VECTOR SEARCH
      </text>
    </g>
  </g>
</svg>`;
}
