import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';

import { createWidget } from '../../util/createWidget';
export const ArcAreaMeasurement2D = createWidget<
  typeof AreaMeasurement2D,
  __esri.AreaMeasurement2DProperties,
  AreaMeasurement2D
>(AreaMeasurement2D);
