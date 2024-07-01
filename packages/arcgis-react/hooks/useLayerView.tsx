import { useContext } from 'react';
import { LayerViewContext } from '../components/util/createLayer';

export function useLayerView(): __esri.LayerView {
  const layerView = useContext(LayerViewContext);

  if (!layerView) {
    throw new Error('useLayerView must be used within a valid Provider');
  }

  return layerView;
}
