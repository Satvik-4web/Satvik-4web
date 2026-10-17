import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const boldBuf = fs.readFileSync(path.join(rootDir, 'fonts', 'JetBrainsMono-Bold.ttf'));
const regBuf = fs.readFileSync(path.join(rootDir, 'fonts', 'JetBrainsMono-Regular.ttf'));

export const fonts = {
  bold: opentype.parse(boldBuf.buffer),
  regular: opentype.parse(regBuf.buffer)
};

function formatNum(n, precision = 1) {
  const s = n.toFixed(precision);
  return s.endsWith('.0') ? s.slice(0, -2) : s;
}

/**
 * Format path commands to SVG d string reliably without floating point / scientific notation issues.
 */
function commandsToD(commands, precision = 1) {
  let d = '';
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd.type === 'M') {
      d += `M${formatNum(cmd.x, precision)} ${formatNum(cmd.y, precision)}`;
    } else if (cmd.type === 'L') {
      d += `L${formatNum(cmd.x, precision)} ${formatNum(cmd.y, precision)}`;
    } else if (cmd.type === 'C') {
      d += `C${formatNum(cmd.x1, precision)} ${formatNum(cmd.y1, precision)} ${formatNum(cmd.x2, precision)} ${formatNum(cmd.y2, precision)} ${formatNum(cmd.x, precision)} ${formatNum(cmd.y, precision)}`;
    } else if (cmd.type === 'Q') {
      d += `Q${formatNum(cmd.x1, precision)} ${formatNum(cmd.y1, precision)} ${formatNum(cmd.x, precision)} ${formatNum(cmd.y, precision)}`;
    } else if (cmd.type === 'Z') {
      d += 'Z';
    }
  }
  return d;
}

/**
 * Converts text into an outlined SVG <path> using JetBrains Mono.
 */
export function createTextPath(text, options = {}) {
  const {
    font = 'regular',
    fontSize = 16,
    x = 0,
    y = 0,
    tracking = 0,
    align = 'left',
    fill = '#C9D1D9',
    className = '',
    id = ''
  } = options;

  const fontObj = fonts[font] || fonts.regular;

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
      if (p.commands.length > 0) {
        paths.push(commandsToD(p.commands, 1));
      }
    }
    curX += (glyph.advanceWidth * fontSize / fontObj.unitsPerEm) + tracking;
  }

  const d = paths.join(' ');
  const classAttr = className ? ` class="${className}"` : '';
  const idAttr = id ? ` id="${id}"` : '';
  return {
    d,
    width: totalWidth,
    svg: d ? `<path${idAttr}${classAttr} d="${d}" fill="${fill}"/>` : ''
  };
}

/**
 * Renders a full terminal line with multiple colored spans as outlined paths.
 * spans: [ { text: 'satvik@tiet', fill: '#5EEAD4', font: 'bold' }, ... ]
 */
export function createTerminalLine(spans, options = {}) {
  const {
    x = 0,
    y = 0,
    fontSize = 16,
    defaultFont = 'regular',
    defaultFill = '#C9D1D9',
    className = '',
    id = ''
  } = options;

  let curX = x;
  const elements = [];

  for (const span of spans) {
    if (!span || !span.text) continue;
    const fontName = span.font || defaultFont;
    const fontObj = fonts[fontName] || fonts.regular;
    const fill = span.fill || defaultFill;
    const spanClass = span.className || '';

    const paths = [];
    for (let i = 0; i < span.text.length; i++) {
      const char = span.text[i];
      const glyph = fontObj.charToGlyph(char);
      if (glyph.unicode && char !== ' ') {
        const p = glyph.getPath(curX, y, fontSize);
        if (p.commands.length > 0) {
          paths.push(commandsToD(p.commands, 1));
        }
      }
      curX += (glyph.advanceWidth * fontSize / fontObj.unitsPerEm);
    }

    if (paths.length > 0) {
      const d = paths.join(' ');
      const classAttr = spanClass ? ` class="${spanClass}"` : '';
      elements.push(`<path${classAttr} d="${d}" fill="${fill}"/>`);
    }
  }

  const wrapperClass = className ? ` class="${className}"` : '';
  const wrapperId = id ? ` id="${id}"` : '';
  return {
    width: curX - x,
    svg: `<g${wrapperId}${wrapperClass}>${elements.join('')}</g>`
  };
}
