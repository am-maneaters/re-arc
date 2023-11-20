import Basemap from '@arcgis/core/Basemap';
import {
  CalciteBlock,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from '@esri/calcite-components-react';
import {
  ArcMapView,
  ArcSceneView,
  MountedViewsProvider,
  useArcState,
  useMountedViews,
} from 'arcgis-react';

export default function Example() {
  return (
    <MountedViewsProvider>
      <div style={{ height: '60%', display: 'flex' }}>
        {/* Map View */}
        <ArcMapView
          id="my-map-view"
          style={{ flex: 1 }}
          map={{ basemap: 'dark-gray-vector' }}
          zoom={3}
          center={[-100.4593, 36.9014]}
        />

        {/* Scene View */}
        <ArcSceneView
          id="my-scene-view"
          style={{ flex: 1 }}
          map={{ basemap: 'streets-vector' }}
          camera={{
            tilt: 45,
            heading: 0,
            position: { x: 0, y: 40, z: 1000000 },
          }}
        />
      </div>

      {/**
       * Basemap Picker - outside of components directly rendering
       * a Map or Scene
       */}
      <BaseMapPickList />
    </MountedViewsProvider>
  );
}

function BaseMapPickList() {
  const views = useMountedViews();
  if (!views) return null;

  return (
    <CalciteBlock heading="Basemap options" open>
      {Object.entries(views).map(([id, view]) => {
        if (!view) return null;

        return (
          <BasemapPicker key={id} label={`Set Basemap for ${id}`} view={view} />
        );
      })}
    </CalciteBlock>
  );
}

function BasemapPicker({
  view,
  label,
}: {
  view: __esri.MapView | __esri.SceneView;
  label: string;
}) {
  const [basemap, setBasemap] = useArcState(view.map, 'basemap');

  return (
    <CalciteLabel>
      {label}
      <CalciteSelect
        label="Basemap"
        value={basemap.id}
        onCalciteSelectChange={(e) =>
          setBasemap(Basemap.fromId(e.target.value))
        }
      >
        <CalciteOption value="streets">Streets</CalciteOption>
        <CalciteOption value="terrain">Terrain</CalciteOption>
        <CalciteOption value="dark-gray-vector">Dark Gray Vector</CalciteOption>
      </CalciteSelect>
    </CalciteLabel>
  );
}
