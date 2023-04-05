import Basemap from '@arcgis/core/Basemap';
import { CalciteOption, CalciteSelect } from '@esri/calcite-components-react';

import { ArcMapView, ArcUI, useArcState, useMapView } from '../../src';

export default function BasemapPicker() {
  return (
    <ArcMapView
      style={{ height: '100vh' }}
      zoom={1}
      map={{ basemap: 'streets' }}
    >
      <ArcUI position="bottom-left">
        <ArcMap />
      </ArcUI>
    </ArcMapView>
  );
}

function ArcMap() {
  const mapView = useMapView();
  const [basemap, setBasemap] = useArcState(mapView.map, 'basemap');

  return (
    <CalciteSelect
      label="Basemap"
      value={basemap.id}
      onCalciteSelectChange={(e) => setBasemap(Basemap.fromId(e.target.value))}
    >
      <CalciteOption value="streets">Streets</CalciteOption>
      <CalciteOption value="terrain">Terrain</CalciteOption>
      <CalciteOption value="dark-gray-vector">Dark Gray Vector</CalciteOption>
    </CalciteSelect>
  );
}
