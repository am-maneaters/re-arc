import FeatureTemplates from '@arcgis/core/widgets/FeatureTemplates';

import { createWidget } from '../../util/createWidget';
export const ArcFeatureTemplates = createWidget<
  typeof FeatureTemplates,
  __esri.FeatureTemplatesProperties,
  FeatureTemplates
>(FeatureTemplates);
