import React from 'react';
import { ArcMapView, useMapView } from '../components/MapViewContext';
import { ArcLayer } from '../components/ArcLayer';
import { ArcUI } from '../components/ArcUI';
import {
  CalciteCard,
  CalciteLabel,
  CalciteSwitch,
} from '@esri/calcite-components-react';

const config = {
  streetsUrl:
    'https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer',
  popUrl:
    'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer',
};

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

  const onPopViewCreated = (e: __esri.TileLayerLayerviewCreateEvent) => {
    const layer = e.layerView.layer;
    mapView.goTo(layer.fullExtent);
    console.log('LayerView for male population created!', layer.title);
  };

  const onStreetsViewCreated = (e: __esri.TileLayerLayerviewCreateEvent) => {
    console.log('LayerView for streets created!', e.layerView.layer.title);
  };

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

      {/* Streets Layer */}
      <ArcLayer
        type="tile"
        layerProps={{ url: config.streetsUrl, visible: streetsVisible }}
        eventHandlers={{ 'layerview-create': onStreetsViewCreated }}
      />

      {/* Population Layer */}
      <ArcLayer
        type="tile"
        layerProps={{ url: config.popUrl, opacity: 0.9 }}
        eventHandlers={{ 'layerview-create': onPopViewCreated }}
      />
    </>
  );
}
