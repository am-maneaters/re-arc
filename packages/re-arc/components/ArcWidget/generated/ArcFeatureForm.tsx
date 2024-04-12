import FeatureForm from '@arcgis/core/widgets/FeatureForm';

import { createWidget } from '../../util/createWidget';
export const ArcFeatureForm = createWidget<
  typeof FeatureForm,
  __esri.FeatureFormProperties,
  FeatureForm
>(FeatureForm);
