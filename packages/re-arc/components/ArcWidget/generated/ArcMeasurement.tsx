import Measurement from '@arcgis/core/widgets/Measurement';

import { createWidget } from '../../util/createWidget';
export const ArcMeasurement = createWidget<
  typeof Measurement,
  __esri.MeasurementProperties,
  Measurement
>(Measurement);
