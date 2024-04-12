import ScaleBar from '@arcgis/core/widgets/ScaleBar';

import { createWidget } from '../../util/createWidget';
export const ArcScaleBar = createWidget<
  typeof ScaleBar,
  __esri.ScaleBarProperties,
  ScaleBar
>(ScaleBar);
