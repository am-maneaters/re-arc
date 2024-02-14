import BasemapLayerList from '@arcgis/core/widgets/BasemapLayerList';

import { createWidget } from '../../util/createWidget';
export const ArcBasemapLayerList = createWidget<
  typeof BasemapLayerList,
  __esri.BasemapLayerListProperties,
  BasemapLayerList
>(BasemapLayerList);
