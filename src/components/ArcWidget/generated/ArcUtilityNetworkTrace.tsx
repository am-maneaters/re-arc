import UtilityNetworkTrace from '@arcgis/core/widgets/UtilityNetworkTrace';

import { createWidget } from '../../util/createWidget';
export const ArcUtilityNetworkTrace = createWidget<
  typeof UtilityNetworkTrace,
  __esri.UtilityNetworkTraceProperties,
  UtilityNetworkTrace
>(UtilityNetworkTrace);
