import { z } from 'astro:content';

export const bestiarySchema = z.object({
  name: z.string(),
  suite: z.enum([
    'Harmony', 'Rhythm', 'Instrumentation', 'Form',
    'Timbre', 'Melody', 'Development',
  ]),
  type: z.enum(['Generative', 'Workshop', 'Constraint', 'Wonder']),
  desc: z.string(),
  prompt: z.string(),
  color: z.string(),
  bgColor: z.string(),
  cardNumber: z.string(),
  illustration: z.string().optional(),
  tier: z.enum(['free', 'premium']).default('free'),
});
