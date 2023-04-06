
       import BaseElevationLayer from '@arcgis/core/layers/BaseElevationLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcBaseElevationLayer = createLayer< typeof BaseElevationLayer, __esri.BaseElevationLayerProperties, BaseElevationLayer >(BaseElevationLayer);
    