import path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(import.meta.dirname, 'content/rspress-docs'),
  outDir: 'out',
  base: '/quick-save/',
  title: 'Quick Save',
  description: 'Quick Save documentation',
  lang: 'ko',
  logo: {
    light: '/logo.svg',
    dark: '/logo.svg',
  },
  globalStyles: path.join(import.meta.dirname, 'global.css'),
  themeConfig: {
    darkMode: 'dark',
    nav: [
      { text: '한국어', link: '/ko/' },
      { text: 'English', link: '/en/' },
      { text: '日本語', link: '/ja/' },
      { text: '中文', link: '/zh/' },
    ],
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/achieveonepark/quick-save',
      },
    ],
  },
});
