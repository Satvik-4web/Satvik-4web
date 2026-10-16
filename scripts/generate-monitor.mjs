import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { themes } from '../templates/colors.mjs';
import { renderMonitorSvg } from '../templates/monitor.mjs';

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
  } catch (e) {
    // No gh token available, proceed unauthenticated (subject to rate limit)
  }
}

const headers = {
  'User-Agent': 'Satvik-OS-Profile-Daemon',
  'Accept': 'application/vnd.github.v3+json'
};
if (token) {
  headers['Authorization'] = `Bearer ${token}`;
}

const languageColorMap = {
  'Python': '#3572A5',
  'TypeScript': '#3178C6',
  'JavaScript': '#F1E05A',
  'C#': '#178600',
  'C++': '#F34B7D',
  'PHP': '#4F5D95',
  'Blade': '#F05340',
  'HTML': '#E34C26',
  'CSS': '#563D7C',
  'ShaderLab': '#222C37',
  'Other': '#8B5CF6'
};

function formatRelativeTime(isoDateStr) {
  if (!isoDateStr) return 'active';
  const now = new Date();
  const date = new Date(isoDateStr);
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

async function fetchTelemetry() {
  console.log(`Fetching telemetry data for ${USERNAME}...`);

  // 1. Fetch user profile
  const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
  if (!userRes.ok) {
    throw new Error(`GitHub User API error: ${userRes.status} ${userRes.statusText}`);
  }
  const userData = await userRes.json();
  const publicRepos = userData.public_repos || 17;

  // 2. Fetch repositories
  const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`, { headers });
  if (!reposRes.ok) {
    throw new Error(`GitHub Repos API error: ${reposRes.status} ${reposRes.statusText}`);
  }
  const repos = await reposRes.json();
  
  let lastPushedRepo = 'SceneNav-AI';
  let lastPushedTime = 'today';
  if (Array.isArray(repos) && repos.length > 0) {
    const nonFork = repos.filter(r => !r.fork);
    const topRepo = nonFork[0] || repos[0];
    lastPushedRepo = topRepo.name;
    lastPushedTime = formatRelativeTime(topRepo.pushed_at);
  }

  // 3. Aggregate languages across repos
  const langTotals = {};
  for (const repo of repos) {
    if (repo.fork) continue;
    try {
      const lRes = await fetch(repo.languages_url, { headers });
      if (lRes.ok) {
        const langData = await lRes.json();
        for (const [lang, bytes] of Object.entries(langData)) {
          // Group Blade into PHP/Blade if desired or keep distinct
          const key = lang === 'Blade' || lang === 'PHP' ? 'PHP/Blade' : lang;
          langTotals[key] = (langTotals[key] || 0) + bytes;
        }
      }
    } catch (e) {
      console.warn(`Could not fetch languages for ${repo.name}:`, e.message);
    }
  }

  const totalBytes = Object.values(langTotals).reduce((a, b) => a + b, 0) || 1;
  const sortedLangs = Object.entries(langTotals)
    .sort((a, b) => b[1] - a[1]);

  const topLangs = sortedLangs.slice(0, 5).map(([name, bytes]) => ({
    name,
    bytes,
    percent: Math.round((bytes / totalBytes) * 1000) / 10,
    color: languageColorMap[name] || '#8B5CF6'
  }));

  const otherBytes = sortedLangs.slice(5).reduce((acc, [, b]) => acc + b, 0);
  if (otherBytes > 0) {
    topLangs.push({
      name: 'Other',
      bytes: otherBytes,
      percent: Math.round((otherBytes / totalBytes) * 1000) / 10,
      color: languageColorMap['Other']
    });
  }

  // 4. Calculate commits in last 30 days from events
  let commits30d = 0;
  try {
    const eventsRes = await fetch(`https://api.github.com/users/${USERNAME}/events?per_page=100`, { headers });
    if (eventsRes.ok) {
      const events = await eventsRes.json();
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      for (const ev of events) {
        if (ev.type === 'PushEvent' && new Date(ev.created_at) > thirtyDaysAgo) {
          commits30d += (ev.payload.commits ? ev.payload.commits.length : (ev.payload.size || 1));
        }
      }
    }
  } catch (e) {
    console.warn('Could not fetch events, using fallback:', e.message);
    commits30d = 17;
  }

  return {
    publicRepos,
    commits30d: commits30d > 0 ? commits30d : 17,
    lastPushedRepo,
    lastPushedTime,
    languages: topLangs
  };
}

async function main() {
  let telemetryData;
  try {
    telemetryData = await fetchTelemetry();
    console.log('Telemetry acquired:', JSON.stringify(telemetryData, null, 2));
  } catch (err) {
    console.error('API Error during telemetry fetch:', err.message);
    const existingDark = path.join(assetsDir, 'monitor-dark.svg');
    if (fs.existsSync(existingDark)) {
      console.log('Preserving existing monitor SVG due to API error.');
      process.exit(0);
    }
    // Fallback real baseline data
    telemetryData = {
      publicRepos: 17,
      commits30d: 17,
      lastPushedRepo: 'SceneNav-AI',
      lastPushedTime: 'today',
      languages: [
        { name: 'Python', percent: 30.5, bytes: 866658, color: '#3572A5' },
        { name: 'TypeScript', percent: 28.8, bytes: 817564, color: '#3178C6' },
        { name: 'JavaScript', percent: 16.4, bytes: 465977, color: '#F1E05A' },
        { name: 'C#', percent: 11.6, bytes: 329737, color: '#178600' },
        { name: 'PHP/Blade', percent: 5.4, bytes: 154013, color: '#4F5D95' },
        { name: 'C++', percent: 2.5, bytes: 70372, color: '#F34B7D' },
        { name: 'Other', percent: 4.8, bytes: 136195, color: '#8B5CF6' }
      ]
    };
  }

  const darkSvg = renderMonitorSvg(themes.dark, telemetryData);
  const lightSvg = renderMonitorSvg(themes.light, telemetryData);

  const darkPath = path.join(assetsDir, 'monitor-dark.svg');
  const lightPath = path.join(assetsDir, 'monitor-light.svg');
  const defaultPath = path.join(assetsDir, 'monitor.svg');

  fs.writeFileSync(darkPath, darkSvg, 'utf8');
  fs.writeFileSync(lightPath, lightSvg, 'utf8');
  fs.writeFileSync(defaultPath, darkSvg, 'utf8');

  console.log(`✓ Wrote ${path.relative(rootDir, darkPath)}`);
  console.log(`✓ Wrote ${path.relative(rootDir, lightPath)}`);
  console.log(`✓ Wrote ${path.relative(rootDir, defaultPath)}`);
}

main();
