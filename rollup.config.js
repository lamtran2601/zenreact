import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

const createConfig = () => ({
  input: 'packages/core/src/index.ts',
  external: ['react', 'react-dom'],
  plugins: [
    typescript({
      tsconfig: './packages/core/tsconfig.json',
      declaration: true,
      declarationDir: 'packages/core/dist',
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**'],
    }),
    resolve(),
    commonjs(),
    isProduction && terser(),
  ].filter(Boolean),
  output: [
    {
      file: 'packages/core/dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'packages/core/dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
});

export default createConfig();
