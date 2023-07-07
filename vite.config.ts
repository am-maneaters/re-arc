import * as path from 'node:path';

import react from '@vitejs/plugin-react-swc';
import copy from 'rollup-plugin-copy';
import dts from 'vite-plugin-dts';
import { defineConfig, UserConfig } from 'vitest/config';

const libraryConfig: UserConfig = {
  plugins: [
    react(),
    dts({
      outputDir: 'dist',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
  ],

  publicDir: false,

  build: {
    lib: {
      formats: ['es'],
      entry: 'src/index.tsx',
      name: 'CalciteReactUtils',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', /@arcgis\/core\/.*/],
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
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
  },
};

const exampleAppConfig: UserConfig = {
  plugins: [
    react(),
    copy({
      // copy over the calcite-components assets
      targets: [
        {
          src: 'node_modules/@esri/calcite-components/dist/calcite/assets/',
          dest: 'examples/public/',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      'arcgis-react': path.resolve(__dirname, 'src/'),
    },
  },
  publicDir: 'examples/public/',
  build: {
    outDir: 'examples/dist/',
  },
};

// https://vitejs.dev/config/
export default defineConfig((props) => {
  if (props.mode === 'library') {
    return libraryConfig;
  }
  return exampleAppConfig;
});
