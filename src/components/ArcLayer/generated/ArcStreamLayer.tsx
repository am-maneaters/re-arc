import StreamLayer from '@arcgis/core/layers/StreamLayer';

import { createLayer } from '../createLayer';
export const ArcStreamLayer = createLayer<
  typeof StreamLayer,
  __esri.StreamLayerProperties,
  StreamLayer
>(StreamLayer);
