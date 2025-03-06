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
      { text: 'Blog', link: '/blog/' },
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
      '/blog/': [
        {
          text: 'Software Development Fundamentals',
          items: [
            {
              text: 'Software Development Optimization Practices',
              link: '/blog/software-development-practices',
            },
            {
              text: 'React Developer Pain Points',
              link: '/blog/react-developer-pain-points',
            },
          ],
        },
        {
          text: 'Application Architecture',
          items: [
            {
              text: 'Building Maintainable React Apps',
              link: '/blog/building-maintainable-react-apps',
            },
          ],
        },
        {
          text: 'Performance & State Management',
          items: [
            { text: 'Modern State Management', link: '/blog/modern-state-management' },
            { text: 'Optimizing React Performance', link: '/blog/optimizing-react-performance' },
          ],
        },
        {
          text: 'Future Trends',
          items: [
            { text: 'Future of React Development', link: '/blog/future-of-react-development' },
            {
              text: 'AI-Optimized React Development',
              link: '/blog/ai-optimized-react-development',
            },
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
      pattern: 'https://github.com/lamtran2601/zenreact/edit/main/page/:path',
      text: 'Edit this page on GitHub',
    },
  },
});
