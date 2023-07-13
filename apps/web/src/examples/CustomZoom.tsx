import ZoomVM from '@arcgis/core/widgets/Zoom/ZoomViewModel';
import {
  CalciteAction,
  CalciteActionPad,
} from '@esri/calcite-components-react';
import { ArcMapView, ArcUI, useMapView, useWatchState } from 'arcgis-react';
import { useMemo } from 'react';

export default function CustomZoom() {
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
        <CustomZoomComponent />
      </ArcUI>
    </ArcMapView>
  );
}

function CustomZoomComponent() {
  const mapView = useMapView();
  const widget = useMemo(() => new ZoomVM({ view: mapView }), [mapView]);
  const [canZoomIn, canZoomOut] = useWatchState(
    () => [widget.canZoomIn, widget.canZoomOut],
    [widget]
  ) ?? [false, false];

  return (
    <CalciteActionPad expandDisabled>
      <CalciteAction
        icon="plus"
        text="Zoom In"
        scale="s"
        disabled={canZoomIn ? undefined : true}
        onClick={() => widget.zoomIn()}
      />
      <CalciteAction
        icon="minus"
        text="Zoom Out"
        scale="s"
        disabled={canZoomOut ? undefined : true}
        onClick={() => widget.zoomOut()}
      />
    </CalciteActionPad>
  );
}
