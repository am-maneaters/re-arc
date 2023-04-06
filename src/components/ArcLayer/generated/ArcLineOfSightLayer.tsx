
       import LineOfSightLayer from '@arcgis/core/layers/LineOfSightLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcLineOfSightLayer = createLayer< typeof LineOfSightLayer, __esri.LineOfSightLayerProperties, LineOfSightLayer >(LineOfSightLayer);
    