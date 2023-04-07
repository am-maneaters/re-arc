import MediaLayer from '@arcgis/core/layers/MediaLayer';

import { createLayer } from '../../util/createLayer';
export const ArcMediaLayer = createLayer<
  typeof MediaLayer,
  __esri.MediaLayerProperties,
  MediaLayer
>(MediaLayer);
