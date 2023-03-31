import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/WebMap';
import SceneView from '@arcgis/core/views/SceneView';
import React, { memo, useEffect, useId, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { MapContext } from './ViewContext';
import { useViewInit } from '../../hooks/useView';
import { Overloads } from '../../typings/utilityTypes';
import { ArcReactiveProp } from '../util/ArcReactiveProp';
import { EventHandlers } from '../../typings/EsriTypes';

type ArcViewProps<
  View extends __esri.MapView | __esri.SceneView,
  LayerEvents extends Parameters<Overloads<View['on']>>
> = {
  children?: React.ReactNode;
  init: () => View;
  onViewCreated?: (view: View) => void;
  style?: React.CSSProperties;
  className?: string;
  eventHandlers?: EventHandlers<View, LayerEvents>;
};

const ArcView = <
  View extends __esri.MapView | __esri.SceneView,
  LayerEvents extends Parameters<Overloads<View['on']>>
>({
  children,
  init,
  onViewCreated,
  className,
  style,
  eventHandlers,
  mapViewProps,
}: ArcViewProps<View, LayerEvents> & { mapViewProps: any }) => {
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

const createViewComponent = <
  ViewConstructor extends typeof __esri.MapView | typeof __esri.SceneView,
  View extends ViewConstructor extends typeof __esri.MapView
    ? __esri.MapView
    : __esri.SceneView,
  ViewProps extends View extends __esri.MapView
    ? __esri.MapViewProperties
    : __esri.SceneViewProperties,
  LayerEvents extends Parameters<Overloads<View['on']>>
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
  }: Omit<ArcViewProps<View, LayerEvents>, 'init'> &
    ViewProps & { map?: __esri.WebMapProperties }) => {
    const id = useId();

    const initCallback = React.useCallback(
      () =>
        new ViewConstructor({
          // @ts-expect-error - constructed is a private property
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
        eventHandlers={eventHandlers}
        mapViewProps={mapViewProps}
      >
        {children}
      </ArcView>
    );
  };

  return memo(ArcMapView, isEqual);
};

export const ArcMapView = createViewComponent(MapView);
export const ArcSceneView = createViewComponent(SceneView);
