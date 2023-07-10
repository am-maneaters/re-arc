import Zoom from '@arcgis/core/widgets/Zoom';

import { createWidget } from '../../util/createWidget';
export const ArcZoom = createWidget<typeof Zoom, __esri.ZoomProperties, Zoom>(
  Zoom
);
