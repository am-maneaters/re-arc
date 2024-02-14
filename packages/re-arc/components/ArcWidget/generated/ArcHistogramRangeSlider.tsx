import HistogramRangeSlider from '@arcgis/core/widgets/HistogramRangeSlider';

import { createWidget } from '../../util/createWidget';
export const ArcHistogramRangeSlider = createWidget<
  typeof HistogramRangeSlider,
  __esri.HistogramRangeSliderProperties,
  HistogramRangeSlider
>(HistogramRangeSlider);
