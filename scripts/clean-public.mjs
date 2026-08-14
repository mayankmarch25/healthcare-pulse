// Runs before every build.
//
// Anything in public/ is copied over Astro's own output, so a leftover file
// there silently overrides a generated page. That is exactly what happened
// with the homepage: an old public/index.html kept overwriting the real one.
//
// Uploading files can never delete files, so relying on the repo being tidy is
// fragile. Instead this removes, at build time, any file in public/ that either
//   1. resolves to the same URL as a page Astro generates, or
//   2. is a leftover Jekyll template (front matter or {% %} tags), which must
//      never reach a reader.
// It only touches the build machine's copy. Your repo is untouched.

import { readdir, readFile, rm, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const PUBLIC = 'public';
const PAGES = 'src/pages';
const EDITIONS = 'src/content/editions';

// Files that are legitimately in public/ and must survive.
const KEEP = new Set([
  '_headers', '_redirects', 'robots.txt', 'favicon.png',
  'logo.png', 'profile.png',
]);

// Artefacts of the old GitHub Pages setup. Harmless but meaningless now, and
// CNAME would fight Cloudflare if Pages were ever re-enabled on the old repo.
const DROP = new Set(['CNAME', '.nojekyll', 'Gemfile', 'Gemfile.lock', '_config.yml']);

async function walk(dir, base = dir) {
  const out = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return out; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p, base)));
    else out.push(relative(base, p).replace(/\\/g, '/'));
  }
  return out;
}

// ---- work out which URLs Astro will generate ----
const generated = new Set();

for (const f of await walk(PAGES)) {
  if (!/\.(astro|ts|js)$/.test(f)) continue;
  if (f.includes('[')) continue;                      // dynamic, handled below
  generated.add(f.replace(/\.(astro|ts|js)$/, ''));   // e.g. "index", "ask/index", "llms.txt"
}

// src/pages/[slug].astro -> one .html per edition
if ((await walk(PAGES)).some((f) => f === '[slug].astro')) {
  for (const f of await walk(EDITIONS)) {
    if (f.endsWith('.md')) generated.add(f.replace(/\.md$/, '.html'));
  }
}
// src/pages/topics/[topic]/index.astro -> /topics/<topic>/
if ((await walk(PAGES)).some((f) => f === 'topics/[topic]/index.astro')) {
  for (const t of ['policy', 'strategy', 'digital-health', 'geopolitics',
                   'governance', 'pharma', 'biotech', 'general']) {
    generated.add(`topics/${t}/index`);
  }
}

const collides = (rel) => {
  const noExt = rel.replace(/\.html$/, '');
  return generated.has(noExt) || generated.has(rel);
};

// ---- sweep public/ ----
const files = await walk(PUBLIC);
const removed = [];

for (const rel of files) {
  if (KEEP.has(rel)) continue;
  const full = join(PUBLIC, rel);

  let reason = null;
  if (DROP.has(rel)) {
    reason = 'GitHub Pages / Jekyll artefact';
  } else if (collides(rel)) {
    reason = 'Astro generates this URL';
  } else if (/\.(html|txt|xml)$/.test(rel)) {
    const head = (await readFile(full, 'utf8')).slice(0, 4000);
    if (/^\s*---\s*\n\s*layout\s*:/.test(head) || /\{%[\s\S]{0,80}%\}/.test(head)) {
      reason = 'leftover Jekyll template';
    }
  }
  if (reason) {
    await rm(full, { force: true });
    removed.push(`${rel}  (${reason})`);
  }
}

if (removed.length) {
  console.log(`clean-public: removed ${removed.length} stale file(s) from the build:`);
  for (const r of removed) console.log(`  - ${r}`);
} else {
  console.log('clean-public: public/ is clean');
}
