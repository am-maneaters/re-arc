import TimeSlider from '@arcgis/core/widgets/TimeSlider';

import { createWidget } from '../../util/createWidget';
export const ArcTimeSlider = createWidget<
  typeof TimeSlider,
  __esri.TimeSliderProperties,
  TimeSlider
>(TimeSlider);
