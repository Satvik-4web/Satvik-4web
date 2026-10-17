import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderWhoamiSvg } from '../templates/whoami.mjs';
import { renderProjectsLsSvg } from '../templates/projects-ls.mjs';
import { renderCardNextimeSvg } from '../templates/card-nextime.mjs';
import { renderCardStudentManagementSvg } from '../templates/card-student-management.mjs';
import { renderCardWasteManagementSvg } from '../templates/card-waste-management.mjs';
import { renderCardCampusVerseSvg } from '../templates/card-campusverse.mjs';
import { renderCardBanknoteSvg } from '../templates/card-banknote.mjs';
import { renderHtopSvg, DEFAULT_HTOP_DATA } from '../templates/htop.mjs';
import { renderGitlogSvg, DEFAULT_COMMITS } from '../templates/gitlog.mjs';
import { renderExitSvg } from '../templates/exit.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'assets');
const cardsDir = path.join(assetsDir, 'cards');

// Load theme config
const configPath = path.join(rootDir, 'theme.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { themes } = config;

// Ensure directories exist
fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(cardsDir, { recursive: true });

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

console.log('Building "TMUX SESSION" terminal profile assets...\n');

// 1. Pane 1: whoami Hero
writeAssetPair(path.join(assetsDir, 'whoami'), renderWhoamiSvg);

// 2. Pane 2: projects-ls Directory
writeAssetPair(path.join(assetsDir, 'projects-ls'), renderProjectsLsSvg);

// 3. Project Cards
writeAssetPair(path.join(cardsDir, 'nextime'), renderCardNextimeSvg);
writeAssetPair(path.join(cardsDir, 'student-management'), renderCardStudentManagementSvg);
writeAssetPair(path.join(cardsDir, 'waste-management'), renderCardWasteManagementSvg);
writeAssetPair(path.join(cardsDir, 'campusverse'), renderCardCampusVerseSvg);
writeAssetPair(path.join(cardsDir, 'banknote'), renderCardBanknoteSvg);

// 4. Pane 3: htop System Monitor (baseline)
writeAssetPair(path.join(assetsDir, 'htop'), renderHtopSvg, DEFAULT_HTOP_DATA);

// 5. Pane 4: gitlog Graph (baseline)
writeAssetPair(path.join(assetsDir, 'gitlog'), renderGitlogSvg, DEFAULT_COMMITS);

// 6. Pane 5: exit Footer
writeAssetPair(path.join(assetsDir, 'exit'), renderExitSvg);

console.log('\nAll terminal session static assets built successfully.');
