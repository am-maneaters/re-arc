import { readdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

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
async function main() {
  const allLayerFiles = readdirSync('./node_modules/@arcgis/core/layers');

  if (!allLayerFiles || allLayerFiles.length === 0) {
    throw new Error('No layer files found, is @arcgis/core installed?');
  }

  const layerFiles = (allLayerFiles as string[])
    .filter((file) => file.endsWith('.d.ts'))
    .map((file) => file.replace('.d.ts', ''));

  const layerTypeObject = layerTypes.map((layerType) => {
    const layerTypeKey = layerType.split('-').join('').toLowerCase();

    const layerFileName = layerFiles.find((file) =>
      file.toLowerCase().startsWith(layerTypeKey)
    );

    if (!layerFileName) {
      throw new Error(`No layer file found for ${layerTypeKey}`);
    }

    return `"${layerType}" : () => import(\`@arcgis/core/layers/${layerFileName}\`).then((m) => (props: ConstructorParameters<typeof m.default>[0]) => new m.default(props))`;
  });

  const generatedLayerImports = `export const layerFactory = {${layerTypeObject.join(
    ','
  )}};`;

  writeFile('./src/generated/layerFactory.ts', generatedLayerImports);
}

await main();
