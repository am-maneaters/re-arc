import Print from '@arcgis/core/widgets/Print';

import { createWidget } from '../../util/createWidget';
export const ArcPrint = createWidget<
  typeof Print,
  __esri.PrintProperties,
  Print
>(Print);
