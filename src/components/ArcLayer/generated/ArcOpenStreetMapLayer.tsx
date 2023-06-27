import OpenStreetMapLayer from '@arcgis/core/layers/OpenStreetMapLayer';

import { createLayer } from '../../util/createLayer';
export const ArcOpenStreetMapLayer = createLayer<
  typeof OpenStreetMapLayer,
  __esri.OpenStreetMapLayerProperties,
  OpenStreetMapLayer
>(OpenStreetMapLayer);
