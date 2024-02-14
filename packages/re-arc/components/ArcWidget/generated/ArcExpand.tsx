import Expand from '@arcgis/core/widgets/Expand';

import { createWidget } from '../../util/createWidget';
export const ArcExpand = createWidget<
  typeof Expand,
  __esri.ExpandProperties,
  Expand
>(Expand);
