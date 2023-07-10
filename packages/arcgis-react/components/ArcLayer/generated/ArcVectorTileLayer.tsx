import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';

import { createLayer } from '../../util/createLayer';
export const ArcVectorTileLayer = createLayer<
  typeof VectorTileLayer,
  __esri.VectorTileLayerProperties,
  VectorTileLayer
>(VectorTileLayer);
