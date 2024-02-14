import Feature from '@arcgis/core/widgets/Feature';

import { createWidget } from '../../util/createWidget';
export const ArcFeature = createWidget<
  typeof Feature,
  __esri.FeatureProperties,
  Feature
>(Feature);
