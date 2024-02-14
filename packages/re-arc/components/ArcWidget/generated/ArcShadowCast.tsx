import ShadowCast from '@arcgis/core/widgets/ShadowCast';

import { createWidget } from '../../util/createWidget';
export const ArcShadowCast = createWidget<
  typeof ShadowCast,
  __esri.ShadowCastProperties,
  ShadowCast
>(ShadowCast);
