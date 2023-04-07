import WebMap from '@arcgis/core/WebMap';
import { CalciteButton } from '@esri/calcite-components-react';
import React, { useRef } from 'react';

import { ArcMapView, ArcSceneView, ArcUI } from '../../src';
import { ArcSearch } from '../../src/components/ArcWidget/generated/ArcSearch';

export default function MultiView() {
  const [currentView, setCurrentView] = React.useState<'map' | 'scene'>('map');

  const mapInstance = useRef(new WebMap({ basemap: 'streets-vector' }));

  const mapVisible = currentView === 'map';

  return (
    <div>
      {/* Map View */}
      <ArcMapView
        style={{ height: '100vh', display: mapVisible ? 'flex' : 'none' }}
        map={mapInstance.current}
      >
        <ArcUI position="top-right">
          <ArcSearch />
        </ArcUI>
        <ArcUI position="bottom-left">
          <CalciteButton onClick={() => setCurrentView('scene')}>
            Show Scene
          </CalciteButton>
        </ArcUI>
      </ArcMapView>

      {/* Scene View */}
      <ArcSceneView
        style={{ height: '100vh', display: mapVisible ? 'none' : 'flex' }}
        map={mapInstance.current}
      >
        <ArcUI position="bottom-left">
          <CalciteButton onClick={() => setCurrentView('map')}>
            Show Map
          </CalciteButton>
        </ArcUI>
      </ArcSceneView>
    </div>
  );
}
