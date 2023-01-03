import MapViewComponent from '../src/components/MapViewComponent';
import {
  ViewUIComponent,
  ViewUIComponentProps,
} from '../src/components/ViewUIComponent';
import { useMapView, useWidget } from '../src/hooks';
import './TestsRouter.css';

import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import Expand from '@arcgis/core/widgets/Expand';

import '@esri/calcite-components/dist/components/calcite-block';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-shell';
import '@esri/calcite-components/dist/components/calcite-shell-panel';

import {
  CalciteBlock,
  CalciteLabel,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';
import { useWatchState } from '../src/hooks/useWatchEffect';
import { useRef, useEffect } from 'react';

const StyledUIComponent: React.FC<ViewUIComponentProps> = (props) => (
  <ViewUIComponent {...props} style={{ backgroundColor: 'white' }} />
);

const WidgetComponent = ({ widget }: { widget: __esri.Widget }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current === null || !widget) return;

    // Create new widget instance and place it in the DOM
    widget.container = ref.current;
  }, [widget]);

  return <div ref={ref} />;
};

export function TestsRouter() {
  const mapView = useMapView(
    {
      portalItem: {
        id: '2361e8f3f8114c0fa544090d2ff1cbe6',
      },
    },
    {}
  );

  const layerList = useWidget(new LayerList({ view: mapView }));

  const expand = useWidget(
    new Expand({
      view: mapView,
      content: new Legend({
        view: mapView,
      }),
      expandTooltip: 'Legend',
    })
  );

  const popupVisible = useWatchState(() => mapView.popup.visible);

  const renderExtent = (type: string, extent: __esri.Extent) => undefined;

  const allLayersVisible = useWatchState(async () =>
    mapView.map.allLayers.every((layer) => layer.visible)
  );

  console.log('allLayersVisible', allLayersVisible);

  return (
    <div>
      <CalciteShell className="calcite-theme-dark">
        <MapViewComponent view={mapView} style={{ height: '100vh' }}>
          <StyledUIComponent position="top-right">
            <WidgetComponent widget={layerList} />
          </StyledUIComponent>
          <StyledUIComponent position="bottom-right">
            <WidgetComponent widget={expand} />
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
