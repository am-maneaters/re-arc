import { ArcUI } from '../components/ArcUI';

import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import Expand from '@arcgis/core/widgets/Expand';

import Map from '@arcgis/core/WebMap';

import './ReactiveDemo.css';

import {
  CalciteBlock,
  CalciteLabel,
  CalcitePanel,
  CalciteShellPanel,
} from '@esri/calcite-components-react';
import { useWatchState, useWatchEffect } from '../hooks/useWatchEffect';
import { useMemo, useState } from 'react';
import { WidgetComponent } from '../components/WidgetComponent';
import MapViewComponent from '../components/MapViewContext';
import MapView from '@arcgis/core/views/MapView';

const Coord = ({ num = 0, label = '' }) => (
  <div>
    {label}: {(Math.round(num * 100) / 100).toFixed(4)}
  </div>
);
const Extent = ({
  isNew = false,
  extent,
}: {
  isNew?: boolean;
  extent?: __esri.Extent;
}) =>
  extent ? (
    <CalciteLabel id="current-extent-label">
      <span className="title">
        {isNew ? 'Current Extent' : 'Previous Extent'}
      </span>
      <Coord label="xmax" num={extent.xmax} />
      <Coord label="xmin" num={extent.xmin} />
      <Coord label="ymax" num={extent.ymax} />
      <Coord label="ymin" num={extent.ymin} />
    </CalciteLabel>
  ) : null;

export function ReactiveUtils() {
  const [mapView, setMapView] = useState<MapView>();

  const [previousExtent, setPreviousExtent] = useState<__esri.Extent>();
  const [currentExtent, setCurrentExtent] = useState<__esri.Extent>();

  const popupVisible = useWatchState(() => mapView?.popup.visible, [mapView]);

  const allLayersVisible = useWatchState(
    () => mapView?.layerViews.every((layer) => layer.visible) ?? false,
    [mapView?.layerViews]
  );
  const visibleLayers = useWatchState(
    () =>
      mapView?.allLayerViews
        .filter((layer) => layer.visible)
        .map(({ layer }) => layer.title),
    [mapView?.allLayerViews]
  );

  const [scale, setScale] = useState<string>();

  useWatchEffect(
    () => [mapView?.stationary, mapView?.extent, mapView?.scale] as const,
    ([stationary, extent, scale], [wasStationary]) => {
      if (stationary) {
        if (scale) setScale((Math.round(scale * 100) / 100).toFixed(4));
        if (extent !== currentExtent) {
          setCurrentExtent(extent);
          setPreviousExtent(currentExtent);
        }
      } else if (wasStationary) {
        setCurrentExtent(extent);
      }
    }
  );

  const layerList = useMemo(
    () =>
      new LayerList({
        view: mapView,
      }),
    [mapView]
  );

  const legend = useMemo(
    () =>
      new Expand({
        view: mapView,
        content: new Legend({
          view: mapView,
        }),
        expandTooltip: 'Legend',
        expanded: true,
      }),
    [mapView]
  );

  return (
    <>
      <MapViewComponent
        initView={() =>
          new MapView({
            map: new Map({
              portalItem: {
                id: '2361e8f3f8114c0fa544090d2ff1cbe6',
              },
            }),
            center: [-118.805, 34.027],
            zoom: 7,
          })
        }
        onViewCreated={(view) => {
          setMapView(view);
        }}
        style={{ height: '100vh' }}
      >
        <ArcUI position="top-left" style={{ background: 'white' }}>
          Zoom level: {mapView?.zoom}
        </ArcUI>
        <ArcUI position="top-right">
          Layer List
          <WidgetComponent widget={layerList} />
        </ArcUI>
        <ArcUI position="bottom-right">
          <WidgetComponent widget={legend} />
        </ArcUI>
      </MapViewComponent>
      <CalciteShellPanel slot="panel-end" position="end">
        <CalcitePanel heading="ReactiveUtils Watch Events">
          <CalciteBlock
            heading="Extent Property"
            description="Displays the current and previous extent value when the extent has changed."
            collapsible
            open
            id="CalciteBlock"
          >
            <Extent isNew extent={currentExtent} />
            <Extent extent={previousExtent} />
          </CalciteBlock>
          <CalciteBlock
            heading="Scale Property"
            description="Displays the current scale value when the scale has changed."
            collapsible
            open
            id="CalciteBlock"
          >
            <CalciteLabel
              id="current-scale-label"
              layout="inline-space-between"
            >
              <span className="title">current extent: </span> {scale}
            </CalciteLabel>
          </CalciteBlock>
          <CalciteBlock
            heading="Popup Visible Property"
            description="Displays the value of the popup's visible property on the view."
            collapsible
            open
            id="CalciteBlock"
          >
            <CalciteLabel id="popup-label" layout="inline-space-between">
              <span className="title">Popup visible: </span>
              <b>{popupVisible ? 'true' : 'false'}</b>
            </CalciteLabel>
          </CalciteBlock>
          <CalciteBlock
            heading="Visible Layers Properties"
            description="Checks if all the layers are visible or not and shows the current visible layers in the map."
            collapsible
            open
            id="CalciteBlock"
          >
            <CalciteLabel id="layers-label">
              <span className="title">
                {allLayersVisible
                  ? 'All layers are visible'
                  : 'Not all layers are visible'}
              </span>
              {visibleLayers?.map((layer) => (
                <div key={layer}>- {layer}</div>
              ))}
            </CalciteLabel>
          </CalciteBlock>
        </CalcitePanel>
      </CalciteShellPanel>
    </>
  );
}
