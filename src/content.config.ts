import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One schema for every edition. If a required field is missing or misspelled,
// the build fails with a clear message instead of publishing a broken page.
export const collections = {
  editions: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/editions' }),
    schema: z.object({
      edition: z.number(),
      title: z.string(),
      headTitle: z.string().optional(),
      description: z.string(),
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      schemaDescription: z.string().optional(),
      category: z.enum(['strategy','policy','digital-health','geopolitics',
                        'pharma','biotech','governance']),
      categoryLabel: z.string().optional(),
      readTime: z.string().optional(),
      datePublished: z.string(),
      dateModified: z.string().optional(),
      dateLine: z.string().optional(),
      breadcrumbSection: z.string().default('Perspectives'),
      relatedLabel: z.string().default('More perspectives'),
      relatedSeeAll: z.string().default('/perspectives/'),
      related: z.array(z.object({
        cat: z.string(), href: z.string(), ed: z.string(), title: z.string(),
      })).default([]),
      excerpt: z.string().default(''),
      displayCategory: z.string().default('Policy'),
      tags: z.array(z.string()).default([]),
      postDate: z.string().optional(),
      needsChart: z.boolean().default(false),
      legacyBody: z.boolean().default(false),
      pageCss: z.boolean().default(false),
      pageScript: z.boolean().default(false),
    }),
  }),
};
