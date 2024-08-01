import {
  ArcgisExpand,
  ArcgisLayerList,
  ArcgisPlacement,
} from '@arcgis/map-components-react';
import { CalciteBlock, CalciteLabel } from '@esri/calcite-components-react';
import { ArcMapView, useCurrentMapView, useWatchState } from 're-arc';

function MapState() {
  const mapView = useCurrentMapView();
  // Match the state of Popup visbility
  const popupVisible = useWatchState(() => mapView?.popup.visible, [mapView]);

  // Check if all layers are visible
  const allLayersVisible = useWatchState(
    () => mapView?.layerViews.every((layer) => layer.visible),
    [mapView],
  );

  // Get the titles of all visible layers
  const visibleLayers = useWatchState(
    () => mapView?.allLayerViews.filter((layer) => layer.visible),
    [mapView],
  );

  const scale = useWatchState(() => mapView?.scale, [mapView]);
  const center = useWatchState(() => mapView?.center, [mapView]);

  return (
    <CalciteBlock heading="Properties" open style={{ width: '300px' }}>
      <Point point={center} />
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
  );
}

export default function Example() {
  return (
    <ArcMapView
      center={[-118.805, 34.027]}
      itemId="2361e8f3f8114c0fa544090d2ff1cbe6"
      zoom={7}
      style={{ height: '100%', flex: 1 }}
    >
      <ArcgisExpand position="top-right">
        <ArcgisLayerList autoDestroyDisabled={true} />
      </ArcgisExpand>
      <ArcgisPlacement position="bottom-left">
        <MapState />
      </ArcgisPlacement>
    </ArcMapView>
  );
}

const Coord = ({ num = 0 }) => (Math.round(num * 100) / 100).toFixed(1);

const Point = ({ point = { longitude: 0, latitude: 0 } }) => (
  <CalciteLabel layout="inline-space-between">
    <span style={titleStyle}>Map center</span>
    <div className="flex">
      <Coord num={point.longitude} />, <Coord num={point.latitude} />
    </div>
  </CalciteLabel>
);

const titleStyle = { color: '#e6772e' };
