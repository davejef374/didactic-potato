import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES, type CategorySlug } from '../data/categories';

export type Entry = CollectionEntry<'log'>;

/** Every published entry, newest first. Drafts are dropped in production. */
export async function allEntries(): Promise<Entry[]> {
  const entries = await getCollection('log', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function entriesIn(slug: CategorySlug): Promise<Entry[]> {
  return (await allEntries()).filter((e) => e.data.category === slug);
}

/**
 * The homepage strips: each category with its real count, the newest entry as
 * the featured one, and the next three as thumbnails. Categories with nothing
 * in them yet still render — they just read "0 ITEMS" and say so honestly.
 */
export async function strips() {
  const entries = await allEntries();
  return CATEGORIES.map((category) => {
    const mine = entries.filter((e) => e.data.category === category.slug);
    const [featured, ...rest] = mine;
    return { category, count: mine.length, featured, thumbs: rest.slice(0, 3) };
  });
}

export type Strip = Awaited<ReturnType<typeof strips>>[number];
