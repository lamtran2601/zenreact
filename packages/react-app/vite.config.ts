import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // new version tailwindcss install
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    tailwindcss(), // new version tailwindcss install
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // or 'sunburst', 'network'
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers'],
          'date-vendor': ['date-fns'],
          'ui-vendor': ['class-variance-authority'],
        },
      },
    },
    // Generate stats.json for performance analysis
    reportCompressedSize: true,
  },
});
