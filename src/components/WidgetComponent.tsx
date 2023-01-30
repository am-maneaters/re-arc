import React, { useRef, useEffect } from 'react';
import { useOnEvent } from '../hooks/useOnEvent';
import { useWatchEffect } from '../hooks';

export const WidgetComponent = <T extends __esri.Widget>({
  widgetInit,
  onWidgetLoad,
}: {
  widgetInit: () => T;
  onWidgetLoad?: (widget: T) => void;
}) => {
  const widget = useRef(widgetInit());

  // when widget loads, call onWidgetLoad
  useOnEvent(widget.current, 'layerview-create', () => {
    onWidgetLoad?.(widget.current);
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widgetRef = widget.current;
    if (ref.current === null || !widget) return;

    // Create new widget instance and place it in the DOM
    widgetRef.container = ref.current;

    return () => {
      if (widgetRef) widgetRef.destroy();
    };
  }, [widget]);

  return <div ref={ref} />;
};

function useMap() {}

type WithChildren = { children: React.ReactNode };

const MapView = ({ children }: any) => null;

const IdealMap = () => {
  const t = 5;
  const mapView = useRef();

  const [numClicks, setNumClicks] = useState(0);

  useOnEvent(mapView, 'click', () => {
    console.log('Map was clicked');
  });

  const zoomLevel = useWatchState(() => mapView.zoom);

  return (
    <Map>
      <MapView ref={mapView} initialProps={{ basemap: 'dark' }}>
        <MapLayers>
          <FeatureLayer url="https://featureLayer.com" />
          {showGraphicsLayer && <GraphicsLayer style={blah} />}
        </MapLayers>

        <MapUI position="bottom-right">
          <Legend ref={legendRef} />
        </MapUI>

        <MapUI position="top-right">
          <LayerList />
        </MapUI>

        <MapUI position="top-left">
          <p>Current zoom level: {zoomLevel}</p>
          <p>Number of times clicked: {numClicks}</p>
        </MapUI>
      </MapView>
    </Map>
  );
};
