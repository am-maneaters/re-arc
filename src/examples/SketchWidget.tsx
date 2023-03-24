import React, { useMemo, useState } from 'react';
import { ArcMapView } from '../components/ArcView/ArcView';
import { ArcWidget } from '../components/ArcWidget/ArcWidget';
import Sketch from '@arcgis/core/widgets/Sketch';
import { ArcUI } from '../components/ArcUI/ArcUI';
import { useMapView } from '../components/ArcView/ViewContext';
import { ArcLayer } from '../components/ArcLayer/ArcLayer';

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
