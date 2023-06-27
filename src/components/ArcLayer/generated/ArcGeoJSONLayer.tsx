import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';

import { createLayer } from '../../util/createLayer';
export const ArcGeoJSONLayer = createLayer<
  typeof GeoJSONLayer,
  __esri.GeoJSONLayerProperties,
  GeoJSONLayer
>(GeoJSONLayer);
