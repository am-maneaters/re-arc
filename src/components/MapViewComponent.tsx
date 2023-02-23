import MapView from '@arcgis/core/views/MapView';
import React, {
  useRef,
  useEffect,
  createContext,
  HTMLAttributes,
  useState,
} from 'react';
import Map from '@arcgis/core/WebMap';

export const MapContext = createContext<MapView | undefined>(new MapView());

type MapViewComponentProps = {
  children?: React.ReactNode;
  mapProps: __esri.WebMapProperties;
  mapViewProps: __esri.MapViewProperties;
  onMapViewLoad?: (map: MapView) => void;
} & HTMLAttributes<HTMLDivElement>;

export const ArcFeatureLayer = ({
  children,
}: {
  children: React.ReactElement;
}) => <div>{children}</div>;

export const ArcViewLayer = ({
  children,
}: {
  children: React.ReactElement;
}) => <div>{children}</div>;

export default function MapViewComponent({
  children,
  mapProps,
  mapViewProps,
  onMapViewLoad,
  ...divAttributes
}: MapViewComponentProps) {
  for (const child of React.Children.toArray(children)) {
    // check if child is a react element
    if (
      React.isValidElement(child) && // check if child is a widget
      child.type === ArcViewLayer
    ) {
      console.log('child', child.props.children);
    }
  }
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(new Map(mapProps));

  const [mapView, setMapView] = useState<MapView>();

  const mapViewRef = useRef<MapView>(
    new MapView({ ...mapViewProps, map: mapRef.current })
  );

  useEffect(() => {
    mapViewRef.current.when(() => {
      setMapView(mapViewRef.current);
      onMapViewLoad?.(mapViewRef.current);
    });
  }, [onMapViewLoad]);

  useEffect(() => {
    if (mapContainer.current)
      mapViewRef.current.container = mapContainer.current;
  }, []);

  return (
    <MapContext.Provider value={mapView}>
      <div ref={mapContainer} {...divAttributes}>
        {mapView && children}
      </div>
    </MapContext.Provider>
  );
}
