import Locate from '@arcgis/core/widgets/Locate';

import { createWidget } from '../../util/createWidget';
export const ArcLocate = createWidget<
  typeof Locate,
  __esri.LocateProperties,
  Locate
>(Locate);
