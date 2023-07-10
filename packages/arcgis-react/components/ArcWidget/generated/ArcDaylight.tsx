import Daylight from '@arcgis/core/widgets/Daylight';

import { createWidget } from '../../util/createWidget';
export const ArcDaylight = createWidget<
  typeof Daylight,
  __esri.DaylightProperties,
  Daylight
>(Daylight);
