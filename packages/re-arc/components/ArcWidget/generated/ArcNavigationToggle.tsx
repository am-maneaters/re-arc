import NavigationToggle from '@arcgis/core/widgets/NavigationToggle';

import { createWidget } from '../../util/createWidget';
export const ArcNavigationToggle = createWidget<
  typeof NavigationToggle,
  __esri.NavigationToggleProperties,
  NavigationToggle
>(NavigationToggle);
