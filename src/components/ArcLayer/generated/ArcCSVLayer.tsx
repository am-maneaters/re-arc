
       import CSVLayer from '@arcgis/core/layers/CSVLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcCSVLayer = createLayer< typeof CSVLayer, __esri.CSVLayerProperties, CSVLayer >(CSVLayer);
    