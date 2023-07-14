import { CalciteBlock, CalciteLabel } from '@esri/calcite-components-react';
import {
  ArcLayerList,
  ArcMapView,
  ArcUI,
  useViewState,
  useWatchEffect,
  useWatchState,
} from 'arcgis-react';
import { useState } from 'react';

export default function Example() {
  const [mapView, setMapView] = useViewState<__esri.MapView>();
  const [scale, setScale] = useState<string>();
  const [prevCenter, setPrevCenter] = useState<__esri.Point>();
  const [center, setCenter] = useState<__esri.Point>();

  // Match the state of Popup visbility
  const popupVisible = useWatchState(() => mapView?.popup.visible, [mapView]);

  // Check if all layers are visible
  const allLayersVisible = useWatchState(
    () => mapView?.layerViews.every((layer) => layer.visible) ?? false,
    [mapView?.layerViews]
  );

  // Get the titles of all visible layers
  const visibleLayers = useWatchState(
    () => mapView?.allLayerViews.filter((layer) => layer.visible),
    [mapView?.allLayerViews]
  );

  // When the map is stationary, update the scale and center
  useWatchEffect(
    () => [mapView?.stationary, mapView?.center, mapView?.scale] as const,
    ([stationary, newCenter, scale], [prevStationary]) => {
      if (stationary) {
        if (scale) setScale((Math.round(scale * 100) / 100).toFixed(0));
        if (newCenter !== center) {
          setCenter(newCenter);
          setPrevCenter(center);
        }
      } else if (prevStationary) {
        setCenter(newCenter);
      }
    }
  );

  return (
    <div style={{ height: '100%', display: 'flex' }}>
      {/* Map View Container */}
      <ArcMapView
        map={{ portalItem: { id: '2361e8f3f8114c0fa544090d2ff1cbe6' } }}
        center={[-118.805, 34.027]}
        zoom={7}
        onViewCreated={setMapView}
        style={{ height: '100%', flex: 1 }}
      >
        {/* Render the LayerList widget */}
        <ArcUI position="top-right">
          <ArcLayerList />
        </ArcUI>
        <ArcUI position="bottom-left" style={{ width: 300 }}>
          <CalciteBlock heading="Properties" open>
            <Point isNew point={center} />
            <Point point={prevCenter} />
            <CalciteLabel layout="inline-space-between">
              <span style={titleStyle}>Current scale: </span>
              {scale}
            </CalciteLabel>
            <CalciteLabel layout="inline-space-between">
              <span style={titleStyle}>Popup visible: </span>
              <b>{popupVisible ? 'true' : 'false'}</b>
            </CalciteLabel>
            <CalciteLabel>
              <span style={titleStyle}>
                {allLayersVisible ? 'All' : 'Not all'} layers are visible
              </span>
              {visibleLayers?.map(({ layer }) => (
                <div key={layer.title}>- {layer.title}</div>
              ))}
            </CalciteLabel>
          </CalciteBlock>
        </ArcUI>
      </ArcMapView>
    </div>
  );
}

const Coord = ({ num = 0 }) => (Math.round(num * 100) / 100).toFixed(1);

const Point = ({ isNew = false, point = { longitude: 0, latitude: 0 } }) => (
  <CalciteLabel layout="inline-space-between">
    <span style={titleStyle}>{isNew ? 'Current' : 'Previous'} center</span>
    <div className="flex">
      <Coord num={point.longitude} />, <Coord num={point.latitude} />
    </div>
  </CalciteLabel>
);

const titleStyle = { color: '#e6772e' };
