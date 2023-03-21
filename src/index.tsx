import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@arcgis/core/assets/esri/themes/dark/main.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './pages/App';

// Create a root element for the application
const root = createRoot(document.querySelector('#root') as HTMLElement);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

import { defineCustomElements } from '@esri/calcite-components/dist/loader';

// CDN hosted assets
defineCustomElements(window);

// Render the application
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
