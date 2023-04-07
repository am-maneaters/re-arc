import { useEffect, useState } from 'react';

import { useEventHandlers } from '../../hooks/useEventHandlers';
import { EventHandlers } from '../../typings/EsriTypes';
import { useView } from '../ArcView/ViewContext';
import { ArcReactiveProp } from './ArcReactiveProp';

export function createLayer<
  LayerConstructorType extends new (
    props: LayerProperties | undefined
  ) => LayerInstance,
  LayerProperties,
  LayerInstance extends __esri.Layer
>(LayerConstructor: LayerConstructorType) {
  return function ArcLayer({
    layerProps,
    onLayerCreated,
    eventHandlers,
    children,
  }: {
    layerProps?: LayerProperties;
    onLayerCreated?: (layer: LayerInstance) => void;
    eventHandlers?: EventHandlers<LayerInstance>;
    children?: React.ReactNode;
  }) {
    const mapView = useView();
    const [layer, setLayer] = useState<LayerInstance>();
    const [layerView, setLayerView] = useState<__esri.LayerView>();

    useEffect(() => {
      if (!mapView) return;
      const layer = new LayerConstructor(layerProps);
      setLayer(layer);
      mapView.map.add(layer);

      return () => {
        mapView.map.remove(layer);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapView]);

    useEffect(() => {
      if (!layer) return;
      layer.when(() => {
        onLayerCreated?.(layer);
        mapView.whenLayerView(layer).then((layerView) => {
          setLayerView(layerView);
        });
      });
    }, [layer, mapView, onLayerCreated]);

    useEventHandlers(layer, eventHandlers);

    return (
      <>
        {layerView && children}
        {layerProps &&
          layer &&
          Object.entries(layerProps).map(([key, val]) => (
            <ArcReactiveProp
              key={key}
              accessor={layer}
              property={key}
              value={val}
            />
          ))}
      </>
    );
  };
}
