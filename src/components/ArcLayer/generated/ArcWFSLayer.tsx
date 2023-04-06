
       import WFSLayer from '@arcgis/core/layers/WFSLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcWFSLayer = createLayer< typeof WFSLayer, __esri.WFSLayerProperties, WFSLayer >(WFSLayer);
    