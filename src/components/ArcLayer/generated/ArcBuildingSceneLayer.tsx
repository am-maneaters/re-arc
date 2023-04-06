
       import BuildingSceneLayer from '@arcgis/core/layers/BuildingSceneLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcBuildingSceneLayer = createLayer< typeof BuildingSceneLayer, __esri.BuildingSceneLayerProperties, BuildingSceneLayer >(BuildingSceneLayer);
    