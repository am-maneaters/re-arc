
       import MediaLayer from '@arcgis/core/layers/MediaLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcMediaLayer = createLayer< typeof MediaLayer, __esri.MediaLayerProperties, MediaLayer >(MediaLayer);
    