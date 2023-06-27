import Slider from '@arcgis/core/widgets/Slider';

import { createWidget } from '../../util/createWidget';
export const ArcSlider = createWidget<
  typeof Slider,
  __esri.SliderProperties,
  Slider
>(Slider);
