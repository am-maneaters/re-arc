import { ArcgisPlacement } from '@arcgis/map-components-react';
import { ArcMapView } from 're-arc';
import { useState } from 'react';

export default function Example() {
  const [pointerHover, setPointerHover] = useState(false);

  return (
    <ArcMapView
      style={{ height: '100%' }}
      basemap="streets"
      zoom={3}
      center={[-100.4593, 36.9014]}
      onMouseEnter={() => setPointerHover(true)}
      onMouseLeave={() => setPointerHover(false)}
    >
      <ArcgisPlacement position="top-right">
        <div style={{ backgroundColor: 'white', padding: 8, color: 'black' }}>
          User is {!pointerHover && 'not'} hovering over the map!
        </div>
      </ArcgisPlacement>
    </ArcMapView>
  );
}
