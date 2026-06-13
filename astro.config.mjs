// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANT (SEO): change `site` to the clinic's real production domain before
// going live. It drives canonical URLs, the sitemap, and Open Graph URLs.
const SITE = 'https://surecareclinic.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    // Emit /about/index.html so clean URLs (/about) work on any static host
    format: 'directory',
  },
});
