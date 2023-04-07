import UtilityNetworkAssociations from '@arcgis/core/widgets/UtilityNetworkAssociations';

import { createWidget } from '../../util/createWidget';
export const ArcUtilityNetworkAssociations = createWidget<
  typeof UtilityNetworkAssociations,
  __esri.UtilityNetworkAssociationsProperties,
  UtilityNetworkAssociations
>(UtilityNetworkAssociations);
