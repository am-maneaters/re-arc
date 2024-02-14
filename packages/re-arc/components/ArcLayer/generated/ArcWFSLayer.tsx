import WFSLayer from '@arcgis/core/layers/WFSLayer';

import { createLayer } from '../../util/createLayer';
export const ArcWFSLayer = createLayer<
  typeof WFSLayer,
  __esri.WFSLayerProperties,
  WFSLayer
>(WFSLayer);
