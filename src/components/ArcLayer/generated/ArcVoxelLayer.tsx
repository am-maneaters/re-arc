import VoxelLayer from '@arcgis/core/layers/VoxelLayer';

import { createLayer } from '../../util/createLayer';
export const ArcVoxelLayer = createLayer<
  typeof VoxelLayer,
  __esri.VoxelLayerProperties,
  VoxelLayer
>(VoxelLayer);
