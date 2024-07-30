import ZoomVM from '@arcgis/core/widgets/Zoom/ZoomViewModel';
import {
  CalciteAction,
  CalciteActionPad,
} from '@esri/calcite-components-react';
import { ArcMapView, ArcUI, useCurrentMapView, useWatchState } from 're-arc';
import { useMemo } from 'react';

export default function Example() {
  const map = useMemo(() => {
    return {
      basemap: 'streets',
      view: { ui: { components: ['attribution'] } },
    };
  }, []);

  return (
    <ArcMapView zoom={3} center={[-100.4593, 36.9014]} map={map}>
      <ArcUI position="top-left">
        <CustomZoom />
      </ArcUI>
    </ArcMapView>
  );
}

function CustomZoom() {
  const mapView = useCurrentMapView();
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
