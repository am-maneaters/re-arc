import { createContext, useContext, useEffect, useState } from 'react';

import { EventHandlers } from '../../typings/EsriTypes';
import { AsyncReturnType, Overloads } from '../../typings/utilityTypes';
import { useView } from '../ArcView/ViewContext';
import { ArcReactiveProp } from '../util/ArcReactiveProp';
import { layerFactory } from './layerFactory';

type LayerTypes = typeof layerFactory;

type LayerType = keyof LayerTypes;

const LayerViewContext = createContext<__esri.LayerView | undefined>(undefined);

export const useLayerView = () => {
  const view = useContext(LayerViewContext);

  if (!view) {
    throw new Error('useLayerView must be used within a LayerViewContext');
  }

  return view;
};

export function ArcLayer<
  LayerName extends LayerType,
  LayerInstance extends ReturnType<AsyncReturnType<LayerTypes[LayerName]>>,
  LayerEvents extends Parameters<Overloads<LayerInstance['on']>>
>({
  type,
  layerProps = {},
  onLayerCreated,
  eventHandlers,
  children,
}: {
  type: LayerName;
  layerProps?: Parameters<AsyncReturnType<(typeof layerFactory)[LayerName]>>[0];
  onLayerCreated?: (layer: LayerInstance) => void;
  eventHandlers?: EventHandlers<LayerInstance, LayerEvents>;
  children?: React.ReactNode;
}) {
  const mapView = useView();

  const [layer, setLayer] = useState<LayerInstance>();
  const [layerView, setLayerView] = useState<__esri.LayerView>();

  useEffect(() => {
    let destroyed = false;
    let layer: LayerInstance | null = null;
    layerFactory[type]().then((res) => {
      if (destroyed) return;

      layer = res(layerProps as any) as LayerInstance;

      setLayer(layer);
    });

    return () => {
      destroyed = true;
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
      {layerView && (
        <LayerViewContext.Provider value={layerView}>
          {children}
        </LayerViewContext.Provider>
      )}
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
}
