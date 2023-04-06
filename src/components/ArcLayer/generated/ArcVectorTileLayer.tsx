
       import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcVectorTileLayer = createLayer< typeof VectorTileLayer, __esri.VectorTileLayerProperties, VectorTileLayer >(VectorTileLayer);
    