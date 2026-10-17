import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { renderProductionStatsSvg, DEFAULT_STATS } from '../templates/production-stats.mjs';

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
  'User-Agent': 'Satvik-4web-Cinematic-Profile',
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
  if (diffDays <= 0) return 'TODAY';
  if (diffDays === 1) return 'YESTERDAY';
  if (diffDays < 30) return `${diffDays}D AGO`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}MO AGO`;
}

async function fetchStats() {
  console.log(`[Production Stats] Querying GitHub API for ${USERNAME}...`);

  // 1. Fetch public user info
  const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
  if (!userRes.ok) {
    throw new Error(`User API error: ${userRes.status} ${userRes.statusText}`);
  }
  const userData = await userRes.json();
  const repoCount = userData.public_repos || DEFAULT_STATS.repoCount;

  // 2. Fetch public repositories
  const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed&type=public`, { headers });
  if (!reposRes.ok) {
    throw new Error(`Repos API error: ${reposRes.status} ${reposRes.statusText}`);
  }
  const repos = await reposRes.json();

  let lastPushed = DEFAULT_STATS.lastPushed;
  if (Array.isArray(repos) && repos.length > 0) {
    const publicNonForks = repos.filter(r => !r.fork && !r.private);
    const topRepo = publicNonForks[0] || repos[0];
    if (topRepo) {
      lastPushed = {
        name: topRepo.name,
        timeAgo: formatRelativeTime(topRepo.pushed_at)
      };
    }
  }

  // 3. Aggregate language breakdown across public repositories
  const langTotals = {};
  if (Array.isArray(repos)) {
    for (const repo of repos) {
      if (repo.fork || repo.private) continue;
      try {
        const lRes = await fetch(repo.languages_url, { headers });
        if (lRes.ok) {
          const langData = await lRes.json();
          for (const [lang, bytes] of Object.entries(langData)) {
            const key = lang === 'Blade' || lang === 'PHP' ? 'PHP/Blade' : lang;
            langTotals[key] = (langTotals[key] || 0) + bytes;
          }
        }
      } catch (err) {
        console.warn(`Could not fetch languages for ${repo.name}:`, err.message);
      }
    }
  }

  const totalBytes = Object.values(langTotals).reduce((a, b) => a + b, 0) || 1;
  const sortedLangs = Object.entries(langTotals).sort((a, b) => b[1] - a[1]);

  let languages = sortedLangs.slice(0, 5).map(([name, bytes]) => ({
    name,
    bytes,
    percent: Math.round((bytes / totalBytes) * 1000) / 10
  }));

  const otherBytes = sortedLangs.slice(5).reduce((acc, [, b]) => acc + b, 0);
  if (otherBytes > 0) {
    languages.push({
      name: 'Other',
      bytes: otherBytes,
      percent: Math.round((otherBytes / totalBytes) * 1000) / 10
    });
  }

  if (languages.length === 0) {
    languages = DEFAULT_STATS.languages;
  }

  // 4. Calculate commits in last 30 days
  let commits30d = 0;
  try {
    const eventsRes = await fetch(`https://api.github.com/users/${USERNAME}/events?per_page=100`, { headers });
    if (eventsRes.ok) {
      const events = await eventsRes.json();
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      for (const ev of events) {
        if (ev.type === 'PushEvent' && new Date(ev.created_at) >= thirtyDaysAgo) {
          const commitCount = ev.payload?.size || ev.payload?.commits?.length || 1;
          commits30d += commitCount;
        }
      }
    }
  } catch (err) {
    console.warn('Could not query events API:', err.message);
  }

  if (commits30d === 0) {
    commits30d = DEFAULT_STATS.commits30d;
  }

  return {
    repoCount,
    commits30d,
    lastPushed,
    languages
  };
}

async function main() {
  const configPath = path.join(rootDir, 'theme.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const { themes } = config;

  let statsData = DEFAULT_STATS;
  try {
    statsData = await fetchStats();
    console.log('[Production Stats] Telemetry aggregated successfully:');
    console.log(`  - Repositories: ${statsData.repoCount}`);
    console.log(`  - Takes (30d): ${statsData.commits30d} commits`);
    console.log(`  - Last Shot: ${statsData.lastPushed.name} (${statsData.lastPushed.timeAgo})`);
    console.log(`  - Top Language: ${statsData.languages[0]?.name} (${statsData.languages[0]?.percent}%)`);
  } catch (err) {
    console.error('[Production Stats] Warning: Failed to fetch live telemetry, using fallback/previous:', err.message);
    const darkPath = path.join(assetsDir, 'production-stats-dark.svg');
    if (fs.existsSync(darkPath)) {
      console.log('[Production Stats] Preserving existing production-stats SVGs.');
      return;
    }
  }

  fs.mkdirSync(assetsDir, { recursive: true });

  const darkSvg = renderProductionStatsSvg(themes.dark, config, statsData);
  const lightSvg = renderProductionStatsSvg(themes.light, config, statsData);

  const darkPath = path.join(assetsDir, 'production-stats-dark.svg');
  const lightPath = path.join(assetsDir, 'production-stats-light.svg');
  const defaultPath = path.join(assetsDir, 'production-stats.svg');

  fs.writeFileSync(darkPath, darkSvg, 'utf8');
  fs.writeFileSync(lightPath, lightSvg, 'utf8');
  fs.writeFileSync(defaultPath, darkSvg, 'utf8');

  console.log(`✓ Updated ${path.relative(rootDir, darkPath)}`);
  console.log(`✓ Updated ${path.relative(rootDir, lightPath)}`);
  console.log(`✓ Updated ${path.relative(rootDir, defaultPath)}`);
}

main().catch(err => {
  console.error('[Production Stats] Fatal error in main execution:', err);
  process.exit(0); // Exit cleanly to protect workflows
});
