import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/WebMap';
import { useEffect, useRef, useState } from 'react';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import { useWatchEffect } from './useWatchEffect';
import useDeepCompareEffect from 'use-deep-compare-effect';

/**
 * Hook to create a MapView instance
 * @param mapProps The props to pass to the Map constructor
 * @param mapViewProps The props to pass to the MapView constructor
 * @returns The mapView instance
 */
export function useMapView(
  mapProps: ConstructorParameters<typeof Map>[0],
  mapViewProps: Exclude<__esri.MapViewProperties, 'map' | 'container'>
): MapView | undefined {
  const mapRef = useRef<Map>(new Map(mapProps));

  const [mapView, setMapView] = useState<MapView>();

  const mapViewRef = useRef<MapView>(
    new MapView({ ...mapViewProps, map: mapRef.current })
  );
  useWatchEffect(
    () => mapViewRef.current.ready,
    () => {
      setMapView(mapViewRef.current);
    }
  );

  return mapView;
}
