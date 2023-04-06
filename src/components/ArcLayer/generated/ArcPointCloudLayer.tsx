
       import PointCloudLayer from '@arcgis/core/layers/PointCloudLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcPointCloudLayer = createLayer< typeof PointCloudLayer, __esri.PointCloudLayerProperties, PointCloudLayer >(PointCloudLayer);
    