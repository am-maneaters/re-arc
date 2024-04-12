import BaseElevationLayer from '@arcgis/core/layers/BaseElevationLayer';

import { createLayer } from '../../util/createLayer';
export const ArcBaseElevationLayer = createLayer<
  typeof BaseElevationLayer,
  __esri.BaseElevationLayerProperties,
  BaseElevationLayer
>(BaseElevationLayer);
