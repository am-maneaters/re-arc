import React, { useEffect, useState } from 'react';
import './App.css';
import MapViewComponent from '../src/components/MapViewComponent';
import {
  ViewUIComponent,
  ViewUIComponentProps,
} from '../src/components/ViewUIComponent';
import { useWidget, useOnEvent, useMapView } from '../src/hooks';
import Sketch from '@arcgis/core/widgets/Sketch';
import Zoom from '@arcgis/core/widgets/Zoom';
import { useGraphicsLayer } from '../src/hooks/useGraphicsLayer';
import { useWatchState } from '../src/hooks/useWatchEffect';

const StyledUIComponent: React.FC<ViewUIComponentProps> = (props) => (
  <ViewUIComponent {...props} style={{ backgroundColor: 'white' }} />
);

export function App() {
  const [showCircleTool, setShowCircleTool] = useState(false);
  const [leftMapFocused, setLeftMapFocused] = useState(true);

  const mapView = useMapView(
    { portalItem: { id: '34e47f4d83934024a73d6841b81d6cfb' } },
    {
      ui: { components: [] },
    }
  );

  const center = useWatchState(() => mapView.center);
  const zoom = useWatchState(() => mapView.zoom);

  const mapView2 = useMapView(
    { basemap: 'dark-gray-vector' },
    { zoom, center }
  );

  useEffect(() => {
    mapView2.goTo({ center, zoom }, { animate: false });
  }, [center, mapView2, zoom]);

  const sketchLayer = useGraphicsLayer(mapView, undefined);

  useEffect(() => {
    console.log('sketchLayer', sketchLayer);
  }, [sketchLayer]);

  const [SketchComponent] = useWidget(
    Sketch,
    {
      view: mapView,
      layer: sketchLayer,
    },
    (sketchWidget) => {
      sketchWidget.availableCreateTools = [
        'rectangle',
        ...(showCircleTool ? ['circle'] : []),
      ];
    }
  );

  const [pointerPos, setPointerPos] = useState<[number, number]>([0, 0]);

  const [ZoomWidget] = useWidget(Zoom, {
    view: leftMapFocused ? mapView : mapView2,
  });

  const visibleLayerIds = useWatchState(() =>
    mapView.layerViews.map((v) => v.layer.title)
  );

  useOnEvent(mapView, 'click', (event) => setPointerPos([event.x, event.y]));
  useOnEvent(mapView, 'focus', () => setLeftMapFocused(true));
  useOnEvent(mapView2, 'focus', () => setLeftMapFocused(false));

  const [mouseX, mouseY] = pointerPos;

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <MapViewComponent view={mapView} style={{ height: 500, width: '50%' }}>
          <StyledUIComponent position="top-right">
            <div>Zoom: {zoom}</div>
          </StyledUIComponent>
          <StyledUIComponent position="bottom-left">
            <div>
              X: {mouseX}, Y: {mouseY}
            </div>
            {/* <div>Visible layers: {visibleLayerIds?.join('\n')}</div> */}
          </StyledUIComponent>
          <StyledUIComponent position="manual">
            {SketchComponent({
              style: {
                display: mouseX === 0 ? 'none' : 'block',
                position: 'fixed',
                top: mouseY,
                left: mouseX,
              },
            })}
          </StyledUIComponent>
        </MapViewComponent>
        <MapViewComponent
          view={mapView2}
          style={{ height: 500, width: '50%' }}
        />
      </div>

      <button onClick={() => setShowCircleTool((v) => !v)}>
        {showCircleTool ? 'Hide' : 'Show'} circle sketch tool
      </button>
      {ZoomWidget({ style: { display: 'contents' } })}
    </div>
  );
}
