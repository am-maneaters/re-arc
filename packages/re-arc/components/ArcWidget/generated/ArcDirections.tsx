import Directions from '@arcgis/core/widgets/Directions';

import { createWidget } from '../../util/createWidget';
export const ArcDirections = createWidget<
  typeof Directions,
  __esri.DirectionsProperties,
  Directions
>(Directions);
