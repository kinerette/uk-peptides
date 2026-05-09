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
  }),
});

export const collections = { blog };
