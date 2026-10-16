import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/open-firenet-card.ts',
  output: {
    file: 'dist/open-firenet-card.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
      include: ['src/**/*.ts'],
      noForceEmit: true,
    }),
    terser({
      format: { comments: false },
    }),
  ],
};
