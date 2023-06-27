import DimensionLayer from '@arcgis/core/layers/DimensionLayer';

import { createLayer } from '../../util/createLayer';
export const ArcDimensionLayer = createLayer<
  typeof DimensionLayer,
  __esri.DimensionLayerProperties,
  DimensionLayer
>(DimensionLayer);
