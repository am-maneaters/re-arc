import WebMap from '@arcgis/core/WebMap';
import Search from '@arcgis/core/widgets/Search';
import { CalciteButton } from '@esri/calcite-components-react';
import React, { useEffect, useMemo, useRef } from 'react';

import { ArcMapView, ArcSceneView, ArcUI, ArcWidget } from '../../src';

export default function MultiView() {
  const [currentView, setCurrentView] = React.useState<'map' | 'scene'>('map');

  const mapInstance = useRef(new WebMap({ basemap: 'streets-vector' }));
  mapInstance.current.loadAll();

  const searchWidget = useMemo(() => new Search({}), []);

  const mapVisible = currentView === 'map';

  return (
    <div>
      {/* Map View */}
      <ArcMapView
        style={{ height: '100vh', display: mapVisible ? 'flex' : 'none' }}
        map={mapInstance.current}
      >
        <ArcUI position="top-right">
          <ArcWidget widget={searchWidget} />
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
