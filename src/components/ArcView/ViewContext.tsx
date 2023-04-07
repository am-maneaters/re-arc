import type MapView from '@arcgis/core/views/MapView';
import type SceneView from '@arcgis/core/views/SceneView';
import { createContext, useContext } from 'react';

export const MapContext = createContext<MapView | SceneView | undefined>(
  undefined
);

export function useView(): MapView | SceneView {
  const view = useContext(MapContext);

  if (!view) throw new Error(`useView must be used in a MapContext`);

  return view;
}

export function useMapView(): MapView {
  const view = useView();
  if (view.type === '3d')
    throw new Error(`useMapView must be used within a 2D MapContext`);

  return view;
}

export function useSceneView(): SceneView {
  const view = useView();
  if (view.type === '2d')
    throw new Error(`useSceneView must be used within a 3D MapContext`);

  return view;
}
