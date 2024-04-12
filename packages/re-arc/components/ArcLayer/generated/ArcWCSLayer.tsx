import WCSLayer from '@arcgis/core/layers/WCSLayer';

import { createLayer } from '../../util/createLayer';
export const ArcWCSLayer = createLayer<
  typeof WCSLayer,
  __esri.WCSLayerProperties,
  WCSLayer
>(WCSLayer);
