import { cleanup, render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

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

describe('ArcView', () => {
  it('renders sceneview', () => {
    const { container } = render(<ArcSceneView />);
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
