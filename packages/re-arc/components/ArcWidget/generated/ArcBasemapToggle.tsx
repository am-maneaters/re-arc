import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';

import { createWidget } from '../../util/createWidget';
export const ArcBasemapToggle = createWidget<
  typeof BasemapToggle,
  __esri.BasemapToggleProperties,
  BasemapToggle
>(BasemapToggle);
