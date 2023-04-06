
       import KnowledgeGraphLayer from '@arcgis/core/layers/KnowledgeGraphLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcKnowledgeGraphLayer = createLayer< typeof KnowledgeGraphLayer, __esri.KnowledgeGraphLayerProperties, KnowledgeGraphLayer >(KnowledgeGraphLayer);
    