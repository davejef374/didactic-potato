export const SITE = {
  /** Shown in the wordmark as "jh.index" — the part before the dot. */
  handle: 'jh',
  title: 'jh.index',
  author: 'J. H.',
  description:
    'A working archive: photographs on film, drawings in ink, essays, and machines that emit light.',
} as const;

/**
 * Build an internal href that respects the configured `base`, so the site
 * works both at davejef374.github.io/didactic-potato and at a bare domain.
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL;
  return `${base}/${path}`.replace(/\/{2,}/g, '/');
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];

/** "14 SEPT" — the mono date format used on the cards and strips. Zero-padded,
 *  so a column of dates stays a column. */
export function shortDate(d: Date): string {
  return `${String(d.getUTCDate()).padStart(2, '0')} ${MONTHS[d.getUTCMonth()]}`;
}

/** "14 September 2026" — for entry pages, where there is room. */
export function longDate(d: Date): string {
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export const isoDate = (d: Date): string => d.toISOString().slice(0, 10);
