import Slice from '@arcgis/core/widgets/Slice';

import { createWidget } from '../../util/createWidget';
export const ArcSlice = createWidget<
  typeof Slice,
  __esri.SliceProperties,
  Slice
>(Slice);
