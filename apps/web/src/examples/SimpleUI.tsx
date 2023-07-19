import { CalciteButton } from '@esri/calcite-components-react';
import { ArcMapView, ArcUI } from 'arcgis-react';

export default function Example() {
  return (
    <ArcMapView
      style={{ height: '100%' }}
      map={{ basemap: 'streets' }}
      zoom={3}
      center={[-100.4593, 36.9014]}
    >
      <ArcUI
        position="top-right"
        style={{ backgroundColor: 'white', padding: 8, marginLeft: 36 }}
      >
        Hi, I am a UI element! I resize with the map container!
      </ArcUI>

      <ArcUI position="bottom-left">
        <CalciteButton>Anything can be in a ArcUI element!</CalciteButton>
      </ArcUI>
    </ArcMapView>
  );
}
