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
  const bg = isDark ? '#0A0E14' : '#FAF8F2';
  const text = isDark ? '#C9D1D9' : '#1F2430';
  const link = isDark ? '#5EEAD4' : '#0F9D8A';
  const border = isDark ? '#1E2733' : '#E3DED2';
  const codeBg = isDark ? '#0F141C' : '#FFFFFF';

  // Replace <picture> with the matching theme source for local preview rendering
  let html = md.replace(/<picture>[\s\S]*?<\/picture>/g, (match) => {
    const srcMatch = match.match(new RegExp(`srcset="([^"]*${theme}\\.svg)"`));
    const altMatch = match.match(/alt="([^"]*)"/);
    const widthMatch = match.match(/width="([^"]*)"/);
    
    const src = srcMatch ? srcMatch[1] : (match.match(/src="([^"]+)"/)?.[1] || '');
    const alt = altMatch ? altMatch[1] : '';
    const width = widthMatch ? widthMatch[1] : '100%';

    return `<img src="${src}" alt="${alt}" style="max-width: 100%; width: ${width}; height: auto; display: block; margin: 0 auto;" />`;
  });

  // Basic markdown conversions
  html = html.replace(/^### (.*$)/gim, '<h3 style="margin-top: 20px; margin-bottom: 8px; color: ' + text + '; font-family: ui-monospace, monospace;">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 style="margin-top: 28px; margin-bottom: 12px; color: ' + text + '; font-family: ui-monospace, monospace;">$1</h2>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`([^`]+)`/g, '<code style="background: ' + codeBg + '; padding: 2px 6px; border-radius: 4px; font-family: ui-monospace, monospace; font-size: 85%; border: 1px solid ' + border + ';">$1</code>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: ' + link + '; text-decoration: none;">$1</a>');
  html = html.replace(/---/g, `<hr style="border: 0; border-top: 1px solid ${border}; margin: 32px 0;">`);

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Satvik Tmux Session Terminal Preview - ${theme}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px 16px;
      background-color: ${bg};
      color: ${text};
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 14px;
      line-height: 1.6;
    }
    .profile-container {
      max-width: 900px;
      margin: 0 auto;
      background-color: ${bg};
    }
    a { color: ${link}; text-decoration: none; }
    a:hover { text-decoration: underline; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    details {
      border: 1px solid ${border};
      border-radius: 8px;
      padding: 16px 20px;
      background: ${codeBg};
      margin-top: 24px;
    }
    summary { cursor: pointer; font-weight: 600; color: ${link}; font-family: ui-monospace, monospace; }
    ul { padding-left: 20px; }
    li { margin-bottom: 8px; }
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
    { width: 960, height: 6000, label: '900' },
    { width: 420, height: 6800, label: '390' }
  ];

  const tempProfile = path.join(process.env.TEMP || 'C:\\Windows\\Temp', 'chrome-profile-preview');

  for (const vp of viewports) {
    // Dark
    const outDark = path.join(rootDir, `screenshot-dark-${vp.label}.png`);
    const cmdDark = `"${chromePath}" --headless=new --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=4000 --hide-scrollbars --window-size=${vp.width},${vp.height} --screenshot="${outDark}" "file:///${previewDarkPath.replace(/\\/g, '/')}"`;
    try {
      execSync(cmdDark, { stdio: 'ignore' });
      console.log(`✓ Screenshot captured: screenshot-dark-${vp.label}.png`);
    } catch (e) {
      console.warn(`Failed screenshot dark ${vp.label}:`, e.message);
    }

    // Light
    const outLight = path.join(rootDir, `screenshot-light-${vp.label}.png`);
    const cmdLight = `"${chromePath}" --headless=new --disable-gpu --user-data-dir="${tempProfile}" --virtual-time-budget=4000 --hide-scrollbars --window-size=${vp.width},${vp.height} --screenshot="${outLight}" "file:///${previewLightPath.replace(/\\/g, '/')}"`;
    try {
      execSync(cmdLight, { stdio: 'ignore' });
      console.log(`✓ Screenshot captured: screenshot-light-${vp.label}.png`);
    } catch (e) {
      console.warn(`Failed screenshot light ${vp.label}:`, e.message);
    }
  }
}
