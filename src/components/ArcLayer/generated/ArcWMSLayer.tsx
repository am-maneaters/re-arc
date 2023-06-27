import WMSLayer from '@arcgis/core/layers/WMSLayer';

import { createLayer } from '../../util/createLayer';
export const ArcWMSLayer = createLayer<
  typeof WMSLayer,
  __esri.WMSLayerProperties,
  WMSLayer
>(WMSLayer);
