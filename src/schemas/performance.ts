import { z } from 'astro:content';

export const performanceSchema = z.object({
  date: z.string(),
  venue: z.string(),
  city: z.string(),
  country: z.string().optional(),
  ensemble: z.string(),
  program: z.array(z.string()).default([]),
  recordingRefs: z.array(z.string()).default([]),
  submittedBy: z.string().nullable().default(null),
  approved: z.boolean().default(true),
  notes: z.string().optional(),
});
