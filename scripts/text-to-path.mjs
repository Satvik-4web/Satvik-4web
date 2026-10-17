import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const boldBuf = fs.readFileSync(path.join(rootDir, 'fonts', 'CormorantGaramond-Bold.otf'));
const regBuf = fs.readFileSync(path.join(rootDir, 'fonts', 'CormorantGaramond-Regular.otf'));

export const fonts = {
  bold: opentype.parse(boldBuf.buffer),
  regular: opentype.parse(regBuf.buffer)
};

/**
 * Format path commands to SVG d string reliably without scientific notation bugs.
 */
function commandsToD(commands, precision = 2) {
  let d = '';
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd.type === 'M') {
      d += `${i > 0 ? ' ' : ''}M${cmd.x.toFixed(precision)} ${cmd.y.toFixed(precision)}`;
    } else if (cmd.type === 'L') {
      d += ` L${cmd.x.toFixed(precision)} ${cmd.y.toFixed(precision)}`;
    } else if (cmd.type === 'C') {
      d += ` C${cmd.x1.toFixed(precision)} ${cmd.y1.toFixed(precision)} ${cmd.x2.toFixed(precision)} ${cmd.y2.toFixed(precision)} ${cmd.x.toFixed(precision)} ${cmd.y.toFixed(precision)}`;
    } else if (cmd.type === 'Q') {
      d += ` Q${cmd.x1.toFixed(precision)} ${cmd.y1.toFixed(precision)} ${cmd.x.toFixed(precision)} ${cmd.y.toFixed(precision)}`;
    } else if (cmd.type === 'Z') {
      d += ' Z';
    }
  }
  return d;
}

/**
 * Converts text into an outlined SVG <path> using Cormorant Garamond.
 */
export function createTextPath(text, options = {}) {
  const {
    font = 'bold',
    fontSize = 48,
    x = 0,
    y = 0,
    tracking = 0,
    align = 'left',
    fill = '#EDE6D8',
    className = '',
    id = ''
  } = options;

  const fontObj = fonts[font] || fonts.bold;

  // First pass: calculate total width
  let totalWidth = 0;
  for (let i = 0; i < text.length; i++) {
    const glyph = fontObj.charToGlyph(text[i]);
    const adv = (glyph.advanceWidth * fontSize / fontObj.unitsPerEm);
    totalWidth += adv + (i < text.length - 1 ? tracking : 0);
  }

  // Adjust start X based on alignment
  let curX = x;
  if (align === 'center') {
    curX = x - totalWidth / 2;
  } else if (align === 'right') {
    curX = x - totalWidth;
  }

  // Second pass: generate path data
  const paths = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const glyph = fontObj.charToGlyph(char);
    if (glyph.unicode) {
      const p = glyph.getPath(curX, y, fontSize);
      paths.push(commandsToD(p.commands, 2));
    }
    curX += (glyph.advanceWidth * fontSize / fontObj.unitsPerEm) + tracking;
  }

  const d = paths.join(' ');
  const classAttr = className ? ` class="${className}"` : '';
  const idAttr = id ? ` id="${id}"` : '';
  return {
    d,
    width: totalWidth,
    svg: `<path${idAttr}${classAttr} d="${d}" fill="${fill}"/>`
  };
}
