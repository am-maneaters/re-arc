import WMTSLayer from '@arcgis/core/layers/WMTSLayer';

import { createLayer } from '../../util/createLayer';
export const ArcWMTSLayer = createLayer<
  typeof WMTSLayer,
  __esri.WMTSLayerProperties,
  WMTSLayer
>(WMTSLayer);
