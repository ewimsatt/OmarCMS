// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.omarcms.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize: (item) => {
        // Homepage gets highest priority
        if (item.url === 'https://omarcms.com/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Blog posts get high priority
        else if (item.url.includes('/blog/') && !item.url.endsWith('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Blog index
        else if (item.url.endsWith('/blog/')) {
          item.priority = 0.9;
          item.changefreq = 'daily';
        }
        // Docs pages
        else if (item.url.includes('/docs/')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        }
        // About page
        else if (item.url.includes('/about')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
