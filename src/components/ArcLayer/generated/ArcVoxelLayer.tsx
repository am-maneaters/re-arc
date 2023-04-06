
       import VoxelLayer from '@arcgis/core/layers/VoxelLayer';
       import { createLayer } from '../createLayer'; 
       export const ArcVoxelLayer = createLayer< typeof VoxelLayer, __esri.VoxelLayerProperties, VoxelLayer >(VoxelLayer);
    