import { renderDefs, renderLetterboxFrame } from './shared.mjs';
import { createTextPath } from '../scripts/text-to-path.mjs';

export function renderPosterBanknoteSvg(theme, config) {
  const t = theme;
  const W = 1200;
  const H = 700;

  const titlePath = createTextPath('BANKNOTE AUTHENTICATION', {
    font: 'bold',
    fontSize: 44,
    tracking: 12,
    align: 'left',
    x: 60,
    y: 115,
    fill: `url(#goldGrad)`
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="Poster and scene illustration for Banknote Authentication: machine learning classifier comparison on statistical image features">
  <title>Banknote Authentication — Feature Poster</title>
  <defs>
    ${renderDefs(theme)}
  </defs>

  <style>
    .sans-track {
      font-family: ${config.fonts.bodySans};
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
    .serif-tagline {
      font-family: ${config.fonts.serifFallback};
      font-size: 20px;
      font-style: italic;
      fill: ${t.typeSecondary};
    }
    @media (prefers-reduced-motion: no-preference) {
      .boundary-curve {
        animation: refineBoundary 8s ease-in-out infinite;
      }
      .label-eval   { animation: showEval 8s step-end infinite; }
      .label-optim  { animation: showOptim 8s step-end infinite; }
    }
    @keyframes refineBoundary {
      0%, 30% {
        d: path("M 80 200 Q 300 160 500 110 T 820 40");
        stroke: ${t.typeMuted};
      }
      35%, 65% {
        d: path("M 80 215 Q 280 180 480 130 T 820 30");
        stroke: ${t.accentGold};
      }
      70%, 100% {
        d: path("M 80 225 Q 260 195 460 145 T 820 20");
        stroke: ${t.accentGoldHighlight};
      }
    }
    @keyframes showEval {
      0%, 48%   { opacity: 1; }
      49%, 100% { opacity: 0; }
    }
    @keyframes showOptim {
      0%, 48%   { opacity: 0; }
      49%, 100% { opacity: 1; }
    }
  </style>

  ${renderLetterboxFrame(W, H, theme)}

  <!-- Poster Header -->
  <g transform="translate(60, 68)">
    <text class="sans-track" x="0" y="0" font-size="10" fill="${t.typeMuted}">PRODUCTION 05 &#8226; MACHINE LEARNING CLASSIFIER COMPARISON</text>
    <rect x="940" y="-12" width="140" height="20" fill="none" stroke="${t.hairline}" stroke-width="1"/>
    <text class="sans-track" x="1010" y="2" font-size="9" font-weight="600" fill="${t.accentGold}" text-anchor="middle">&#9670; FEATURED SYSTEM</text>
  </g>

  <!-- Title & Tagline -->
  <g transform="translate(0, 0)">
    ${titlePath.svg}
    <text class="serif-tagline" x="60" y="152">
      "Evaluation of multiple supervised classification algorithms on statistical features extracted from banknote imagery."
    </text>
  </g>

  <!-- Cinema Scene Still: Scatter Clusters + Refining Decision Boundary (60, 180 to 1140, 500) -->
  <g transform="translate(60, 180)">
    <rect width="1080" height="320" fill="${t.surface}" stroke="${t.hairlineSubtle}" stroke-width="1"/>

    <!-- Still Frame Corner Accents -->
    <path d="M 0 16 L 0 0 L 16 0" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 1080 16 L 1080 0 L 1064 0" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 0 304 L 0 320 L 16 320" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>
    <path d="M 1080 304 L 1080 320 L 1064 320" fill="none" stroke="${t.accentGold}" stroke-width="1.2"/>

    <text class="sans-track" x="24" y="32" font-size="9" fill="${t.accentGold}">SCENE STILL 05 &#8226; 2D STATISTICAL EMBEDDING &#8226; DECISION BOUNDARY</text>
    <text class="sans-track" x="1056" y="32" font-size="8.5" fill="${t.typeMuted}" text-anchor="end">WAVELET VARIANCE &#8226; SKEWNESS &#8226; CURTOSIS</text>

    <!-- Coordinate Plane & Scatter (Centered x=100 to 980) -->
    <g transform="translate(90, 45)">
      <!-- Axes -->
      <line x1="60" y1="20" x2="60" y2="190" stroke="${t.hairlineSubtle}" stroke-width="1.2"/>
      <line x1="60" y1="190" x2="840" y2="190" stroke="${t.hairlineSubtle}" stroke-width="1.2"/>
      
      <!-- Axis Labels -->
      <text class="sans-track" x="840" y="208" font-size="8" fill="${t.typeMuted}" text-anchor="end">FEATURE 1: VARIANCE &#8594;</text>
      <text class="sans-track" x="50" y="16" font-size="8" fill="${t.typeMuted}">FEATURE 2: SKEWNESS</text>

      <!-- Grid lines -->
      <line x1="60" y1="135" x2="840" y2="135" stroke="${t.hairlineSubtle}" stroke-width="0.8" stroke-dasharray="3 3"/>
      <line x1="60" y1="80" x2="840" y2="80" stroke="${t.hairlineSubtle}" stroke-width="0.8" stroke-dasharray="3 3"/>
      <line x1="320" y1="20" x2="320" y2="190" stroke="${t.hairlineSubtle}" stroke-width="0.8" stroke-dasharray="3 3"/>
      <line x1="580" y1="20" x2="580" y2="190" stroke="${t.hairlineSubtle}" stroke-width="0.8" stroke-dasharray="3 3"/>

      <!-- Cluster 1: Genuine Banknotes (Champagne Gold circles ● lower left / center) -->
      <g fill="${t.accentGold}">
        <circle cx="110" cy="170" r="4"/>
        <circle cx="145" cy="155" r="4"/>
        <circle cx="160" cy="175" r="4"/>
        <circle cx="205" cy="140" r="4"/>
        <circle cx="230" cy="165" r="4"/>
        <circle cx="260" cy="125" r="4"/>
        <circle cx="295" cy="145" r="4"/>
        <circle cx="330" cy="115" r="4"/>
        <circle cx="370" cy="155" r="4"/>
        <circle cx="410" cy="130" r="4"/>
        <circle cx="450" cy="145" r="4"/>
        <circle cx="490" cy="120" r="4"/>
        <circle cx="530" cy="140" r="4"/>
        <circle cx="570" cy="110" r="4"/>
      </g>

      <!-- Cluster 2: Forged Banknotes (Bone/Secondary triangles ▲ upper right) -->
      <g fill="${t.typePrimary}">
        <polygon points="430,65 434,73 426,73"/>
        <polygon points="475,85 479,93 471,93"/>
        <polygon points="510,50 514,58 506,58"/>
        <polygon points="555,75 559,83 551,83"/>
        <polygon points="600,45 604,53 596,53"/>
        <polygon points="630,70 634,78 626,78"/>
        <polygon points="670,35 674,43 666,43"/>
        <polygon points="710,60 714,68 706,68"/>
        <polygon points="745,80 749,88 741,88"/>
        <polygon points="780,45 784,53 776,53"/>
        <polygon points="810,65 814,73 806,73"/>
      </g>

      <!-- Dynamically Refining Decision Boundary Line -->
      <path class="boundary-curve" d="M 80 215 Q 280 180 480 130 T 820 30" fill="none" stroke="${t.accentGold}" stroke-width="2" stroke-dasharray="4 2"/>
    </g>

    <!-- Legend & Status (Bottom inside still) -->
    <g transform="translate(24, 265)">
      <!-- Legend items -->
      <circle cx="10" cy="8" r="4" fill="${t.accentGold}"/>
      <text class="sans-track" x="22" y="11" font-size="8.5" fill="${t.typeSecondary}">GENUINE (CLASS 0)</text>

      <polygon points="170,4 174,12 166,12" fill="${t.typePrimary}"/>
      <text class="sans-track" x="182" y="11" font-size="8.5" fill="${t.typeSecondary}">FORGED (CLASS 1)</text>

      <line x1="330" y1="8" x2="355" y2="8" stroke="${t.accentGold}" stroke-width="2"/>
      <text class="sans-track" x="365" y="11" font-size="8.5" fill="${t.typeSecondary}">DECISION BOUNDARY</text>

      <!-- Model Comparison Status (No invented numbers!) -->
      <g transform="translate(600, 0)">
        <text class="sans-track label-eval" x="432" y="11" font-size="9" font-weight="600" fill="${t.accentGold}" text-anchor="end">
          MODEL COMPARISON &#8226; EVALUATING SUPERVISED CLASSIFIERS...
        </text>
        <text class="sans-track label-optim" x="432" y="11" font-size="9" font-weight="600" fill="${t.accentGoldHighlight}" text-anchor="end">
          MODEL COMPARISON &#8226; OPTIMAL BOUNDARY CONVERGED
        </text>
      </g>
    </g>
  </g>

  <!-- Cinema Credit Block (Bottom) -->
  <g transform="translate(60, 545)">
    <line x1="0" y1="0" x2="1080" y2="0" stroke="${t.hairlineSubtle}" stroke-width="1"/>
    
    <g transform="translate(0, 30)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">DATA SCIENCE</text>
      <text class="sans-track" x="0" y="18" font-size="11" font-weight="600" fill="${t.typePrimary}">SATVIK</text>
    </g>

    <g transform="translate(240, 30)">
      <text class="sans-track" x="0" y="0" font-size="9" fill="${t.typeMuted}">MACHINE LEARNING STACK</text>
      <text class="sans-track" x="0" y="18" font-size="11" font-weight="600" fill="${t.accentGold}">PYTHON &#8226; SCIKIT-LEARN &#8226; NUMPY &#8226; PANDAS &#8226; EVALUATION PIPELINE</text>
    </g>

    <g transform="translate(900, 30)">
      <text class="sans-track" x="180" y="0" font-size="9" fill="${t.typeMuted}" text-anchor="end">METHODOLOGY</text>
      <text class="sans-track" x="180" y="18" font-size="11" font-weight="600" fill="${t.typePrimary}" text-anchor="end">CLASSIFIER BENCHMARK</text>
    </g>

    <text class="sans-track" x="540" y="80" font-size="9.5" fill="${t.accentGold}" text-anchor="middle">
      VIEW REPOSITORY &#8226; GITHUB.COM/SATVIK-4WEB/BANKNOTE-AUTHENTICATION-MACHINE-LEARNING &#8599;
    </text>
  </g>
</svg>`;
}
