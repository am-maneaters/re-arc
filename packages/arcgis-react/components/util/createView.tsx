import WebMap from '@arcgis/core/WebMap';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import isEqual from 'react-fast-compare';

import { useEventHandlers } from '../../hooks/useEventHandlers';
import { ArcViewWrapperProps, EsriView } from '../../typings/EsriTypes';
import { MapContext } from '../ArcView/ViewContext';
import { ArcReactiveProp } from './ArcReactiveProp';

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
              ? map
              : new WebMap(map),
          ...mapViewProps,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!mapContainer.current) return;
      mapView.container = mapContainer.current;
      mapView.when(() => {
        onViewCreated?.(mapView as View);
      });

      return () => {
        // @ts-expect-error - container types are wrong
        mapView.container = undefined;
      };
    }, [mapView, onViewCreated]);

    useEventHandlers(mapView, eventHandlers);

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

  return memo(ArcView, (t, b) => {
    const eq = isEqual(t, b);
    console.log('eq', eq);
    console.log(t, b);
    return eq;
  });
}
