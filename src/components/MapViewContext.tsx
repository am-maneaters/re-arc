import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import React, { HTMLAttributes, createContext, useEffect, useRef } from 'react';

const MapContext = createContext<MapView | SceneView | undefined>(undefined);

export function useView() {
  const view = React.useContext(MapContext);

  if (!view) throw new Error(`useMapView must be used within a MapContext`);

  return view;
}

export function useMapView() {
  const view = useView();
  if (view.type === '3d')
    throw new Error(`useMapView must be used within a 2D MapContext`);

  return view;
}

export function useSceneView() {
  const view = useView();
  if (view.type === '2d')
    throw new Error(`useMapView must be used within a 3D MapContext`);

  return view;
}

export const ArcView = <
  View extends __esri.MapView | __esri.SceneView,
  ViewCreated extends (view: View) => void
>({
  children,
  init,
  onViewCreated,
  reactiveProps,
  ...divAttributes
}: {
  init: () => View;
  onViewCreated: ViewCreated;
  reactiveProps?: Partial<View>;
} & HTMLAttributes<HTMLDivElement>) => {
  const [mapView, setMapView] = React.useState<MapView | SceneView>();
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const view = init();
    view.container = mapContainer.current;

    view.when(() => {
      setMapView(view);

      onViewCreated?.(view);
    });

    return () => {
      mapView?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapView || !reactiveProps) return;

    mapView.set(reactiveProps);
  }, [mapView, reactiveProps]);

  return (
    <MapContext.Provider value={mapView}>
      <div ref={mapContainer} {...divAttributes}>
        {mapView && children}
      </div>
    </MapContext.Provider>
  );
};
