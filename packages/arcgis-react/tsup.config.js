import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.tsx'],
  clean: true,
  treeshake: true,
  dts: true,
  format: ['esm'],
  splitting: true,
  external: ['react', '@arcgis/core'],
  ignoreWatch: ['**/node_modules/**', '**/dist/**', '**/.turbo/**'],
});
