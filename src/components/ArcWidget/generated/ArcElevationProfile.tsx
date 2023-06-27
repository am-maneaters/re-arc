import ElevationProfile from '@arcgis/core/widgets/ElevationProfile';

import { createWidget } from '../../util/createWidget';
export const ArcElevationProfile = createWidget<
  typeof ElevationProfile,
  __esri.ElevationProfileProperties,
  ElevationProfile
>(ElevationProfile);
