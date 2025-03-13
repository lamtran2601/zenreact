// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // default slot for layout entry
    });
  },
  enhanceApp({ app, router, siteData }) {
    // Register global components or other app enhancements
  },
};
