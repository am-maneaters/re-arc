import PointCloudLayer from '@arcgis/core/layers/PointCloudLayer';

import { createLayer } from '../../util/createLayer';
export const ArcPointCloudLayer = createLayer<
  typeof PointCloudLayer,
  __esri.PointCloudLayerProperties,
  PointCloudLayer
>(PointCloudLayer);
