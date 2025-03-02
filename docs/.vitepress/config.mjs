import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ZenReact',
  description: 'High-performance React state management and rendering optimization',
  lang: 'en-US',
  lastUpdated: true,

  themeConfig: {
    // Site logo and title
    logo: '/logo.png',
    siteTitle: 'ZenReact',

    // Navigation bar
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
      {
        text: 'Community',
        items: [
          { text: 'Discord', link: 'https://discord.gg/zenreact' },
          { text: 'GitHub', link: 'https://github.com/lamtran2601/zenreact' },
          { text: 'Twitter', link: 'https://twitter.com/zenreact' },
        ],
      },
    ],

    // Sidebar configuration
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Installation', link: '/guide/installation' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Optimization Basics', link: '/guide/optimization-basics' },
            { text: 'State Management', link: '/guide/state-management' },
            { text: 'Best Practices', link: '/guide/best-practices' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Core API',
          items: [
            { text: 'withOptimization', link: '/api/with-optimization' },
            { text: 'useOptimizedState', link: '/api/use-optimized-state' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Basic Examples',
          items: [
            { text: 'Component Optimization', link: '/examples/component-optimization' },
            { text: 'State Updates', link: '/examples/state-updates' },
          ],
        },
        {
          text: 'Advanced Examples',
          items: [
            { text: 'Complex Components', link: '/examples/complex-components' },
            { text: 'Performance Patterns', link: '/examples/performance-patterns' },
          ],
        },
      ],
    },

    // Footer configuration
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 ZenReact',
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lamtran2601/zenreact' },
      { icon: 'twitter', link: 'https://twitter.com/zenreact' },
      { icon: 'discord', link: 'https://discord.gg/zenreact' },
    ],

    // Search configuration
    search: {
      provider: 'local',
    },

    // Documentation features
    editLink: {
      pattern: 'https://github.com/lamtran2601/zenreact/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
});
