import MapView from "@arcgis/core/views/MapView";
import React, { useRef, useEffect, createContext, HTMLAttributes } from "react";

export const MapContext = createContext<MapView>(new MapView());

type MapViewComponentProps = {
  view: MapView;
  children?: React.ReactNode;
};

export default function MapViewComponent({
  view,
  children,
  ...divAttributes
}: MapViewComponentProps & HTMLAttributes<HTMLDivElement>) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) view.container = mapRef.current;
  }, [view]);

  return (
    <div ref={mapRef} {...divAttributes}>
      <MapContext.Provider value={view}>{children}</MapContext.Provider>
    </div>
  );
}
