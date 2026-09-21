# jh.index

A personal archive site — photographs, drawings, essays, electronics, found
things. Built from design **4b**: one page, two modes, a five-strip index.

Static [Astro](https://astro.build) site, deployed to GitHub Pages by Actions
on every push to `main`.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:4321/didactic-potato/
npm run build    # -> dist/
npm run preview  # serve dist/ exactly as Pages will
npm run check    # types + Astro diagnostics
```

## Adding an entry

Drop a Markdown file in `src/content/log/`. The filename becomes the URL.

```markdown
---
title: Estuary, before the tide turned
date: 2026-09-16
category: photography     # photography | drawing | essays | electronics | found
kicker: FILM · 35MM       # the small mono line above the title
blurb: One or two sentences. Used on the strip, the rail and the log.
image: ./estuary.jpg      # optional — omit and the hatched placeholder stands in
imageAlt: Wet sand at low tide
slot: film scan · 4:5     # the text inside that placeholder
draft: false              # true hides it from production builds
---

The body, in Markdown.
```

That is the only step. The homepage strip counts, the featured item per
category, the "recently added" rail, the log, the category pages and the RSS
feed are all derived from these files — nothing to update by hand.

Images go next to the entry that uses them and are referenced relatively.
Astro processes and hashes them at build time. **Export at web sizes** (long
edge ~2000px, under ~300 KB); the originals belong in a backup, not in git.

## Turning the site off-white

`src/styles/global.css` holds both palettes as custom properties. The light
mode is not the dark one inverted — amber at full brightness disappears on
paper, so light mode uses a deeper burnt accent for small text and keeps the
amber only inside the near-black open strip, where it still has contrast to
work with. Everything else is shared, which is why this is one built page with
a toggle rather than two designs to maintain.

The toggle follows the system preference until someone overrides it; the
choice then persists in `localStorage`. An inline script in `src/layouts/
Base.astro` resolves the mode before first paint so the page never flashes.

## Deploying

Pushing to `main` builds and publishes. One-time setup:

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

The site then lives at `https://davejef374.github.io/didactic-potato/`.

### Custom domain

1. `astro.config.mjs`: set `site` to the domain, delete the `base` line.
2. Add `public/CNAME` containing just the domain.
3. Point DNS at GitHub Pages, then set the domain under Settings → Pages.

Every internal link goes through `url()` in `src/lib/site.ts`, so nothing else
needs changing.

## Layout

```
src/
  components/     Nav (+ theme toggle), Hero, Strips, RecentRail, EntryCard, Footer
  content/log/    the entries — one Markdown file each
  data/           the five categories, in page order
  layouts/        Base: head, fonts, theme script, nav + footer
  lib/            entry queries, date formatting, base-aware url()
  pages/          / · /log/ · /log/[slug]/ · /c/[category]/ · /about/ · /rss.xml
  styles/         global.css (both palettes), fonts.css + the woff2 files
```

### Notes

- **The five strips are CSS-only.** Five radios in one group and
  `:has(:checked)` do the opening — no JavaScript, so they work on first paint,
  and arrow-key navigation comes for free. On phones they stack.
- **Fonts are self-hosted** (`src/styles/fonts/`): Instrument Sans, Instrument
  Serif, JetBrains Mono, latin + latin-ext only, ~144 KB total. No font-CDN
  request when the page loads and no network call during the build, so a
  deploy cannot fail because Google Fonts had a bad afternoon. All three are
  SIL OFL 1.1 — see `src/styles/fonts/OFL.txt`.
- **The only JavaScript on the page** is the theme toggle and the inline
  pre-paint script that reads it. Everything else is HTML and CSS.
