import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion';

import { createWidget } from '../../util/createWidget';
export const ArcCoordinateConversion = createWidget<
  typeof CoordinateConversion,
  __esri.CoordinateConversionProperties,
  CoordinateConversion
>(CoordinateConversion);
