import LineOfSightLayer from '@arcgis/core/layers/LineOfSightLayer';

import { createLayer } from '../../util/createLayer';
export const ArcLineOfSightLayer = createLayer<
  typeof LineOfSightLayer,
  __esri.LineOfSightLayerProperties,
  LineOfSightLayer
>(LineOfSightLayer);
