// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANT (SEO): change `site` to the clinic's real production domain before
// going live. It drives canonical URLs, the sitemap, and Open Graph URLs.
const SITE = 'https://surecareclinic.com';
// DEPLOY_BASE is injected by GitHub Actions for the Pages subdirectory.
// Empty for local dev and production domain deploys.
const BASE = process.env.DEPLOY_BASE || '';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    // Emit /about/index.html so clean URLs (/about) work on any static host
    format: 'directory',
  },
});
