import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import React, { createContext } from 'react';

export const MapStateContext = createContext<MapView>(
  new MapView({ map: new Map() })
);

export const MapStateProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => (
  <MapStateContext.Provider
    value={new MapView({ map: new Map({ basemap: 'gray-vector' }) })}
  >
    {children}
  </MapStateContext.Provider>
);

export const useMapState = () => React.useContext(MapStateContext);
