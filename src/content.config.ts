import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts live as Markdown files in src/content/blog/.
// The file name becomes the URL slug, e.g.
//   src/content/blog/kidney-stone-symptoms.md  ->  /blog/kidney-stone-symptoms
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // used for <meta description>, OG and the card excerpt
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Surecare Clinic, Yelahanka'),
    // Cover/social image. Put files in public/images/blog/ and reference as
    // "/images/blog/your-file.jpg", or use a full https:// URL.
    cover: z.string().optional(),
    coverAlt: z.string().default(''),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
