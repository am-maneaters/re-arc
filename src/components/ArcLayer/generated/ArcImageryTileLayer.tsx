
       import ImageryTileLayer from '@arcgis/core/layers/ImageryTileLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcImageryTileLayer = createLayer< typeof ImageryTileLayer, __esri.ImageryTileLayerProperties, ImageryTileLayer >(ImageryTileLayer);
    