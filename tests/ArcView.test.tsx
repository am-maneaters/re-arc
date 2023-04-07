import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import { cleanup, render, renderHook } from '@testing-library/react';
import { StrictMode } from 'react';
import { describe, expect, it, vitest } from 'vitest';

import { ArcMapView, ArcSceneView } from '../src';
import { useViewInit } from '../src/hooks/useView';

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
        <ArcSceneView
          map={map}
          style={{ height: '100vh' }}
          onViewCreated={(e) => {
            console.log(e);
          }}
        />
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

describe('test', () => {
  it('renders', async () => {
    const map = new Map({});

    const div = document.createElement('div');
    div.style.height = '100vh';
    document.body.append(div);

    const init = () => new MapView({ map, container: div });
    const { rerender, result } = renderHook((p) => useViewInit(p), {
      initialProps: init,
    });

    expect(result.current).toBeDefined();

    await result.current.when();

    console.log(result.current);
    rerender(init);
    console.log(result.current.center);
  });
});
