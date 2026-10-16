import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { themes } from '../templates/colors.mjs';
import { renderBootSvg } from '../templates/boot.mjs';
import { renderDesktopSvg } from '../templates/desktop.mjs';
import { renderNextimeSvg } from '../templates/nextime.mjs';
import { renderStudentManagementSvg } from '../templates/student-management.mjs';
import { renderWasteManagementSvg } from '../templates/waste-management.mjs';
import { renderCampusverseSvg } from '../templates/campusverse.mjs';
import { renderBanknoteSvg } from '../templates/banknote.mjs';
import { renderDockSvg } from '../templates/dock.mjs';
import { renderShutdownSvg } from '../templates/shutdown.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'assets');
const cardsDir = path.join(assetsDir, 'cards');

// Ensure output directories exist
fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(cardsDir, { recursive: true });

function writeAssetPair(basePath, renderFn) {
  const darkContent = renderFn(themes.dark);
  const lightContent = renderFn(themes.light);

  const darkPath = `${basePath}-dark.svg`;
  const lightPath = `${basePath}-light.svg`;
  const defaultPath = `${basePath}.svg`;

  fs.writeFileSync(darkPath, darkContent, 'utf8');
  fs.writeFileSync(lightPath, lightContent, 'utf8');
  fs.writeFileSync(defaultPath, darkContent, 'utf8'); // default points to dark

  console.log(`✓ Generated ${path.relative(rootDir, darkPath)}`);
  console.log(`✓ Generated ${path.relative(rootDir, lightPath)}`);
  console.log(`✓ Generated ${path.relative(rootDir, defaultPath)}`);
}

console.log('Building SATVIK-OS static profile assets...');

writeAssetPair(path.join(assetsDir, 'boot'), renderBootSvg);
writeAssetPair(path.join(assetsDir, 'desktop'), renderDesktopSvg);
writeAssetPair(path.join(cardsDir, 'nextime'), renderNextimeSvg);
writeAssetPair(path.join(cardsDir, 'student-management'), renderStudentManagementSvg);
writeAssetPair(path.join(cardsDir, 'waste-management'), renderWasteManagementSvg);
writeAssetPair(path.join(cardsDir, 'campusverse'), renderCampusverseSvg);
writeAssetPair(path.join(cardsDir, 'banknote'), renderBanknoteSvg);
writeAssetPair(path.join(assetsDir, 'dock'), renderDockSvg);
writeAssetPair(path.join(assetsDir, 'shutdown'), renderShutdownSvg);

console.log('All static assets generated successfully.');
