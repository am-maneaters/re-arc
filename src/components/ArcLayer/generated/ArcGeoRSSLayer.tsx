import GeoRSSLayer from '@arcgis/core/layers/GeoRSSLayer';

import { createLayer } from '../../util/createLayer';
export const ArcGeoRSSLayer = createLayer<
  typeof GeoRSSLayer,
  __esri.GeoRSSLayerProperties,
  GeoRSSLayer
>(GeoRSSLayer);
