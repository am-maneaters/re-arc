import IntegratedMeshLayer from '@arcgis/core/layers/IntegratedMeshLayer';

import { createLayer } from '../../util/createLayer';
export const ArcIntegratedMeshLayer = createLayer<
  typeof IntegratedMeshLayer,
  __esri.IntegratedMeshLayerProperties,
  IntegratedMeshLayer
>(IntegratedMeshLayer);
