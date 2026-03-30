import { z } from 'astro:content';

const movementSchema = z.object({
  number: z.number(),
  title: z.string(),
  duration: z.string(),
  description: z.string().optional(),
});

const assetSchema = z.object({
  title: z.string(),
  type: z.enum(['score', 'parts', 'audio', 'electronics', 'recording', 'performance-notes']),
  meta: z.string(),
  fileRef: z.string().optional(),
  purchasable: z.boolean().default(false),
  browsable: z.boolean().default(false),
});

const videoSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  embedId: z.string().optional(),
  detail: z.string(),
  badge: z.string(),
});

const versionSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  badge: z.string(),
  isCurrent: z.boolean().default(false),
  linkedId: z.string().optional(),
});

const performanceRefSchema = z.object({
  date: z.string(),
  ensemble: z.string(),
  venue: z.string(),
  city: z.string().optional(),
  country: z.string().optional(),
  recordingRef: z.string().optional(),
  notes: z.string().optional(),
});

const licensingSchema = z.object({
  available: z.boolean().default(true),
  category: z.enum(['solo', 'chamber', 'largeEnsemble', 'orchestral']),
  priceOverride: z.number().nullable().default(null),
  performanceFee: z.string().optional(),
  recordingFee: z.string().optional(),
  scorePrice: z.number().nullable().default(null),
  partsRental: z.string().optional(),
  includes: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

const relatedWorkSchema = z.object({
  compositionId: z.string(),
  connectionType: z.enum([
    'version', 'arrangement', 'sequel', 'companion',
    'shares-material', 'response-to', 'extracted-from',
  ]),
  label: z.string().optional(),
});

const tagGroupSchema = z.object({
  character: z.array(z.string()).default([]),
  tonality: z.array(z.string()).default([]),
  tempo: z.array(z.string()).default([]),
  technique: z.array(z.string()).default([]),
  instrumentation: z.array(z.string()).default([]),
  difficulty: z.array(z.string()).default([]),
});

export const compositionSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  year: z.number(),
  duration: z.string(),
  movements: z.array(movementSchema).default([]),
  status: z.enum(['published', 'draft', 'wip']),
  visibility: z.enum(['public', 'unlisted', 'private']).default('public'),
  commission: z.string().optional(),
  dedication: z.string().optional(),
  premiere: z.string().optional(),
  instrumentation: z.string(),
  instrumentationDetail: z.string().optional(),
  programNote: z.string().optional(),
  tags: tagGroupSchema.default({
    character: [], tonality: [], tempo: [],
    technique: [], instrumentation: [], difficulty: [],
  }),
  assets: z.array(assetSchema).default([]),
  videos: z.array(videoSchema).default([]),
  versions: z.array(versionSchema).default([]),
  performances: z.array(performanceRefSchema).default([]),
  licensing: licensingSchema.optional(),
  technicalRequirements: z.string().optional(),
  relatedWorks: z.array(relatedWorkSchema).default([]),
});
