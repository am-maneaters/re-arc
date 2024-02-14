import Legend from '@arcgis/core/widgets/Legend';

import { createWidget } from '../../util/createWidget';
export const ArcLegend = createWidget<
  typeof Legend,
  __esri.LegendProperties,
  Legend
>(Legend);
