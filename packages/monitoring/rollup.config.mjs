import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' assert { type: 'json' };

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'react/jsx-runtime',
];

const plugins = [
  resolve(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declarationDir: 'dist',
    exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
  }),
];

export default [
  // CommonJS (for Node) build
  {
    input: 'src/index.ts',
    external,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins,
  },
  // ESM (for bundlers) build
  {
    input: 'src/index.ts',
    external,
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins,
  },
];
