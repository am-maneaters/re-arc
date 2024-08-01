import Camera from '@arcgis/core/Camera';
import { ArcgisDaylight } from '@arcgis/map-components-react';
import { CalciteButton } from '@esri/calcite-components-react';
import {
  ArcSceneLayer,
  ArcSceneView,
  useArcState,
  useCurrentSceneView,
} from 're-arc';
import { useState } from 'react';

export default function Example() {
  return (
    <ArcSceneView
      basemap="satellite"
      ground="world-elevation"
      camera={cityCamera}
      environment={{ lighting: { type: 'sun', directShadowsEnabled: true } }}
      style={{ height: '100%', position: 'relative' }}
    >
      <ArcSceneLayer
        popupEnabled={false}
        portalItem={{ id: 'b343e14455fe45b98a2c20ebbceec0b0' }}
      />
      <ArcgisDaylight position="top-right" />

      <CameraScaleToggle />
    </ArcSceneView>
  );
}

function CameraScaleToggle() {
  const mapView = useCurrentSceneView();
  const [isCityScale, setIsCityScale] = useState(true);
  const [, setCamera] = useArcState(mapView, 'camera');

  return (
    <div style={buttonContainerStyle}>
      <CalciteButton
        title="city"
        appearance={isCityScale ? 'solid' : 'outline'}
        onClick={() => {
          setCamera(cityCamera);
          setIsCityScale(true);
        }}
        style={{ width: '40%' }}
      >
        City Scale
      </CalciteButton>
      <CalciteButton
        appearance={isCityScale ? 'outline' : 'solid'}
        onClick={() => {
          setCamera(globalCamera);
          setIsCityScale(false);
        }}
        style={{ width: '40%' }}
      >
        Global Scale
      </CalciteButton>
    </div>
  );
}

const buttonContainerStyle = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  bottom: 20,
  left: 20,
  right: 20,
  gap: 8,
} as const;

const cityCamera = new Camera({
  position: { longitude: -4.493, latitude: 48.3811, z: 40 },
  heading: 250.18,
  tilt: 70,
});

const globalCamera = new Camera({
  position: { longitude: 27, latitude: 54, z: 10_825_172 },
  heading: 357,
  tilt: 0.19,
});
