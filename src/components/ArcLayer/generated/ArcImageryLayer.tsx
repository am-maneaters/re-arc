import ImageryLayer from '@arcgis/core/layers/ImageryLayer';

import { createLayer } from '../../util/createLayer';
export const ArcImageryLayer = createLayer<
  typeof ImageryLayer,
  __esri.ImageryLayerProperties,
  ImageryLayer
>(ImageryLayer);
