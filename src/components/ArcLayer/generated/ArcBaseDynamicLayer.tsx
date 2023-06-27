import BaseDynamicLayer from '@arcgis/core/layers/BaseDynamicLayer';

import { createLayer } from '../../util/createLayer';
export const ArcBaseDynamicLayer = createLayer<
  typeof BaseDynamicLayer,
  __esri.BaseDynamicLayerProperties,
  BaseDynamicLayer
>(BaseDynamicLayer);
