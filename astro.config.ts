// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './src/plugins/readingTime';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Icons from 'unplugin-icons/vite';
import sitemap from '@astrojs/sitemap';

const currentDir = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://mikayil.dev',
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'gruvbox-dark-hard',
    },
  },
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${join(currentDir, './src/assets/styles/mixins')}" as *;`,
        },
      },
    },
  },
});
