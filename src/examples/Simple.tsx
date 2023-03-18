import React from 'react';
import { ArcMapView, useMapView } from '../components/MapViewContext';
import { ArcLayer } from '../components/ArcLayer';
import { ArcUI } from '../components/ArcUI';
import {
  CalciteCard,
  CalciteLabel,
  CalciteSwitch,
} from '@esri/calcite-components-react';
export default function Simple() {
  return (
    <ArcMapView
      map={{ basemap: 'oceans' }}
      center={[-118.805, 34.027]}
      zoom={7}
      style={{ height: '100vh' }}
    >
      <Layers />
    </ArcMapView>
  );
}

function Layers() {
  const mapView = useMapView();

  const [streetsVisible, setStreetsVisible] = React.useState(false);

  return (
    <>
      <ArcUI position="top-right">
        <CalciteCard>
          <CalciteLabel layout="inline" style={{ height: 0, padding: 5 }}>
            <CalciteSwitch
              checked={streetsVisible ? true : undefined}
              onCalciteSwitchChange={(e) => setStreetsVisible(e.target.checked)}
            />
            Transportation
          </CalciteLabel>
        </CalciteCard>
      </ArcUI>
      <ArcLayer
        type="tile"
        layerProps={{
          url: 'https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer',
          // This property can be used to uniquely identify the layer
          id: 'streets',
          visible: streetsVisible,
        }}
        eventHandlers={{
          'layerview-create': (event) => {
            console.log(
              'LayerView for streets created!',
              event.layerView.layer.title
            );
          },
        }}
      />
      <ArcLayer
        type="tile"
        layerProps={{
          url: 'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer',
          opacity: 0.9,
        }}
        onLayerCreated={(layer) => {
          mapView.goTo(layer.fullExtent);
        }}
        eventHandlers={{
          'layerview-create': (event) => {
            console.log(
              'LayerView for male population created!',
              event.layerView
            );
          },
        }}
      />
    </>
  );
}
