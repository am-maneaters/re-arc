/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'arcgis-react-utils',
      fileName: `arcgis-react-utils`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@arcgis/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@arcgis/core': 'esri',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  plugins: [react()],
});
