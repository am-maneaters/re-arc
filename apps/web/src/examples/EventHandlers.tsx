import { ArcMapView, ArcUI } from 'arcgis-react';
import { useState } from 'react';

export default function Example() {
  const [pointerHover, setPointerHover] = useState(false);

  return (
    <ArcMapView
      style={{ height: '100%' }}
      map={{ basemap: 'streets' }}
      zoom={3}
      center={[-100.4593, 36.9014]}
      eventHandlers={{
        'pointer-enter': () => setPointerHover(true),
        'pointer-leave': () => setPointerHover(false),
      }}
    >
      <ArcUI
        position="top-right"
        style={{ backgroundColor: 'white', padding: 8 }}
      >
        User is {!pointerHover && 'not'} hovering over the map!
      </ArcUI>
    </ArcMapView>
  );
}
