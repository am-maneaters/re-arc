
       import ElevationLayer from '@arcgis/core/layers/ElevationLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcElevationLayer = createLayer< typeof ElevationLayer, __esri.ElevationLayerProperties, ElevationLayer >(ElevationLayer);
    