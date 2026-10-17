import { renderDefs, renderLetterboxFrame } from './shared.mjs';
import { createTextPath } from '../scripts/text-to-path.mjs';

export function renderCreditsSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 700;

  const titlePath = createTextPath('END CREDITS', {
    font: 'bold',
    fontSize: 34,
    tracking: 14,
    align: 'center',
    x: 600,
    y: 110,
    fill: t.accentGold
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="End Credits: rolling credits of technologies, languages, frameworks, data, ML, and tools">
  <title>End Credits — Production Stack</title>
  <defs>
    ${renderDefs(theme)}
    <mask id="creditsFadeMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#fadeMaskGrad)"/>
    </mask>
  </defs>

  <style>
    .sans-track {
      font-family: ${config.fonts.bodySans};
      letter-spacing: 0.35em;
      text-transform: uppercase;
    }
    .serif-credit {
      font-family: ${config.fonts.serifFallback};
      font-size: 19px;
      font-weight: 600;
      letter-spacing: 0.15em;
      fill: ${t.typePrimary};
    }
    @media (prefers-reduced-motion: no-preference) {
      .credits-roll {
        animation: scrollUp ${config.motion.creditsScrollDur} linear infinite;
      }
      .static-credits {
        display: none;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .credits-roll {
        display: none;
      }
      .static-credits {
        display: block;
      }
    }
    @keyframes scrollUp {
      0%   { transform: translateY(580px); }
      100% { transform: translateY(-780px); }
    }
  </style>

  ${renderLetterboxFrame(W, H, theme)}

  <!-- Fixed Header -->
  <g transform="translate(0, 0)">
    <text class="sans-track" x="600" y="70" font-size="9.5" fill="${t.typeMuted}" text-anchor="middle">SYSTEM ARCHITECTURE &#8226; FULL TECHNICAL CAST</text>
    ${titlePath.svg}
    <line x1="480" y1="126" x2="720" y2="126" stroke="${t.hairlineSubtle}" stroke-width="1"/>
  </g>

  <!-- Rolling Credits with Top/Bottom Gradient Mask -->
  <g mask="url(#creditsFadeMask)">
    <g transform="translate(600, 0)">
      <g class="credits-roll">
      
      <!-- Group 1: LANGUAGES -->
      <g transform="translate(0, 0)">
        <text class="sans-track" x="0" y="0" font-size="10" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#8212; LANGUAGES &#8212;</text>
        <text class="serif-credit" x="0" y="32" text-anchor="middle">PYTHON</text>
        <text class="serif-credit" x="0" y="58" text-anchor="middle">TYPESCRIPT</text>
        <text class="serif-credit" x="0" y="84" text-anchor="middle">JAVASCRIPT</text>
        <text class="serif-credit" x="0" y="110" text-anchor="middle">C++</text>
        <text class="serif-credit" x="0" y="136" text-anchor="middle">PHP</text>
        <text class="serif-credit" x="0" y="162" text-anchor="middle">C#</text>
      </g>

      <!-- Group 2: FRAMEWORKS -->
      <g transform="translate(0, 230)">
        <text class="sans-track" x="0" y="0" font-size="10" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#8212; FRAMEWORKS &amp; PLATFORMS &#8212;</text>
        <text class="serif-credit" x="0" y="32" text-anchor="middle">NEXT.JS 14</text>
        <text class="serif-credit" x="0" y="58" text-anchor="middle">REACT</text>
        <text class="serif-credit" x="0" y="84" text-anchor="middle">NODE.JS</text>
        <text class="serif-credit" x="0" y="110" text-anchor="middle">LARAVEL</text>
        <text class="serif-credit" x="0" y="136" text-anchor="middle">EXPRESS</text>
        <text class="serif-credit" x="0" y="162" text-anchor="middle">TAILWIND CSS</text>
      </g>

      <!-- Group 3: DATA -->
      <g transform="translate(0, 460)">
        <text class="sans-track" x="0" y="0" font-size="10" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#8212; DATA &amp; STORAGE &#8212;</text>
        <text class="serif-credit" x="0" y="32" text-anchor="middle">POSTGRESQL</text>
        <text class="serif-credit" x="0" y="58" text-anchor="middle">SUPABASE REALTIME</text>
        <text class="serif-credit" x="0" y="84" text-anchor="middle">UPSTASH REDIS</text>
        <text class="serif-credit" x="0" y="110" text-anchor="middle">ORACLE DATABASE</text>
        <text class="serif-credit" x="0" y="136" text-anchor="middle">SQLITE</text>
      </g>

      <!-- Group 4: MACHINE LEARNING & AI -->
      <g transform="translate(0, 660)">
        <text class="sans-track" x="0" y="0" font-size="10" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#8212; MACHINE LEARNING &amp; AI &#8212;</text>
        <text class="serif-credit" x="0" y="32" text-anchor="middle">SCIKIT-LEARN</text>
        <text class="serif-credit" x="0" y="58" text-anchor="middle">NUMPY &amp; PANDAS</text>
        <text class="serif-credit" x="0" y="84" text-anchor="middle">LLM APIS</text>
        <text class="serif-credit" x="0" y="110" text-anchor="middle">RAG ARCHITECTURES</text>
        <text class="serif-credit" x="0" y="136" text-anchor="middle">VECTOR SEARCH</text>
      </g>

      <!-- Group 5: TOOLS -->
      <g transform="translate(0, 860)">
        <text class="sans-track" x="0" y="0" font-size="10" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#8212; PRODUCTION TOOLS &#8212;</text>
        <text class="serif-credit" x="0" y="32" text-anchor="middle">GIT &amp; GITHUB ACTIONS</text>
        <text class="serif-credit" x="0" y="58" text-anchor="middle">DOCKER</text>
        <text class="serif-credit" x="0" y="84" text-anchor="middle">POSTMAN</text>
        <text class="serif-credit" x="0" y="110" text-anchor="middle">VS CODE</text>
        <text class="serif-credit" x="0" y="136" text-anchor="middle">LINUX / BASH</text>
      </g>

      <!-- Final Credit Badge -->
      <g transform="translate(0, 1070)">
        <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}" text-anchor="middle">CO-FOUNDER &amp; CTO &#8226; DEV AGENCY</text>
        <text class="sans-track" x="0" y="24" font-size="10" font-weight="600" fill="${t.accentGold}" text-anchor="middle">THAPAR INSTITUTE &#8226; CLASS OF 2028</text>
      </g>
    </g>
  </g>
</g>

  <!-- Static Fallback for Reduced Motion -->
  <g class="static-credits" transform="translate(100, 170)">
    <g transform="translate(0, 0)">
      <text class="sans-track" x="0" y="0" font-size="9" font-weight="600" fill="${t.accentGold}">LANGUAGES</text>
      <text class="sans-track" x="0" y="24" font-size="8.5" fill="${t.typePrimary}">PYTHON &#8226; TS &#8226; JS &#8226; C++ &#8226; PHP &#8226; C#</text>
    </g>
    <g transform="translate(0, 60)">
      <text class="sans-track" x="0" y="0" font-size="9" font-weight="600" fill="${t.accentGold}">FRAMEWORKS</text>
      <text class="sans-track" x="0" y="24" font-size="8.5" fill="${t.typePrimary}">NEXT.JS 14 &#8226; REACT &#8226; NODE &#8226; LARAVEL &#8226; TAILWIND</text>
    </g>
    <g transform="translate(0, 120)">
      <text class="sans-track" x="0" y="0" font-size="9" font-weight="600" fill="${t.accentGold}">DATA &amp; STORAGE</text>
      <text class="sans-track" x="0" y="24" font-size="8.5" fill="${t.typePrimary}">POSTGRES &#8226; SUPABASE &#8226; REDIS &#8226; ORACLE &#8226; SQLITE</text>
    </g>
    <g transform="translate(0, 180)">
      <text class="sans-track" x="0" y="0" font-size="9" font-weight="600" fill="${t.accentGold}">MACHINE LEARNING</text>
      <text class="sans-track" x="0" y="24" font-size="8.5" fill="${t.typePrimary}">SCIKIT-LEARN &#8226; PANDAS &#8226; NUMPY &#8226; LLM APIS &#8226; RAG</text>
    </g>
    <g transform="translate(0, 240)">
      <text class="sans-track" x="0" y="0" font-size="9" font-weight="600" fill="${t.accentGold}">PRODUCTION TOOLS</text>
      <text class="sans-track" x="0" y="24" font-size="8.5" fill="${t.typePrimary}">GIT &#8226; ACTIONS &#8226; DOCKER &#8226; POSTMAN &#8226; VS CODE</text>
    </g>
  </g>
</svg>`;
}
