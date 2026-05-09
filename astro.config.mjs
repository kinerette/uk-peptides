import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://uk-peptides.eu',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/checkout') &&
        !page.includes('/order-confirmed') &&
        !page.includes('/api/'),
    }),
  ],
});
