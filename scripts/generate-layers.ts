import { writeFile } from 'node:fs/promises';

const esriLayers = [
  'BaseDynamicLayer',
  'BaseElevationLayer',
  'BaseTileLayer',
  'BingMapsLayer',
  'BuildingSceneLayer',
  'CSVLayer',
  'DimensionLayer',
  'ElevationLayer',
  'FeatureLayer',
  'GeoJSONLayer',
  'GeoRSSLayer',
  'GraphicsLayer',
  'GroupLayer',
  'ImageryLayer',
  'ImageryTileLayer',
  'IntegratedMeshLayer',
  'KMLLayer',
  'KnowledgeGraphLayer',
  'Layer',
  'LineOfSightLayer',
  'MapImageLayer',
  'MapNotesLayer',
  'MediaLayer',
  'OGCFeatureLayer',
  'OpenStreetMapLayer',
  'PointCloudLayer',
  'RouteLayer',
  'SceneLayer',
  'StreamLayer',
  'SubtypeGroupLayer',
  'TileLayer',
  'UnknownLayer',
  'UnsupportedLayer',
  'VectorTileLayer',
  'VoxelLayer',
  'WCSLayer',
  'WebTileLayer',
  'WFSLayer',
  'WMSLayer',
  'WMTSLayer',
];
const esriWidgets = [
  'AreaMeasurement2D',
  'AreaMeasurement3D',
  'Attachments',
  'Attribution',
  'BasemapGallery',
  'BasemapLayerList',
  'BasemapToggle',
  'Bookmarks',
  'BuildingExplorer',
  'Compass',
  'CoordinateConversion',
  'Daylight',
  'Directions',
  'DirectLineMeasurement3D',
  'DistanceMeasurement2D',
  'Editor',
  'ElevationProfile',
  'Expand',
  'Feature',
  'FeatureForm',
  'FeatureTable',
  'FeatureTemplates',
  'FloorFilter',
  'Fullscreen',
  'Histogram',
  'HistogramRangeSlider',
  'Home',
  'LayerList',
  'Legend',
  'LineOfSight',
  'Locate',
  'Measurement',
  'NavigationToggle',
  'Popup',
  'Print',
  'ScaleBar',
  'ScaleRangeSlider',
  'Search',
  'ShadowCast',
  'Sketch',
  'Slice',
  'Slider',
  'Swipe',
  'TableList',
  'TimeSlider',
  'Track',
  'UtilityNetworkAssociations',
  'UtilityNetworkTrace',
  'Weather',
  'Widget',
  'Zoom',
];

function generateFiles(
  path: string,
  createFunction: string,
  output: string,
  items: string[]
) {
  for (const layerName of items) {
    const generatedLayerImports = `
       import ${layerName} from '${path}/${layerName}';
       import { ${createFunction} } from '../../util/${createFunction}'; 
       export const Arc${layerName} = ${createFunction}< typeof ${layerName}, __esri.${layerName}Properties, ${layerName} >(${layerName});
    `;

    writeFile(
      `./src/components/${output}/generated/Arc${layerName}.tsx`,
      generatedLayerImports
    );
  }
}

generateFiles('@arcgis/core/layers', 'createLayer', 'ArcLayer', esriLayers);

generateFiles('@arcgis/core/widgets', 'createWidget', 'ArcWidget', esriWidgets);
