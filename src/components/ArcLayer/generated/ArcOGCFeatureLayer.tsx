
       import OGCFeatureLayer from '@arcgis/core/layers/OGCFeatureLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcOGCFeatureLayer = createLayer< typeof OGCFeatureLayer, __esri.OGCFeatureLayerProperties, OGCFeatureLayer >(OGCFeatureLayer);
    