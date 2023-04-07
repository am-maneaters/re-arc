import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

import { createLayer } from '../../util/createLayer';
export const ArcFeatureLayer = createLayer<
  typeof FeatureLayer,
  __esri.FeatureLayerProperties,
  FeatureLayer
>(FeatureLayer);
