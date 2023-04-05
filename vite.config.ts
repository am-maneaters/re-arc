/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
  publicDir: 'examples/public/',
  build: {
    outDir: 'examples/dist/',
  },
};

// https://vitejs.dev/config/
export default defineConfig((props) => {
  if (props.command === 'build' && props.mode === 'library') {
    return libraryConfig;
  }
  return exampleAppConfig;
});
