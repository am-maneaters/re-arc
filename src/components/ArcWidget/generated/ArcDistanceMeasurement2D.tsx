import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D';

import { createWidget } from '../../util/createWidget';
export const ArcDistanceMeasurement2D = createWidget<
  typeof DistanceMeasurement2D,
  __esri.DistanceMeasurement2DProperties,
  DistanceMeasurement2D
>(DistanceMeasurement2D);
