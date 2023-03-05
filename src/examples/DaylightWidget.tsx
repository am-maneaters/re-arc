import React, { useMemo, useState } from 'react';
import MapViewComponent from '../components/MapViewContext';
import Map from '@arcgis/core/Map';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import { ArcUI } from '../components/ArcUI';
import { WidgetComponent } from '../components/WidgetComponent';
import Daylight from '@arcgis/core/widgets/Daylight';
import SceneView from '@arcgis/core/views/SceneView';

type Props = {};

const camera = {
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

export default function DaylightWidget({}: Props) {
  const [sceneView, setSceneView] = useState<SceneView>();
  console.log('Rendering daylight');

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
    <div>
      <MapViewComponent
        initView={() =>
          new SceneView({
            map,
            // position in Brest, France
            camera: camera.city,
            qualityProfile: 'high',
            environment: {
              atmosphere: {
                // creates a realistic view of the atmosphere
                quality: 'high',
              },
              lighting: {
                // autocasts as new SunLighting()
                type: 'sun',
                date: new Date('December 21, 2021 09:40:00 UTC'),

                directShadowsEnabled: true,
              },
            },
          })
        }
        onViewCreated={(view) => {
          setSceneView(view);
        }}
        style={{ height: '100vh' }}
      >
        <ArcUI position="top-right">
          <WidgetComponent
            widgetInit={() => new Daylight({ view: sceneView })}
          />
        </ArcUI>
      </MapViewComponent>
    </div>
  );
}
