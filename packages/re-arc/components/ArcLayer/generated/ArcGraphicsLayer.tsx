import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import { createLayer } from '../../util/createLayer';
export const ArcGraphicsLayer = createLayer<
  typeof GraphicsLayer,
  __esri.GraphicsLayerProperties,
  GraphicsLayer
>(GraphicsLayer);
