import { z } from 'astro:content';

export const blogSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['published', 'draft']).default('draft'),
  excerpt: z.string().optional(),
  category: z.enum(['essay', 'program-note', 'reflection']),
});
