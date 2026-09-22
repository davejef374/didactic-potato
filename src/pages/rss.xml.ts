import type { APIRoute } from 'astro';
import { allEntries } from '../lib/entries';
import { SITE } from '../lib/site';

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL('https://example.com');
  const base = import.meta.env.BASE_URL;
  const abs = (path: string) => new URL(`${base}/${path}`.replace(/\/{2,}/g, '/'), origin).href;

  const entries = await allEntries();

  const items = entries
    .map(
      (e) => `    <item>
      <title>${esc(e.data.title)}</title>
      <link>${abs(`log/${e.id}/`)}</link>
      <guid isPermaLink="true">${abs(`log/${e.id}/`)}</guid>
      <description>${esc(e.data.blurb)}</description>
      <category>${esc(e.data.category)}</category>
      <pubDate>${e.data.date.toUTCString()}</pubDate>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${abs('')}</link>
    <description>${esc(SITE.description)}</description>
    <language>en</language>
    <atom:link href="${abs('rss.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
