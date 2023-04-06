
       import UnknownLayer from '@arcgis/core/layers/UnknownLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcUnknownLayer = createLayer< typeof UnknownLayer, __esri.UnknownLayerProperties, UnknownLayer >(UnknownLayer);
    