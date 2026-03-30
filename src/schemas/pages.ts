import { z } from 'astro:content';

const cvEntrySchema = z.object({
  year: z.string(),
  title: z.string(),
  detail: z.string().optional(),
});

const cvCategorySchema = z.object({
  category: z.string(),
  items: z.array(cvEntrySchema),
});

const socialLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
  label: z.string().optional(),
});

const homepageSectionSchema = z.object({
  type: z.string(),
  visible: z.boolean().default(true),
});

export const aboutPageSchema = z.object({
  pageType: z.literal('about'),
  bio: z.string(),
  artistStatement: z.string().optional(),
  cv: z.array(cvCategorySchema).default([]),
  email: z.string(),
  location: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).default([]),
});

export const homepageSchema = z.object({
  pageType: z.literal('homepage'),
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  featuredCompositionId: z.string().optional(),
  sections: z.array(homepageSectionSchema).default([]),
});

export const pageSchema = z.discriminatedUnion('pageType', [
  aboutPageSchema,
  homepageSchema,
]);
