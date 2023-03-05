import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@arcgis/core/assets/esri/themes/dark/main.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './pages/App';

import './calcite-imports';

// Create a root element for the application
const root = createRoot(document.querySelector('#root')!);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

import { setAssetPath } from '@esri/calcite-components/dist/components';

// CDN hosted assets
setAssetPath('https://js.arcgis.com/calcite-components/1.0.3/assets');

// Render the application
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
