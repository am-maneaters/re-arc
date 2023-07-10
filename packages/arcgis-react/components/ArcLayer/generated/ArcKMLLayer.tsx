import KMLLayer from '@arcgis/core/layers/KMLLayer';

import { createLayer } from '../../util/createLayer';
export const ArcKMLLayer = createLayer<
  typeof KMLLayer,
  __esri.KMLLayerProperties,
  KMLLayer
>(KMLLayer);
