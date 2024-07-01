import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import WebMap from '@arcgis/core/WebMap';
import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';

import { useEventHandlers } from '../../hooks/useEventHandlers';
import { ArcViewWrapperProps, EsriView } from '../../typings/EsriTypes';
import { ArcViewContext } from '../ArcView/ArcViewContext';
import { ArcReactiveProp } from './ArcReactiveProp';
import { isEqual } from './isEqual';

// Properties set during initialization and not designed to be reactive. For example
// "alphaCompositingEnabled" cannot be changed after a SceneView is created.
const INIT_ONLY_PROPERTIES = new Set(['map', 'alphaCompositingEnabled']);

export const MapContext = createContext<MapView | SceneView | undefined>(
  undefined
);

export function createViewComponent<
  ViewConstructor extends EsriView,
  View extends InstanceType<ViewConstructor>
>(
  ViewConstructor: ViewConstructor
): React.FC<ArcViewWrapperProps<ViewConstructor, View>> {
  const ArcView: React.FC<ArcViewWrapperProps<ViewConstructor, View>> = ({
    children,
    onViewCreated,
    style,
    className,
    map,
    eventHandlers,
    ...mapViewProps
  }) => {
    const mapView = useMemo(
      () =>
        new ViewConstructor({
          map:
            map && 'constructed' in map && map.constructed
              ? (map as __esri.MapProperties)
              : new WebMap(map ?? { basemap: 'arcgis-dark-gray' }),
          ...(mapViewProps as
            | __esri.MapViewProperties
            | __esri.SceneViewProperties),
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    const mapContainer = useRef<HTMLDivElement>(null);

    const internalId = useId();
    const id = mapViewProps.id ?? internalId;

    const mountedViewsContext = useContext(ArcViewContext);
    const { onViewMount, onViewUnmount } = mountedViewsContext ?? {};

    useEffect(() => {
      if (!mapContainer.current) return;
      mapView.container = mapContainer.current;
      mapView.when(() => {
        onViewCreated?.(mapView as View);
      });

      onViewMount?.(mapView, id);

      return () => {
        // @ts-expect-error - container types are wrong
        mapView.container = undefined;
        onViewUnmount?.(id);
      };
    }, [mapView, onViewCreated, id, onViewMount, onViewUnmount]);

    useEventHandlers(mapView, eventHandlers);

    return (
      <MapContext.Provider value={mapView}>
        <div ref={mapContainer} id={id} style={style} className={className}>
          {mapView && children}
        </div>
        {Object.entries(mapViewProps).map(([key, value]) => {
          if (INIT_ONLY_PROPERTIES.has(key)) return null;
          return (
            <ArcReactiveProp
              key={key}
              accessor={mapView}
              property={key}
              value={value}
            />
          );
        })}
      </MapContext.Provider>
    );
  };
  return memo(ArcView, isEqual);
}
