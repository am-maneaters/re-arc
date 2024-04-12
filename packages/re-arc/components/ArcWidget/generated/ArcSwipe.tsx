import Swipe from '@arcgis/core/widgets/Swipe';

import { createWidget } from '../../util/createWidget';
export const ArcSwipe = createWidget<
  typeof Swipe,
  __esri.SwipeProperties,
  Swipe
>(Swipe);
