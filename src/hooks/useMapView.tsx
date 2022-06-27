import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { useMemo } from 'react';

export function useMapView(
  mapProps: ConstructorParameters<typeof Map>[0],
  mapViewProps: Exclude<__esri.MapViewProperties, 'map' | 'container'>
): MapView {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const map = useMemo<Map>(() => new Map(mapProps), []);
  const view = useMemo<MapView>(
    () => new MapView({ ...mapViewProps, map }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map]
  );

  return view;
}
