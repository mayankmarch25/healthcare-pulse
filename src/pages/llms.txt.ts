// llms.txt, regenerated on every build.
//
// The hand-written framing (positioning, data provenance, tools, attribution
// terms) lives in src/page-assets/llms-head.txt and llms-tail.txt and is yours
// to edit. The edition list is generated, because the hand-maintained version
// had drifted and was still topping out at Edition 69 after 70 was published.

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import head from '../page-assets/llms-head.txt?raw';
import tail from '../page-assets/llms-tail.txt?raw';

const RECENT = 12;

export const GET: APIRoute = async () => {
  const posts = (await getCollection('editions'))
    .sort((a, b) => (b.data.postDate ?? '').localeCompare(a.data.postDate ?? ''));

  const line = (e: any) => {
    const d = e.data;
    const summary = (d.excerpt || d.description || '').replace(/\s+/g, ' ').trim();
    return `- [Edition ${d.edition}: ${d.title}](https://mayankmadhur.in/${e.id}.html): ${summary}`;
  };

  const recent = posts.slice(0, RECENT).map(line).join('\n');

  // A compact full index so a crawler can reach every edition from one file.
  const index = posts
    .map((e) => `- [Edition ${e.data.edition}: ${e.data.title}](https://mayankmadhur.in/${e.id}.html) · ${e.data.displayCategory} · ${e.data.postDate}`)
    .join('\n');

  const body =
`${head}## Recent editions

${recent}

${tail.trimEnd()}

## Full edition index (${posts.length} editions)

${index}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
