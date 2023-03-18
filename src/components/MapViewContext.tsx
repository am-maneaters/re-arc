import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/WebMap';
import SceneView from '@arcgis/core/views/SceneView';
import React, { createContext, memo, useEffect, useId, useRef } from 'react';
import isEqual from 'react-fast-compare';

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
    throw new Error(`useSceneView must be used within a 3D MapContext`);

  return view;
}

type ArcViewProps<View extends __esri.MapView | __esri.SceneView> = {
  children: React.ReactNode;
  init: () => View;
  onViewCreated?: (view: View) => void;
  style?: React.CSSProperties;
  className?: string;
};

export const ArcView = <View extends __esri.MapView | __esri.SceneView>({
  children,
  init,
  onViewCreated,
  className,
  style,
}: ArcViewProps<View>) => {
  const [mapView, setMapView] = React.useState<MapView | SceneView>();
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const view = init();
    view.container = mapContainer.current;

    view.when(() => {
      setMapView(view);

      onViewCreated?.(view as View);
    });

    return () => {
      view.container = undefined;
    };
  }, []);

  return (
    <MapContext.Provider value={mapView}>
      <div ref={mapContainer} style={style} className={className}>
        {mapView && children}
      </div>
    </MapContext.Provider>
  );
};

const createViewComponent = <
  ViewConstructor extends typeof __esri.MapView | typeof __esri.SceneView,
  View extends ViewConstructor extends typeof __esri.MapView
    ? __esri.MapView
    : __esri.SceneView,
  ViewProps extends View extends __esri.MapView
    ? __esri.MapViewProperties
    : __esri.SceneViewProperties
>(
  ViewConstructor: ViewConstructor
) => {
  const ArcMapView = ({
    children,
    onViewCreated,
    style,
    className,
    map,
    ...mapViewProps
  }: Omit<ArcViewProps<View>, 'init'> &
    ViewProps & { map: __esri.WebMapProperties }) => {
    const id = useId();

    const initCallback = React.useCallback(
      () =>
        new ViewConstructor({
          map: map?.constructed ? map : new Map(map),
          ...mapViewProps,
        }),
      [map, mapViewProps]
    );

    return (
      <ArcView
        key={id}
        init={initCallback}
        onViewCreated={onViewCreated}
        style={style}
        className={className}
      >
        {children}
      </ArcView>
    );
  };
  return memo(ArcMapView, isEqual);
};

export const ArcMapView = createViewComponent(MapView);
export const ArcSceneView = createViewComponent(SceneView);
