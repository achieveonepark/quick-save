import { defineConfig } from 'vitepress'

const koSidebar = [
  {
    text: '시작하기',
    items: [
      { text: '설치', link: '/installation' },
      { text: '빠른 시작', link: '/quickstart' },
    ]
  },
  {
    text: '가이드',
    items: [
      { text: '기본 사용법', link: '/guide/basic' },
      { text: '비동기 저장 / 로드', link: '/guide/async' },
      { text: '암호화 & 버전 관리', link: '/guide/encryption' },
    ]
  },
  {
    text: 'API 레퍼런스',
    items: [
      { text: 'Builder', link: '/api/builder' },
      { text: 'QuickSave<T> 메서드', link: '/api/methods' },
    ]
  },
  {
    text: '기타',
    items: [
      { text: '변경 이력', link: '/changelog' },
    ]
  }
]

const enSidebar = [
  {
    text: 'Getting Started',
    items: [
      { text: 'Installation', link: '/en/installation' },
      { text: 'Quick Start', link: '/en/quickstart' },
    ]
  },
  {
    text: 'Guide',
    items: [
      { text: 'Basic Usage', link: '/en/guide/basic' },
      { text: 'Async Save / Load', link: '/en/guide/async' },
      { text: 'Encryption & Versioning', link: '/en/guide/encryption' },
    ]
  },
  {
    text: 'API Reference',
    items: [
      { text: 'Builder', link: '/en/api/builder' },
      { text: 'QuickSave<T> Methods', link: '/en/api/methods' },
    ]
  },
  {
    text: 'More',
    items: [
      { text: 'Changelog', link: '/en/changelog' },
    ]
  }
]

export default defineConfig({
  title: 'Quick Save',
  base: '/quick-save/',

  locales: {
    root: {
      label: '한국어',
      lang: 'ko',
      themeConfig: {
        nav: [
          { text: '홈', link: '/' },
          { text: '가이드', link: '/quickstart' },
          { text: 'API', link: '/api/builder' },
        ],
        sidebar: koSidebar,
        outline: { label: '목차' },
        docFooter: { prev: '이전', next: '다음' },
        returnToTopLabel: '맨 위로',
        sidebarMenuLabel: '메뉴',
        darkModeSwitchLabel: '테마',
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/quickstart' },
          { text: 'API', link: '/en/api/builder' },
        ],
        sidebar: enSidebar,
        outline: { label: 'On this page' },
        docFooter: { prev: 'Previous', next: 'Next' },
      }
    }
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/achieveonepark/quick-save' }
    ],
    search: { provider: 'local' },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Achieveone'
    }
  }
})
