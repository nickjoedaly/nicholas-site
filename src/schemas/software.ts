import { z } from 'astro:content';

const versionEntrySchema = z.object({
  version: z.string(),
  date: z.string(),
  notes: z.string(),
});

const changelogEntrySchema = z.object({
  version: z.string(),
  items: z.array(z.string()),
});

export const softwareSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  type: z.enum(['MuseScore Plugin', 'Web App']),
  badge: z.enum(['Paid', 'Free', 'Free to try']),
  features: z.array(z.string()).default([]),
  versionHistory: z.array(versionEntrySchema).default([]),
  price: z.number().nullable().default(null),
  downloadLink: z.string().optional(),
  documentationLink: z.string().optional(),
  githubLink: z.string().optional(),
  changelog: z.array(changelogEntrySchema).default([]),
  screenshots: z.array(z.string()).default([]),
  diagnosticCategories: z.array(z.string()).default([]),
});
