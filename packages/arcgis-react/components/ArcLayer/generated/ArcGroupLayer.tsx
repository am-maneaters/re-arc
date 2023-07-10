import GroupLayer from '@arcgis/core/layers/GroupLayer';

import { createLayer } from '../../util/createLayer';
export const ArcGroupLayer = createLayer<
  typeof GroupLayer,
  __esri.GroupLayerProperties,
  GroupLayer
>(GroupLayer);
