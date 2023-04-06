
       import RouteLayer from '@arcgis/core/layers/RouteLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcRouteLayer = createLayer< typeof RouteLayer, __esri.RouteLayerProperties, RouteLayer >(RouteLayer);
    