import FloorFilter from '@arcgis/core/widgets/FloorFilter';

import { createWidget } from '../../util/createWidget';
export const ArcFloorFilter = createWidget<
  typeof FloorFilter,
  __esri.FloorFilterProperties,
  FloorFilter
>(FloorFilter);
