import { ArcgisSketch } from '@arcgis/map-components-react';
import { ArcGraphicsLayer, ArcMapView } from 're-arc';
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
        eventHandlers={{
          'layerview-create': (e) => {
            setGraphicsLayer(e.layerView.layer as __esri.GraphicsLayer);
          },
        }}
        title="Sketch Widget Layer"
      />

      {graphicsLayer && (
        <ArcgisSketch
          position="top-right"
          layer={graphicsLayer}
          creationMode="update"
        />
      )}
    </ArcMapView>
  );
}
