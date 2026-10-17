import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { renderGitlogSvg, DEFAULT_COMMITS } from '../templates/gitlog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'assets');

const USERNAME = 'Satvik-4web';

// Resolve GitHub token
let token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
if (!token) {
  try {
    token = execSync('gh auth token', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    // Unauthenticated fallback
  }
}

const headers = {
  'User-Agent': 'Satvik-4web-Terminal-Profile',
  'Accept': 'application/vnd.github.v3+json'
};
if (token) {
  headers['Authorization'] = `Bearer ${token}`;
}

function formatRelativeTime(isoDateStr) {
  if (!isoDateStr) return 'RECENT';
  const now = new Date();
  const date = new Date(isoDateStr);
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} mo ago`;
}

async function fetchGitLogCommits() {
  console.log(`[git log] Querying GitHub Events for ${USERNAME}...`);
  const eventsRes = await fetch(`https://api.github.com/users/${USERNAME}/events?per_page=100`, { headers });
  if (!eventsRes.ok) {
    throw new Error(`Events API error: ${eventsRes.status} ${eventsRes.statusText}`);
  }
  const events = await eventsRes.json();
  if (!Array.isArray(events)) {
    throw new Error('Events response is not an array');
  }

  const extracted = [];
  const graphSymbols = ['*   ', '|\\  ', '| * ', '* | ', '|/  ', '*   ', '*   ', '*   '];
  const graphColors = ['accentMint', 'accentPeriwinkle', 'accentPeriwinkle', 'accentAmber', 'accentAmber', 'accentMint', 'accentMint', 'accentMint'];

  for (const ev of events) {
    if (ev.type === 'PushEvent' && ev.payload?.commits) {
      const relTime = formatRelativeTime(ev.created_at);
      const branch = (ev.payload.ref || '').replace('refs/heads/', '');
      for (const c of ev.payload.commits) {
        const idx = extracted.length;
        if (idx >= 8) break;
        extracted.push({
          graph: graphSymbols[idx] || '*   ',
          graphColor: graphColors[idx] || 'accentMint',
          hash: (c.sha || 'abcdef1').slice(0, 7),
          decorations: idx === 0 ? `(HEAD -> ${branch || 'master'}, origin/${branch || 'master'})` : '',
          message: (c.message || 'update repository').split('\n')[0].slice(0, 56),
          time: relTime
        });
      }
    }
    if (extracted.length >= 8) break;
  }

  if (extracted.length === 0) {
    return DEFAULT_COMMITS;
  }
  return extracted;
}

async function main() {
  const configPath = path.join(rootDir, 'theme.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const { themes } = config;

  let commits = DEFAULT_COMMITS;
  try {
    commits = await fetchGitLogCommits();
    console.log(`[git log] Found ${commits.length} commits.`);
  } catch (err) {
    console.warn('[git log] Warning: Failed to fetch live events, using fallback:', err.message);
  }

  fs.mkdirSync(assetsDir, { recursive: true });

  const darkSvg = renderGitlogSvg(themes.dark, config, commits);
  const lightSvg = renderGitlogSvg(themes.light, config, commits);

  const darkPath = path.join(assetsDir, 'gitlog-dark.svg');
  const lightPath = path.join(assetsDir, 'gitlog-light.svg');
  const defaultPath = path.join(assetsDir, 'gitlog.svg');

  fs.writeFileSync(darkPath, darkSvg, 'utf8');
  fs.writeFileSync(lightPath, lightSvg, 'utf8');
  fs.writeFileSync(defaultPath, darkSvg, 'utf8');

  console.log(`✓ Generated ${path.relative(rootDir, darkPath)}`);
  console.log(`✓ Generated ${path.relative(rootDir, lightPath)}`);
  console.log(`✓ Generated ${path.relative(rootDir, defaultPath)}`);
}

main().catch(err => {
  console.error('[git log] Fatal error:', err);
  process.exit(0);
});
