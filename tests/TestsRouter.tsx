import MapViewComponent from '../src/components/MapViewComponent';
import {
  ViewUIComponent,
  ViewUIComponentProps,
} from '../src/components/ViewUIComponent';
import './TestsRouter.css';

import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import Expand from '@arcgis/core/widgets/Expand';

import {
  CalciteBlock,
  CalciteLabel,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';
import { useWatchState } from '../src/hooks/useWatchEffect';
import { useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { WidgetComponent } from '../src/components/WidgetComponent';

const StyledUIComponent: React.FC<ViewUIComponentProps> = (props) => (
  <ViewUIComponent {...props} style={{ backgroundColor: 'white' }} />
);

export function TestsRouter() {
  const [mapView, setMapView] = useState<MapView>();

  const popupVisible = useWatchState(() => mapView?.popup.visible);

  const renderExtent = (type: string, extent: __esri.Extent) => undefined;

  const allLayersVisible = useWatchState(() =>
    mapView?.map.allLayers.every((layer) => layer.visible)
  );

  console.log('allLayersVisible', allLayersVisible);

  return (
    <div>
      <CalciteShell className="calcite-theme-dark">
        <MapViewComponent
          mapProps={{
            portalItem: {
              id: '2361e8f3f8114c0fa544090d2ff1cbe6',
            },
          }}
          mapViewProps={{}}
          onMapViewLoad={setMapView}
          style={{ height: '100vh' }}
        >
          <StyledUIComponent position="top-right">
            <WidgetComponent
              widgetInit={() => new LayerList({ view: mapView })}
            />
          </StyledUIComponent>
          <StyledUIComponent position="bottom-right">
            <WidgetComponent
              widgetInit={() =>
                new Expand({
                  view: mapView,
                  content: new Legend({
                    view: mapView,
                  }),
                  expandTooltip: 'Legend',
                })
              }
              onWidgetLoad={(widget) => {
                widget.expand();
              }}
            />
          </StyledUIComponent>
        </MapViewComponent>
        <CalciteShellPanel slot="contextual-panel">
          <CalcitePanel heading="ReactiveUtils Watch Events">
            <CalciteBlock
              heading="Extent Property"
              description="Displays the current and previous extent value when the extent has changed."
              collapsible
              open
              id="CalciteBlock"
            >
              <CalciteLabel id="current-extent-label">
                {/* {renderExtent('current', extent)} */}
              </CalciteLabel>
              <CalciteLabel id="previous-extent-label">
                {/* {renderExtent('previous', extent)} */}
              </CalciteLabel>
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
              />
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
              </CalciteLabel>
            </CalciteBlock>
          </CalcitePanel>
        </CalciteShellPanel>
      </CalciteShell>
    </div>
  );
}
