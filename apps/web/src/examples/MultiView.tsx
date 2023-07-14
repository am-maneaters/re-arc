import {
  ArcMapView,
  ArcSceneView,
  useViewState,
  useWatchEffect,
} from 'arcgis-react';

export default function Example() {
  const [map, onMapViewCreated] = useViewState<__esri.MapView>();
  const [scene, onSceneViewCreated] = useViewState<__esri.SceneView>();

  useWatchEffect(
    () => map?.viewpoint,
    () =>
      (map?.interacting || map?.animation) &&
      scene?.set('viewpoint', map.viewpoint)
  );
  useWatchEffect(
    () => scene?.viewpoint,
    () =>
      (scene?.interacting || scene?.animation) &&
      map?.set('viewpoint', scene.viewpoint)
  );

  return (
    <div style={{ height: '100%', display: 'flex' }}>
      {/* Map View */}
      <ArcMapView
        style={{ flex: 1 }}
        map={{ basemap: 'streets-vector' }}
        zoom={3}
        center={[-100.4593, 36.9014]}
        onViewCreated={onMapViewCreated}
        constraints={{ snapToZoom: false }}
      />

      {/* Scene View */}
      <ArcSceneView
        style={{ flex: 1 }}
        map={{ basemap: 'streets-vector' }}
        zoom={4}
        center={[-100.4593, 36.9014]}
        onViewCreated={onSceneViewCreated}
      />
    </div>
  );
}
