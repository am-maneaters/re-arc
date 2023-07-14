import {
  CalciteCard,
  CalciteLabel,
  CalciteSwitch,
} from '@esri/calcite-components-react';
import { ArcMapView, ArcTileLayer, ArcUI, useMapView } from 'arcgis-react';
import React from 'react';

export default function Example() {
  return (
    <ArcMapView
      map={{ basemap: 'oceans' }}
      center={[-118.805, 34.027]}
      zoom={7}
      style={{ height: '100%' }}
      eventHandlers={{ click: (e) => console.log(e.mapPoint) }}
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
      <ArcTileLayer url={config.streetsUrl} visible={streetsVisible} />

      {/* Population Layer */}
      <ArcTileLayer
        url={config.popUrl}
        opacity={0.9}
        eventHandlers={{ 'layerview-create': onPopViewCreated }}
      />
    </>
  );
}

const config = {
  streetsUrl:
    'https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer',
  popUrl:
    'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer',
};
