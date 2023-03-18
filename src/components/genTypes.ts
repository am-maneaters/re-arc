import { writeFile } from 'node:fs/promises';

console.log('Hi');
const layerTypes = [
  'base-dynamic',
  'base-elevation',
  'base-tile',
  'bing-maps',
  'building-scene',
  'csv',
  'dimension',
  'elevation',
  'feature',
  'geojson',
  'geo-rss',
  'graphics',
  'group',
  'imagery',
  'imagery-tile',
  'integrated-mesh',
  'kml',
  'line-of-sight',
  'map-image',
  'map-notes',
  'media',
  'ogc-feature',
  'open-street-map',
  'point-cloud',
  'route',
  'scene',
  'georeferenced-image',
  'stream',
  'tile',
  'unknown',
  'unsupported',
  'vector-tile',
  'wcs',
  'web-tile',
  'wfs',
  'wms',
  'wmts',
  'voxel',
  'subtype-group',
  'knowledge-graph',
];

function generateLayerTypeObject(layerTypes: string[]): string {
  const layerTypeObject = layerTypes.reduce((obj, layerType) => {
    const layerTypeKey = layerType
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    obj += `"${layerType}" : () => import(\`@arcgis/core/layers/${layerTypeKey}Layer\`).then((m) => (props: ConstructorParameters<typeof m.default>[0]) => new m.default(props)),`;
    return obj;
  }, '');

  return `export const layerFactory = {${layerTypeObject}};`;
}

const layerTypeObject = generateLayerTypeObject(layerTypes);
console.log(layerTypeObject);
writeFile('./src/components/layerFactory.ts', layerTypeObject);
