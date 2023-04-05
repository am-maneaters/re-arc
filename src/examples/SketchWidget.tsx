import Sketch from '@arcgis/core/widgets/Sketch';
import React, { useMemo, useState } from 'react';

import {
  ArcLayer,
  ArcMapView,
  ArcUI,
  ArcWidget,
  useMapView,
} from '../components';

export default function SketchWidgetExample() {
  const [graphicsLayer, setGraphicsLayer] = useState<__esri.GraphicsLayer>();

  return (
    <ArcMapView
      style={{ height: '100vh' }}
      map={{ basemap: 'topo-vector' }}
      zoom={5}
      center={[90, 45]}
    >
      <ArcLayer
        type="graphics"
        onLayerCreated={(layer) => setGraphicsLayer(layer)}
        layerProps={{ title: 'Sketch Layer' }}
      />
      <ArcUI position="top-right">
        {graphicsLayer && <SketchWidget layer={graphicsLayer} />}
      </ArcUI>
    </ArcMapView>
  );
}

const SketchWidget = ({ layer }: { layer: __esri.GraphicsLayer }) => {
  const mapView = useMapView();

  // TODO: Figure out why the "Select Feature" tool allows you to select a feature but when you modify it, the outline doesn't update with the new geometry.
  const sketch = useMemo(
    () => new Sketch({ view: mapView, layer, creationMode: 'update' }),
    [layer, mapView]
  );

  return <ArcWidget widget={sketch} />;
};
