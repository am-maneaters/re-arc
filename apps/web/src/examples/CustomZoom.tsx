import ZoomVM from '@arcgis/core/widgets/Zoom/ZoomViewModel';
import {
  CalciteAction,
  CalciteActionPad,
} from '@esri/calcite-components-react';
import {
  ArcMapView,
  ArcUI,
  useArcState,
  useMapView,
  useWatchState,
} from 'arcgis-react';
import { useMemo } from 'react';

export default function Example() {
  return (
    <ArcMapView
      style={{ height: '100%' }}
      map={{ basemap: 'streets' }}
      zoom={3}
      center={[-100.4593, 36.9014]}
      onViewCreated={(view) => {
        // Disable the default zoom widget
        view.ui.components = ['attribution'];
      }}
    >
      <ArcUI position="top-left">
        <CustomZoom />
      </ArcUI>
    </ArcMapView>
  );
}

function CustomZoom() {
  const mapView = useMapView();
  const widget = useMemo(() => new ZoomVM({ view: mapView }), [mapView]);

  const canZoomIn = useWatchState(() => widget.canZoomIn) ?? false;
  const canZoomOut = useWatchState(() => widget.canZoomOut) ?? false;

  return (
    <CalciteActionPad expandDisabled>
      <CalciteAction
        icon="plus"
        text="Zoom In"
        scale="l"
        disabled={canZoomIn ? undefined : true}
        onClick={() => widget.zoomIn()}
      />
      <CalciteAction
        icon="minus"
        text="Zoom Out"
        scale="l"
        disabled={canZoomOut ? undefined : true}
        onClick={() => widget.zoomOut()}
      />
    </CalciteActionPad>
  );
}
