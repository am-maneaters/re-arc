import WebMap from '@arcgis/core/WebMap';
import { cleanup, render } from '@testing-library/react';
import { StrictMode } from 'react';
import { describe, expect, it, vitest } from 'vitest';

import { ArcMapView, ArcSceneView } from '../src';

// lol the arcgis api doesn't seem to have any good testing resources...
vitest.mock(
  '@arcgis/core/views/MapView',
  async () => import('@arcgis/core/views/View')
);
vitest.mock(
  '@arcgis/core/views/SceneView',
  async () => import('@arcgis/core/views/View')
);

describe('ArcView', () => {
  it('renders sceneview', () => {
    const map = new WebMap({ basemap: 'streets-vector' });
    const { container } = render(
      <StrictMode>
        <ArcSceneView map={map} style={{ height: '100vh' }} />
      </StrictMode>
    );
    expect(container).toMatchSnapshot();

    cleanup();
    expect(container).toMatchSnapshot();
  });

  it('renders mapview', () => {
    const { container } = render(<ArcMapView />);
    expect(container).toMatchSnapshot();
    cleanup();
    expect(container).toMatchSnapshot();
  });
});
