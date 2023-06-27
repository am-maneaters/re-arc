import UnsupportedLayer from '@arcgis/core/layers/UnsupportedLayer';

import { createLayer } from '../../util/createLayer';
export const ArcUnsupportedLayer = createLayer<
  typeof UnsupportedLayer,
  __esri.UnsupportedLayerProperties,
  UnsupportedLayer
>(UnsupportedLayer);
