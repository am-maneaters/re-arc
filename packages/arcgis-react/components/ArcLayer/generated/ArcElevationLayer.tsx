import ElevationLayer from '@arcgis/core/layers/ElevationLayer';

import { createLayer } from '../../util/createLayer';
export const ArcElevationLayer = createLayer<
  typeof ElevationLayer,
  __esri.ElevationLayerProperties,
  ElevationLayer
>(ElevationLayer);
