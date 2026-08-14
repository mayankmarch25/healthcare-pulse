// Builds sitemap.xml from the pages that actually exist in dist/.
//
// Why not @astrojs/sitemap: it only sees Astro-generated routes, so it missed
// every page served from public/ (about, podcast, the six trackers). It also
// did not know this site uses .html URLs, so it emitted
// /edition-1-private-equity instead of /edition-1-private-equity.html.
// Non-canonical URLs in a sitemap send mixed signals to search engines.
//
// This reads each page's own <link rel="canonical">, which is the authoritative
// URL, and falls back to the file path only if a page has no canonical tag.

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = 'dist';
const SITE = 'https://mayankmadhur.in';
const NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = (await walk(DIST)).sort();
const seen = new Map();
const noCanonical = [];

for (const f of files) {
  const html = await readFile(f, 'utf8');
  if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html)) continue;

  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  let loc;
  if (m) {
    loc = m[1];
  } else {
    const rel = relative(DIST, f).replace(/\\/g, '/');
    loc = SITE + '/' + rel.replace(/index\.html$/, '');
    noCanonical.push(rel);
  }
  if (!loc.startsWith(SITE)) continue;

  const dm = html.match(/"dateModified"\s*:\s*"([\d-]{10})/)
          || html.match(/"datePublished"\s*:\s*"([\d-]{10})/);
  const lastmod = dm ? dm[1] : (await stat(f)).mtime.toISOString().slice(0, 10);
  if (!seen.has(loc)) seen.set(loc, lastmod);
}

const urls = [...seen.entries()].sort(([a], [b]) => a.localeCompare(b));
const body = urls
  .map(([loc, lm]) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lm}</lastmod>\n  </url>`)
  .join('\n');

await writeFile(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${NS}">\n${body}\n</urlset>\n`
);

console.log(`sitemap.xml: ${urls.length} URLs`);
if (noCanonical.length) console.log(`  no canonical tag, path used: ${noCanonical.join(', ')}`);
