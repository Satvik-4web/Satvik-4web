import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderColdOpenSvg } from '../templates/cold-open.mjs';
import { renderSynopsisSvg } from '../templates/synopsis.mjs';
import { renderPosterNextimeSvg } from '../templates/poster-nextime.mjs';
import { renderPosterStudentManagementSvg } from '../templates/poster-student-management.mjs';
import { renderPosterWasteManagementSvg } from '../templates/poster-waste-management.mjs';
import { renderPosterCampusverseSvg } from '../templates/poster-campusverse.mjs';
import { renderPosterBanknoteSvg } from '../templates/poster-banknote.mjs';
import { renderCreditsSvg } from '../templates/credits.mjs';
import { renderProductionStatsSvg, DEFAULT_STATS } from '../templates/production-stats.mjs';
import { renderEndCardSvg } from '../templates/end-card.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'assets');
const postersDir = path.join(assetsDir, 'posters');

// Load theme config
const configPath = path.join(rootDir, 'theme.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { themes } = config;

// Ensure output directories exist
fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(postersDir, { recursive: true });

function writeAssetPair(basePath, renderFn, extraArg = undefined) {
  const darkContent = renderFn(themes.dark, config, extraArg);
  const lightContent = renderFn(themes.light, config, extraArg);

  const darkPath = `${basePath}-dark.svg`;
  const lightPath = `${basePath}-light.svg`;
  const defaultPath = `${basePath}.svg`;

  fs.writeFileSync(darkPath, darkContent, 'utf8');
  fs.writeFileSync(lightPath, lightContent, 'utf8');
  fs.writeFileSync(defaultPath, darkContent, 'utf8'); // default fallback

  const darkSizeKb = (Buffer.byteLength(darkContent, 'utf8') / 1024).toFixed(1);
  const lightSizeKb = (Buffer.byteLength(lightContent, 'utf8') / 1024).toFixed(1);

  console.log(`✓ ${path.relative(rootDir, darkPath)} (${darkSizeKb} KB)`);
  console.log(`✓ ${path.relative(rootDir, lightPath)} (${lightSizeKb} KB)`);
}

console.log('Building "THE TITLE SEQUENCE" cinematic profile assets...\n');

// 1. Cold Open Hero
writeAssetPair(path.join(assetsDir, 'cold-open'), renderColdOpenSvg);

// 2. Synopsis
writeAssetPair(path.join(assetsDir, 'synopsis'), renderSynopsisSvg);

// 3. Project Posters
writeAssetPair(path.join(postersDir, 'nextime'), renderPosterNextimeSvg);
writeAssetPair(path.join(postersDir, 'student-management'), renderPosterStudentManagementSvg);
writeAssetPair(path.join(postersDir, 'waste-management'), renderPosterWasteManagementSvg);
writeAssetPair(path.join(postersDir, 'campusverse'), renderPosterCampusverseSvg);
writeAssetPair(path.join(postersDir, 'banknote'), renderPosterBanknoteSvg);

// 4. End Credits
writeAssetPair(path.join(assetsDir, 'credits'), renderCreditsSvg);

// 5. Behind the Scenes (Production Stats baseline)
writeAssetPair(path.join(assetsDir, 'production-stats'), renderProductionStatsSvg, DEFAULT_STATS);

// 6. End Card
writeAssetPair(path.join(assetsDir, 'end-card'), renderEndCardSvg);

console.log('\nAll cinematic static assets built successfully.');
