import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import React, {
  HTMLAttributes,
  createContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

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

type MapViewComponentProps<View extends __esri.MapView | __esri.SceneView> = {
  children?: React.ReactNode;
  initView: () => View;
  onViewCreated?: (view: View) => void;
  reactiveProps: Partial<View>;
} & HTMLAttributes<HTMLDivElement>;

export default function MapViewComponent<
  View extends __esri.MapView | __esri.SceneView
>({
  children,
  initView,
  onViewCreated,
  reactiveProps,
  ...divAttributes
}: MapViewComponentProps<View>) {
  const [mapView, setMapView] = React.useState<MapView | SceneView>();
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const view = initView();
    view.container = mapContainer.current;

    view.when(() => {
      setMapView(view);

      if (onViewCreated) onViewCreated(view);
    });

    return () => {
      setMapView(undefined);
    };
  }, []);

  useLayoutEffect(() => {
    if (!mapView) return;

    mapView.set(reactiveProps);
  }, [mapView, reactiveProps]);

  return (
    <MapContext.Provider value={mapView}>
      <div>
        <div ref={mapContainer} {...divAttributes}>
          {mapView && children}
        </div>
      </div>
    </MapContext.Provider>
  );
}
