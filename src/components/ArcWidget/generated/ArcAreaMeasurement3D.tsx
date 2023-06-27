import AreaMeasurement3D from '@arcgis/core/widgets/AreaMeasurement3D';

import { createWidget } from '../../util/createWidget';
export const ArcAreaMeasurement3D = createWidget<
  typeof AreaMeasurement3D,
  __esri.AreaMeasurement3DProperties,
  AreaMeasurement3D
>(AreaMeasurement3D);
