import Compass from '@arcgis/core/widgets/Compass';

import { createWidget } from '../../util/createWidget';
export const ArcCompass = createWidget<
  typeof Compass,
  __esri.CompassProperties,
  Compass
>(Compass);
