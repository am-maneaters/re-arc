import Basemap from '@arcgis/core/Basemap';
import { CalciteOption, CalciteSelect } from '@esri/calcite-components-react';
import { ArcMapView, ArcUI, useArcState, useMapView } from 'arcgis-react';

export default function Example() {
  return (
    <ArcMapView
      style={{ height: '100%' }}
      zoom={3}
      center={[-100.4593, 36.9014]}
      map={{ basemap: 'streets' }}
    >
      <ArcUI position="bottom-left">
        <BasemapPicker />
      </ArcUI>
    </ArcMapView>
  );
}

/**
 * Using a child component will allow us to use `useMapView` without
 * needing to check if the view is defined since `ArcMapView` will
 * only render its children when the view is defined.
 */
function BasemapPicker() {
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
