import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@arcgis/core/assets/esri/themes/dark/main.css';

import { MapStateProvider } from './hooks/MapStateContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TestsRouter } from './pages/ReactiveDemo';

// Create a root element for the application
const root = createRoot(document.querySelector('#root')!);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
// Render the application
root.render(
  <StrictMode>
    <MapStateProvider>
      <QueryClientProvider client={queryClient}>
        <TestsRouter />
      </QueryClientProvider>
    </MapStateProvider>
  </StrictMode>
);
