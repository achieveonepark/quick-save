import path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(import.meta.dirname, 'content/rspress-docs'),
  outDir: 'out',
  base: '/quick-save/',
  title: 'Quick Save',
  description: 'Quick Save documentation',
  lang: 'ko-KR',
  locales: [
    { lang: 'ko', label: '한국어' },
    { lang: 'en', label: 'English' },
    { lang: 'ja', label: '日本語' },
    { lang: 'zh', label: '简体中文' },
  ],
  route: { localeRedirect: 'never' },
  logo: {
    light: '/logo.svg',
    dark: '/logo.svg',
  },
  globalStyles: path.join(import.meta.dirname, 'global.css'),
  themeConfig: {
    darkMode: 'dark',
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/achieveonepark/quick-save',
      },
    ],
  },
});
