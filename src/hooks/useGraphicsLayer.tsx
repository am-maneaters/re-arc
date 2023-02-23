import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import MapView from '@arcgis/core/views/MapView';
import { useId, useMemo, useEffect, useRef, useState } from 'react';
import { useWatchEffect } from './useWatchEffect';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';

// Add a layer to the map and get the reference to the layer
export function useGraphicsLayer(
  mapView: MapView | undefined,
  layerParams: ConstructorParameters<typeof GraphicsLayer>[0]
): GraphicsLayer {
  const id = useId();

  const modifiedParams = useMemo(
    () => ({ ...layerParams, id }),
    [id, layerParams]
  );

  const layer = useRef(new GraphicsLayer(modifiedParams));

  useEffect(() => {
    if (!mapView) return;
    const currentLayer = layer.current;
    const prevLayer = mapView.map.findLayerById(id);
    if (prevLayer) {
      mapView.map.remove(prevLayer);
    }
    mapView.map.add(currentLayer);

    return () => {
      mapView.map.remove(currentLayer);
    };
  }, [id, layer, mapView]);

  useWatchEffect(
    () => modifiedParams,
    () => {
      if (modifiedParams) layer.current.set(modifiedParams);
    }
  );

  return layer.current;
}

export function useFeatureLayer(
  mapView: MapView | undefined,
  layerParams: ConstructorParameters<typeof FeatureLayer>[0]
): FeatureLayer {
  const id = useId();

  const layer = useRef(new FeatureLayer({ ...layerParams, id }));

  useEffect(() => {
    if (!mapView) return;
    const currentLayer = layer.current;
    const prevLayer = mapView.map.findLayerById(id);
    if (prevLayer) {
      mapView.map.remove(prevLayer);
    }
    mapView.map.add(currentLayer);

    return () => {
      mapView.map.remove(currentLayer);
    };
  }, [id, layer, mapView]);

  return layer.current;
}

export const useFeatureLayerView = (
  mapView: MapView | undefined,
  layer: FeatureLayer
) => {
  const [layerView, setLayerView] = useState<FeatureLayerView>();

  useEffect(() => {
    if (!layer || !mapView) return;
    mapView.whenLayerView(layer).then((layerView) => {
      setLayerView(layerView);
    });
  }, [layer, mapView]);

  return layerView;
};
