import Fullscreen from '@arcgis/core/widgets/Fullscreen';

import { createWidget } from '../../util/createWidget';
export const ArcFullscreen = createWidget<
  typeof Fullscreen,
  __esri.FullscreenProperties,
  Fullscreen
>(Fullscreen);
