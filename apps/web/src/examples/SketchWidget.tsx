import { ArcGraphicsLayer, ArcMapView, ArcSketch, ArcUI } from 'arcgis-react';
import { useState } from 'react';

export default function Example() {
  const [graphicsLayer, setGraphicsLayer] = useState<__esri.GraphicsLayer>();

  return (
    <ArcMapView
      style={{ height: '100%' }}
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
