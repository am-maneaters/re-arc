import WebMap from '@arcgis/core/WebMap';
import React, { memo, useEffect, useId, useRef } from 'react';
import isEqual from 'react-fast-compare';

import { useViewInit } from '../../hooks/useView';
import { EventHandlers } from '../../typings/EsriTypes';
import { ArcReactiveProp } from '../util/ArcReactiveProp';
import { MapContext } from './ViewContext';

type ArcViewProps<View extends __esri.MapView | __esri.SceneView> = {
  children?: React.ReactNode;
  init: () => View;
  onViewCreated?: (view: View) => void;
  style?: React.CSSProperties;
  className?: string;
  eventHandlers?: EventHandlers<View>;
};

const ArcView = <View extends __esri.MapView | __esri.SceneView>({
  children,
  init,
  onViewCreated,
  className,
  style,
  eventHandlers,
  mapViewProps,
}: ArcViewProps<View> & { mapViewProps: any }) => {
  const mapView = useViewInit(init);
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapView.container = mapContainer.current;

    mapView.when(() => {
      onViewCreated?.(mapView as View);
    });

    return () => {
      // @ts-expect-error - unset the view container
      mapView.container = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapView]);

  useEffect(() => {
    if (mapView === undefined || !eventHandlers) return;
    const handles = Object.entries(eventHandlers).map(([event, handler]) =>
      mapView.on(event as any, handler as any)
    );

    return () => {
      for (const handle of handles) handle.remove();
    };
  }, [eventHandlers, mapView]);

  if (!mapView) return null;
  return (
    <MapContext.Provider value={mapView}>
      <div ref={mapContainer} style={style} className={className}>
        {mapView && children}
      </div>

      {Object.entries(mapViewProps).map(([key, value]) => {
        if (key === 'map') return null;
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

export const createViewComponent = <
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
    eventHandlers,
    ...mapViewProps
  }: Omit<ArcViewProps<View>, 'init'> &
    ViewProps & { map?: __esri.WebMapProperties }) => {
    const id = useId();

    const initCallback = React.useCallback(() => {
      // @ts-expect-error - constructed is a private property
      const newMap = map?.constructed ? map : new WebMap(map);

      return new ViewConstructor({
        map: newMap,
        ...mapViewProps,
      });
    }, [map, mapViewProps]);

    return (
      <ArcView
        key={id}
        init={initCallback}
        onViewCreated={onViewCreated}
        style={style}
        className={className}
        eventHandlers={eventHandlers}
        mapViewProps={mapViewProps}
      >
        {children}
      </ArcView>
    );
  };

  return memo(ArcMapView, isEqual);
};
