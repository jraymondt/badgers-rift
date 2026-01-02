// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import db from '@astrojs/db';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://spiritualperfection.com.au',
  server: {
	checkOrigin: ["https://spiritualperfection.com.au", "https://www.spiritualperfection.com.au"]

  },
  integrations: [mdx(), sitemap(), db()],

  adapter: node({
    mode: 'standalone'
  })
});
