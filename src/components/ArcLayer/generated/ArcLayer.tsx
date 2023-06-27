import Layer from '@arcgis/core/layers/Layer';

import { createLayer } from '../../util/createLayer';
export const ArcLayer = createLayer<
  typeof Layer,
  __esri.LayerProperties,
  Layer
>(Layer);
