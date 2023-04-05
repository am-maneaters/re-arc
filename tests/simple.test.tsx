import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, vitest } from 'vitest';

import { ArcMapView, ArcSceneView } from '../src';

// lol the arcgis api doesn't seem to have any good testing resources...
vitest.mock('@arcgis/core/views/MapView', async () => ({
  default: class MapView {
    constructor() {}

    when() {
      return Promise.resolve();
    }
  },
  // your mocked methods
}));
vitest.mock('@arcgis/core/views/SceneView', async () => ({
  default: class SceneView {
    constructor() {}
    when() {
      return Promise.resolve();
    }
  },

  // your mocked methods
}));
vitest.mock('@arcgis/core/WebMap', () => ({
  default: class WebMap {
    constructor() {
      return {};
    }
  },
}));

describe('App', () => {
  it('renders sceneview', () => {
    render(<ArcSceneView />);

    screen.debug();
    // check if App components renders headline
  });

  it('renders mapview', () => {
    render(<ArcMapView />);

    screen.debug();
    // check if App components renders headline
    cleanup();
    screen;
  });
});
