import Widget from '@arcgis/core/widgets/Widget';

import { createWidget } from '../../util/createWidget';
export const ArcWidget = createWidget<
  typeof Widget,
  __esri.WidgetProperties,
  Widget
>(Widget);
