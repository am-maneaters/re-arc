import { useEffect, useState } from 'react';

import { EventHandlers } from '../../typings/EsriTypes';
import { useView } from '../ArcView/ViewContext';
import { ArcReactiveProp } from '../util/ArcReactiveProp';

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
      const layer = new LayerConstructor(layerProps);
      setLayer(layer);

      return () => {
        if (layer) mapView.map.remove(layer);
      };

      // Only run this effect when the map view changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapView]);

    // Add event handlers to the layer
    useEffect(() => {
      if (layer === undefined || !eventHandlers) return;
      const handles = Object.entries(eventHandlers).map(([event, handler]) =>
        layer.on(event as any, handler as any)
      );

      return () => {
        for (const handle of handles) handle.remove();
      };
    }, [eventHandlers, layer]);

    useEffect(() => {
      let destroyed = false;
      if (layer === undefined) return;

      mapView.map.add(layer);

      layer.when(() => {
        if (destroyed || layer === null) return;
        onLayerCreated?.(layer);
        mapView.whenLayerView(layer).then((layerView) => {
          if (destroyed || layer === null) return;
          setLayerView?.(layerView);
        });
      });

      return () => {
        destroyed = true;
      };
    }, [layer, mapView, onLayerCreated]);

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
