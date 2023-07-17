import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'components/**/*.tsx',
    'components/**/*.ts',
    'hooks/**/*.tsx',
    'hooks/**/*.ts',
    'index.tsx',
  ],
  clean: true,
  treeshake: true,
  dts: true,
  format: ['esm'],
  splitting: true,
  external: ['react', '@arcgis/core'],
  ignoreWatch: ['**/node_modules/**', '**/dist/**', '**/.turbo/**'],
  bundle: false,
  skipNodeModulesBundle: true,
  target: 'es2020',
});
