import Home from '@arcgis/core/widgets/Home';

import { createWidget } from '../../util/createWidget';
export const ArcHome = createWidget<typeof Home, __esri.HomeProperties, Home>(
  Home
);
