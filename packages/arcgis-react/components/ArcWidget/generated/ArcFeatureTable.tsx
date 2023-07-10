import FeatureTable from '@arcgis/core/widgets/FeatureTable';

import { createWidget } from '../../util/createWidget';
export const ArcFeatureTable = createWidget<
  typeof FeatureTable,
  __esri.FeatureTableProperties,
  FeatureTable
>(FeatureTable);
