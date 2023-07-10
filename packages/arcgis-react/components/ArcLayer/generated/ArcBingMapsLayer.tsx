import BingMapsLayer from '@arcgis/core/layers/BingMapsLayer';

import { createLayer } from '../../util/createLayer';
export const ArcBingMapsLayer = createLayer<
  typeof BingMapsLayer,
  __esri.BingMapsLayerProperties,
  BingMapsLayer
>(BingMapsLayer);
