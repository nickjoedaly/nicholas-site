import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { compositionSchema } from '@schemas/composition';
import { bestiarySchema } from '@schemas/bestiary';
import { softwareSchema } from '@schemas/software';
import { publicationSchema } from '@schemas/publication';
import { blogSchema } from '@schemas/blog';
import { performanceSchema } from '@schemas/performance';
import { pageSchema } from '@schemas/pages';

export const collections = {
  compositions: defineCollection({
    loader: glob({ pattern: '**/*.json', base: 'src/content/compositions' }),
    schema: compositionSchema,
  }),
  bestiary: defineCollection({
    loader: glob({ pattern: '**/*.json', base: 'src/content/bestiary' }),
    schema: bestiarySchema,
  }),
  software: defineCollection({
    loader: glob({ pattern: '**/*.json', base: 'src/content/software' }),
    schema: softwareSchema,
  }),
  publications: defineCollection({
    loader: glob({ pattern: '**/*.json', base: 'src/content/publications' }),
    schema: publicationSchema,
  }),
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
    schema: blogSchema,
  }),
  performances: defineCollection({
    loader: glob({ pattern: '**/*.json', base: 'src/content/performances' }),
    schema: performanceSchema,
  }),
  pages: defineCollection({
    loader: glob({ pattern: '**/*.json', base: 'src/content/pages' }),
    schema: pageSchema,
  }),
};
