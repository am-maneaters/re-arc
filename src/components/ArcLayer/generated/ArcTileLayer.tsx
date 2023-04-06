
       import TileLayer from '@arcgis/core/layers/TileLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcTileLayer = createLayer< typeof TileLayer, __esri.TileLayerProperties, TileLayer >(TileLayer);
    