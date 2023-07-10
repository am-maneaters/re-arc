import Track from '@arcgis/core/widgets/Track';

import { createWidget } from '../../util/createWidget';
export const ArcTrack = createWidget<
  typeof Track,
  __esri.TrackProperties,
  Track
>(Track);
