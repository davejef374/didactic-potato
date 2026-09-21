// @ts-check
import { defineConfig } from 'astro/config';

// ── Where this site lives ────────────────────────────────────────────────
// Project site on GitHub Pages: https://<user>.github.io/<repo>
// Moving to a custom domain later? Set `site` to it, delete `base`, and drop
// the domain into `public/CNAME`. Nothing else in the codebase needs touching.
const site = 'https://davejef374.github.io';
const base = '/didactic-potato';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
});
