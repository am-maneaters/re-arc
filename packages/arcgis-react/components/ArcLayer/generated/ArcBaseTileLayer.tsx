import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer';

import { createLayer } from '../../util/createLayer';
export const ArcBaseTileLayer = createLayer<
  typeof BaseTileLayer,
  __esri.BaseTileLayerProperties,
  BaseTileLayer
>(BaseTileLayer);
