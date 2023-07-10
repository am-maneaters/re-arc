import SubtypeGroupLayer from '@arcgis/core/layers/SubtypeGroupLayer';

import { createLayer } from '../../util/createLayer';
export const ArcSubtypeGroupLayer = createLayer<
  typeof SubtypeGroupLayer,
  __esri.SubtypeGroupLayerProperties,
  SubtypeGroupLayer
>(SubtypeGroupLayer);
