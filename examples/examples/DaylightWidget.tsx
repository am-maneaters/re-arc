import { CalciteButton } from '@esri/calcite-components-react';
import { useState } from 'react';

import { ArcSceneView, ArcUI } from '../../src';
import { ArcSceneLayer } from '../../src/components/ArcLayer/generated/ArcSceneLayer';
import { ArcDaylight } from '../../src/components/ArcWidget/generated/ArcDaylight';

const camera = {
  city: {
    position: {
      longitude: -4.492_922_54,
      latitude: 48.381_180_05,
      z: 29.413_83,
    },
    heading: 250.18,
    tilt: 87.91,
  } as __esri.Camera,
  global: {
    position: {
      longitude: 27.054_536_08,
      latitude: 54.532_361_02,
      z: 10_825_172.372,
    },
    heading: 357.3,
    tilt: 0.19,
  } as __esri.Camera,
};

export default function DaylightWidgetExample() {
  const [isCityScale, setIsCityScale] = useState(true);

  return (
    <ArcSceneView
      map={{
        basemap: 'satellite',
        ground: 'world-elevation',
      }}
      camera={isCityScale ? camera.city : camera.global}
      qualityProfile="high"
      environment={{
        atmosphere: {
          quality: 'high',
        },
        lighting: {
          type: 'sun',
          date: new Date('December 21, 2021 09:40:00 UTC'),
          directShadowsEnabled: true,
        },
      }}
      style={{ height: '100vh', position: 'relative' }}
    >
      <ArcSceneLayer
        popupEnabled={false}
        portalItem={{
          id: 'b343e14455fe45b98a2c20ebbceec0b0',
        }}
      />
      <ArcUI position="top-right">
        <ArcDaylight />
      </ArcUI>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          bottom: 20,
          left: 20,
          right: 20,
          gap: 8,
        }}
      >
        <CalciteButton
          title="city"
          appearance={isCityScale ? 'solid' : 'outline'}
          color="blue"
          onClick={() => setIsCityScale(true)}
          style={{ width: '40%' }}
        >
          City Scale
        </CalciteButton>
        <CalciteButton
          appearance={isCityScale ? 'outline' : 'solid'}
          color="blue"
          onClick={() => setIsCityScale(false)}
          style={{ width: '40%' }}
        >
          Global Scale
        </CalciteButton>
      </div>
    </ArcSceneView>
  );
}
