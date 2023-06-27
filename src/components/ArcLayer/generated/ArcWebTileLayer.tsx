import WebTileLayer from '@arcgis/core/layers/WebTileLayer';

import { createLayer } from '../../util/createLayer';
export const ArcWebTileLayer = createLayer<
  typeof WebTileLayer,
  __esri.WebTileLayerProperties,
  WebTileLayer
>(WebTileLayer);
