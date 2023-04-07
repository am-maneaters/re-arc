import Histogram from '@arcgis/core/widgets/Histogram';

import { createWidget } from '../../util/createWidget';
export const ArcHistogram = createWidget<
  typeof Histogram,
  __esri.HistogramProperties,
  Histogram
>(Histogram);
