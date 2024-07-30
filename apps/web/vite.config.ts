import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: resolve(
            'node_modules',
            '@esri',
            'calcite-components',
            'dist',
            'calcite',
            'assets',
          ),
          dest: '.',
        },
      ],
    }),
  ],
  publicDir: 'public/',
  build: {
    outDir: 'dist/',
  },
  esbuild: {
    treeShaking: true,
  },
});
