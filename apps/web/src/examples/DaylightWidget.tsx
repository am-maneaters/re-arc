import { CalciteButton } from '@esri/calcite-components-react';
import { ArcDaylight, ArcSceneLayer, ArcSceneView, ArcUI } from 'arcgis-react';
import { useState } from 'react';

export default function Example() {
  const [isCityScale, setIsCityScale] = useState(true);

  return (
    <ArcSceneView
      map={{ basemap: 'satellite', ground: 'world-elevation' }}
      camera={isCityScale ? cityCamera : globalCamera}
      environment={{ lighting: { type: 'sun', directShadowsEnabled: true } }}
      style={{ height: '100%', position: 'relative' }}
    >
      <ArcSceneLayer
        popupEnabled={false}
        portalItem={{ id: 'b343e14455fe45b98a2c20ebbceec0b0' }}
      />
      <ArcUI position="top-right">
        <ArcDaylight />
      </ArcUI>
      <div style={buttonContainerStyle}>
        <CalciteButton
          title="city"
          appearance={isCityScale ? 'solid' : 'outline'}
          onClick={() => setIsCityScale(true)}
          style={{ width: '40%' }}
        >
          City Scale
        </CalciteButton>
        <CalciteButton
          appearance={isCityScale ? 'outline' : 'solid'}
          onClick={() => setIsCityScale(false)}
          style={{ width: '40%' }}
        >
          Global Scale
        </CalciteButton>
      </div>
    </ArcSceneView>
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

const cityCamera = {
  position: { longitude: -4.493, latitude: 48.3811, z: 40 },
  heading: 250.18,
  tilt: 70,
};

const globalCamera = {
  position: { longitude: 27, latitude: 54, z: 10_825_172 },
  heading: 357,
  tilt: 0.19,
};
