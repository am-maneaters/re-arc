import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

import { createLayer } from '../../util/createLayer';
export const ArcMapImageLayer = createLayer<
  typeof MapImageLayer,
  __esri.MapImageLayerProperties,
  MapImageLayer
>(MapImageLayer);
