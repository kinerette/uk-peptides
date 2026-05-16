import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    keyword: z.string().optional(),
    heroImage: z.string().optional(),
    author: z.string().default('UK Peptides Research Team'),
    /** Set to true to emit a noindex robots meta tag for this post. */
    noindex: z.boolean().optional(),
    /** Language code (en, fr). Default en. */
    lang: z.string().optional(),
  }),
});

export const collections = { blog };
