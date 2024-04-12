import LineOfSight from '@arcgis/core/widgets/LineOfSight';

import { createWidget } from '../../util/createWidget';
export const ArcLineOfSight = createWidget<
  typeof LineOfSight,
  __esri.LineOfSightProperties,
  LineOfSight
>(LineOfSight);
