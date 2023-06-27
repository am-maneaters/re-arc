import LayerList from '@arcgis/core/widgets/LayerList';

import { createWidget } from '../../util/createWidget';
export const ArcLayerList = createWidget<
  typeof LayerList,
  __esri.LayerListProperties,
  LayerList
>(LayerList);
