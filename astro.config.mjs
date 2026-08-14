import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mayankmadhur.in',
  // Emit /edition-70-swasth-bharat.html, not /edition-70-swasth-bharat/index.html.
  // This keeps every existing URL byte-identical so search rankings survive.
  build: { format: 'file', inlineStylesheets: 'never' },
  markdown: { smartypants: false },
  // Force the shared script out to its own cached file instead of inlining
  // a copy into all 68 pages.
  vite: { build: { assetsInlineLimit: 0 } },
});
