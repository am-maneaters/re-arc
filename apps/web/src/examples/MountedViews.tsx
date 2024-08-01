import { ArcgisBasemapGallery } from '@arcgis/map-components-react';
import { CalciteBlock } from '@esri/calcite-components-react';
import { ArcMapView, ArcSceneView, ArcViewProvider, useView } from 're-arc';

export default function Example() {
  return (
    <ArcViewProvider>
      <div style={{ height: '50%', display: 'flex' }}>
        {/* Map View */}
        <ArcMapView
          id="myMapView"
          style={{ flex: 1 }}
          basemap="streets"
          zoom={3}
          center={[-100.4593, 36.9014]}
        />

        {/* Scene View */}
        <ArcSceneView id="mySceneView" style={{ flex: 1 }} basemap="streets" />
      </div>
      <BaseMapPickList />
    </ArcViewProvider>
  );
}

/**
 * Basemap Picker - used outside of components directly rendering
 * a Map or Scene
 */
function BaseMapPickList() {
  const { mySceneView, myMapView } = useView();
  return (
    <div style={{ height: '50%', overflow: 'auto' }}>
      {myMapView && (
        <CalciteBlock heading="Map Basemaps" collapsible>
          <ArcgisBasemapGallery referenceElement="myMapView" />
        </CalciteBlock>
      )}
      {mySceneView && (
        <CalciteBlock heading="Scene Basemaps" collapsible>
          <ArcgisBasemapGallery referenceElement="mySceneView" />
        </CalciteBlock>
      )}
    </div>
  );
}
