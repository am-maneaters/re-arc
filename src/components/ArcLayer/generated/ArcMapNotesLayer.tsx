import MapNotesLayer from '@arcgis/core/layers/MapNotesLayer';

import { createLayer } from '../../util/createLayer';
export const ArcMapNotesLayer = createLayer<
  typeof MapNotesLayer,
  __esri.MapNotesLayerProperties,
  MapNotesLayer
>(MapNotesLayer);
