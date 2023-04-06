
       import SceneLayer from '@arcgis/core/layers/SceneLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcSceneLayer = createLayer< typeof SceneLayer, __esri.SceneLayerProperties, SceneLayer >(SceneLayer);
    