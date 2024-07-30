import type MapView from '@arcgis/core/views/MapView';
import type SceneView from '@arcgis/core/views/SceneView';

import { useView } from './ArcViewContext';

export function useCurrentView(
  defaultView?: MapView | SceneView,
): MapView | SceneView {
  const { current: view } = useView();

  if (!view) {
    if (defaultView) return defaultView;
    throw new Error(`useCurrentView must be used in a MapContext`);
  }

  return view;
}

export function useCurrentMapView(): MapView {
  const view = useCurrentView();
  if (view.type === '3d')
    throw new Error(`useCurrentMapView must be used within a 2D MapContext`);

  return view;
}

export function useCurrentSceneView(): SceneView {
  const view = useCurrentView();
  if (view.type === '2d')
    throw new Error(`useCurrentSceneView must be used within a 3D MapContext`);

  return view;
}
