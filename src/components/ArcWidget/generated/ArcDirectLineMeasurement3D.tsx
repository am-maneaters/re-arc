import DirectLineMeasurement3D from '@arcgis/core/widgets/DirectLineMeasurement3D';

import { createWidget } from '../../util/createWidget';
export const ArcDirectLineMeasurement3D = createWidget<
  typeof DirectLineMeasurement3D,
  __esri.DirectLineMeasurement3DProperties,
  DirectLineMeasurement3D
>(DirectLineMeasurement3D);
