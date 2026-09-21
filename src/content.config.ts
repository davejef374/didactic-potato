import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './data/categories';

const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.enum(CATEGORY_SLUGS),
      /** Small mono line above the title — "FILM · 35MM", "1,400 WORDS". */
      kicker: z.string(),
      /** One or two sentences. Used on the strip, the rail and the log. */
      blurb: z.string(),
      /** Optional. Without one, the hatched placeholder stands in. */
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** Text shown inside the placeholder when there is no image. */
      slot: z.string().default('no image yet'),
      draft: z.boolean().default(false),
    }),
});

export const collections = { log };
