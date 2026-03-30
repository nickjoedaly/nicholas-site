import { z } from 'astro:content';

export const publicationSchema = z.object({
  title: z.string(),
  type: z.enum(['thesis', 'paper', 'conference', 'chapter']),
  venue: z.string(),
  year: z.number(),
  abstract: z.string().optional(),
  pdfRef: z.string().optional(),
  doi: z.string().optional(),
  authors: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
});
