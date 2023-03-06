import React, { useEffect, useMemo, useState } from 'react';
import { ArcView, useSceneView } from '../components/MapViewContext';
import Map from '@arcgis/core/Map';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import { ArcUI } from '../components/ArcUI';
import { WidgetComponent } from '../components/WidgetComponent';
import Daylight from '@arcgis/core/widgets/Daylight';
import SceneView from '@arcgis/core/views/SceneView';
import Expand from '@arcgis/core/widgets/Expand';
import { CalciteButton } from '@esri/calcite-components-react';

type Props = {};

const camera: Record<string, __esri.Camera> = {
  city: {
    position: {
      longitude: -4.492_922_54,
      latitude: 48.381_180_05,
      z: 29.413_83,
    },
    heading: 250.18,
    tilt: 87.91,
  },
  global: {
    position: {
      longitude: 27.054_536_08,
      latitude: 54.532_361_02,
      z: 10_825_172.372,
    },
    heading: 357.3,
    tilt: 0.19,
  },
};

function DaylightWidget({ cityScale }: { cityScale: boolean }) {
  const sceneView = useSceneView();

  const daylight = useMemo(
    () =>
      new Daylight({
        view: sceneView,
      }),
    [sceneView]
  );

  useEffect(() => {
    daylight.viewModel.sunLightingEnabled = cityScale;
    sceneView.camera = cityScale ? camera.city : camera.global;
  }, [daylight, cityScale, sceneView]);

  const expand = useMemo(
    () =>
      new Expand({
        view: sceneView,
        content: daylight,
        expandTooltip: 'Daylight',
        collapseTooltip: 'Daylight',
        expanded: true,
      }),
    [daylight, sceneView]
  );

  return <WidgetComponent widget={expand} />;
}

export default function DaylightWidgetExample({}: Props) {
  const [isCityScale, setIsCityScale] = useState(true);

  const map = useMemo(
    () =>
      new Map({
        basemap: 'satellite',

        ground: 'world-elevation',
        layers: [
          new SceneLayer({
            popupEnabled: false,
            portalItem: {
              id: 'b343e14455fe45b98a2c20ebbceec0b0',
            },
          }),
        ],
      }),
    []
  );

  return (
    <ArcView
      init={() =>
        new SceneView({
          map,
          // position in Brest, France
          camera: camera.city,
          qualityProfile: 'high',
          environment: {
            atmosphere: {
              quality: 'high',
            },
            lighting: {
              type: 'sun',
              date: new Date('December 21, 2021 09:40:00 UTC'),

              directShadowsEnabled: true,
            },
          },
        })
      }
      style={{ height: '100vh', position: 'relative' }}
    >
      <ArcUI position="top-right">
        <DaylightWidget cityScale={isCityScale} />
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
    </ArcView>
  );
}
