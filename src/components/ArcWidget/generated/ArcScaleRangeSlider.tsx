import ScaleRangeSlider from '@arcgis/core/widgets/ScaleRangeSlider';

import { createWidget } from '../../util/createWidget';
export const ArcScaleRangeSlider = createWidget<
  typeof ScaleRangeSlider,
  __esri.ScaleRangeSliderProperties,
  ScaleRangeSlider
>(ScaleRangeSlider);
