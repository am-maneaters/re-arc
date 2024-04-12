import ImageryTileLayer from '@arcgis/core/layers/ImageryTileLayer';

import { createLayer } from '../../util/createLayer';
export const ArcImageryTileLayer = createLayer<
  typeof ImageryTileLayer,
  __esri.ImageryTileLayerProperties,
  ImageryTileLayer
>(ImageryTileLayer);
