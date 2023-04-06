
       import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcImageryLayer = createLayer< typeof ImageryLayer, __esri.ImageryLayerProperties, ImageryLayer >(ImageryLayer);
    