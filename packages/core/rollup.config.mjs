// @ts-check
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import analyze from 'rollup-plugin-analyzer';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  cache: false,
  input: 'src/index.ts',
  external: ['react', 'react-dom'],
  treeshake: {
    propertyReadSideEffects: false,
    moduleSideEffects: false,
    tryCatchDeoptimization: false,
    unknownGlobalSideEffects: false,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**', '**/setupTests.ts'],
    }),
    resolve({
      extensions: ['.ts', '.tsx'],
    }),
    commonjs(),
    isProduction &&
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          passes: 3,
        },
        mangle: {
          properties: {
            regex: /^_/,
          },
        },
      }),
    analyze({
      summaryOnly: true,
      limit: 10,
    }),
  ].filter(Boolean),
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: isProduction,
      exports: 'named',
      compact: true,
      hoistTransitiveImports: false,
      generatedCode: {
        preset: 'es2015',
        arrowFunctions: true,
        constBindings: true,
        objectShorthand: true,
      },
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: isProduction,
      compact: true,
      hoistTransitiveImports: false,
      generatedCode: {
        preset: 'es2015',
        arrowFunctions: true,
        constBindings: true,
        objectShorthand: true,
      },
    },
  ],
});
