import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blogposts = defineCollection({
  loader: glob({
    pattern: '**/*.{mdx,md}',
    base: './src/content/blogposts/',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      lastMaintained: z.coerce.date().optional(),
      author: z
        .object({
          name: z.string(),
          img: image().optional(),
        })
        .default({ name: 'Mikayil Gacek' }),
      cover: image().optional(),
      coverAlt: z.string().default('Blog Post Cover Image'),
      categories: z.array(z.string()),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,md}', base: './src/content/projects/' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().default('Preview of the project'),
      technologies: z.array(z.string()),
      externalLink: z.string().optional(),
      githubLink: z.string().optional(),
      highlight: z.boolean().default(false),
    }),
});

export const collections = { blogposts, projects };
