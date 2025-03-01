import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

const baseConfig = {
  external: ['react', 'react-dom'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
    }),
    resolve(),
    commonjs(),
    isProduction && terser(),
  ].filter(Boolean),
};

export default [
  {
    ...baseConfig,
    input: 'packages/core/src/index.ts',
    output: [
      {
        file: 'packages/core/dist/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
  {
    ...baseConfig,
    input: 'packages/monitor/src/index.ts',
    output: [
      {
        file: 'packages/monitor/dist/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
];
