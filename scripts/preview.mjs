import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to convert README.md to HTML for local preview
function markdownToHtml(md, theme) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#0d1117' : '#ffffff';
  const text = isDark ? '#c9d1d9' : '#24292f';
  const link = isDark ? '#58a6ff' : '#0969da';
  const border = isDark ? '#30363d' : '#d0d7de';
  const codeBg = isDark ? '#161b22' : '#f6f8fa';

  // Replace <picture> with the matching theme source for local preview rendering
  let html = md.replace(/<picture>[\s\S]*?<source[^>]*prefers-color-scheme:\s*(\w+)[^>]*srcset="([^"]+)"[\s\S]*?<source[^>]*prefers-color-scheme:\s*(\w+)[^>]*srcset="([^"]+)"[\s\S]*?<img\s+alt="([^"]*)"[\s\S]*?width="([^"]*)"[^>]*>[\s\S]*?<\/picture>/g, (match, scheme1, src1, scheme2, src2, alt, width) => {
    const src = scheme1 === theme ? src1 : (scheme2 === theme ? src2 : src1);
    return `<img src="${src}" alt="${alt}" style="max-width: 100%; width: ${width}; height: auto; display: block; border-radius: 8px;" />`;
  });

  // Basic markdown conversions
  html = html.replace(/^### (.*$)/gim, '<h3 style="margin-top: 16px; margin-bottom: 8px; color: ' + text + ';">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 style="margin-top: 24px; margin-bottom: 12px; color: ' + text + ';">$1</h2>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`([^`]+)`/g, '<code style="background: ' + codeBg + '; padding: 2px 6px; border-radius: 4px; font-family: ui-monospace, monospace; font-size: 85%;">$1</code>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: ' + link + '; text-decoration: none;">$1</a>');

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Satvik OS Profile Preview - ${theme}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px 16px;
      background-color: ${bg};
      color: ${text};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
    }
    .profile-container {
      max-width: 896px;
      margin: 0 auto;
      border: 1px solid ${border};
      border-radius: 6px;
      padding: 32px;
      background-color: ${bg};
    }
    a { color: ${link}; text-decoration: none; }
    a:hover { text-decoration: underline; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    details {
      border: 1px solid ${border};
      border-radius: 6px;
      padding: 12px 16px;
      background: ${codeBg};
      margin-top: 16px;
    }
    summary { cursor: pointer; font-family: ui-monospace, monospace; }
  </style>
</head>
<body>
  <div class="profile-container">
    ${html}
  </div>
</body>
</html>`;
}

const md = fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8');

const darkHtml = markdownToHtml(md, 'dark');
const lightHtml = markdownToHtml(md, 'light');

const previewDarkPath = path.join(rootDir, 'preview-dark.html');
const previewLightPath = path.join(rootDir, 'preview-light.html');

fs.writeFileSync(previewDarkPath, darkHtml, 'utf8');
fs.writeFileSync(previewLightPath, lightHtml, 'utf8');

console.log('✓ Generated preview-dark.html and preview-light.html');

// Now capture screenshots using Google Chrome Headless
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (fs.existsSync(chromePath)) {
  const viewports = [
    { width: 960, height: 4200, label: '900' },
    { width: 420, height: 4600, label: '390' }
  ];

  for (const vp of viewports) {
    // Dark
    const outDark = path.join(rootDir, `screenshot-dark-${vp.label}.png`);
    const cmdDark = `"${chromePath}" --headless --disable-gpu --virtual-time-budget=4000 --hide-scrollbars --window-size=${vp.width},${vp.height} --screenshot="${outDark}" "file:///${previewDarkPath.replace(/\\/g, '/')}"`;
    try {
      execSync(cmdDark, { stdio: 'ignore' });
      console.log(`✓ Screenshot captured: screenshot-dark-${vp.label}.png`);
    } catch (e) {
      console.warn(`Failed screenshot dark ${vp.label}:`, e.message);
    }

    // Light
    const outLight = path.join(rootDir, `screenshot-light-${vp.label}.png`);
    const cmdLight = `"${chromePath}" --headless --disable-gpu --virtual-time-budget=4000 --hide-scrollbars --window-size=${vp.width},${vp.height} --screenshot="${outLight}" "file:///${previewLightPath.replace(/\\/g, '/')}"`;
    try {
      execSync(cmdLight, { stdio: 'ignore' });
      console.log(`✓ Screenshot captured: screenshot-light-${vp.label}.png`);
    } catch (e) {
      console.warn(`Failed screenshot light ${vp.label}:`, e.message);
    }
  }
}
