import { useState } from 'react';

import { ArcMapView, ArcUI } from '../../src';
import { ArcGraphicsLayer } from '../../src/components/ArcLayer/generated/ArcGraphicsLayer';
import { ArcSketch } from '../../src/components/ArcWidget/generated/ArcSketch';

export default function SketchWidgetExample() {
  const [graphicsLayer, setGraphicsLayer] = useState<__esri.GraphicsLayer>();

  return (
    <ArcMapView
      style={{ height: '100vh' }}
      map={{ basemap: 'topo-vector' }}
      zoom={5}
      center={[90, 45]}
    >
      <ArcGraphicsLayer
        onLayerCreated={(layer) => setGraphicsLayer(layer)}
        title="Sketch Widget Layer"
      />
      <ArcUI position="top-right">
        <ArcSketch layer={graphicsLayer} creationMode="update" />
      </ArcUI>
    </ArcMapView>
  );
}
