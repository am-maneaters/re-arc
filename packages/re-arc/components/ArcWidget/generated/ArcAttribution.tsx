import Attribution from '@arcgis/core/widgets/Attribution';

import { createWidget } from '../../util/createWidget';
export const ArcAttribution = createWidget<
  typeof Attribution,
  __esri.AttributionProperties,
  Attribution
>(Attribution);
