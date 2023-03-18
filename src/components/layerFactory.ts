export const layerFactory = {
  'base-dynamic': () =>
    import(`@arcgis/core/layers/BaseDynamicLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'base-elevation': () =>
    import(`@arcgis/core/layers/BaseElevationLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'base-tile': () =>
    import(`@arcgis/core/layers/BaseTileLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'bing-maps': () =>
    import(`@arcgis/core/layers/BingMapsLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'building-scene': () =>
    import(`@arcgis/core/layers/BuildingSceneLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  csv: () =>
    import(`@arcgis/core/layers/CsvLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  dimension: () =>
    import(`@arcgis/core/layers/DimensionLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  elevation: () =>
    import(`@arcgis/core/layers/ElevationLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  feature: () =>
    import(`@arcgis/core/layers/FeatureLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  geojson: () =>
    import(`@arcgis/core/layers/GeojsonLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'geo-rss': () =>
    import(`@arcgis/core/layers/GeoRssLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  graphics: () =>
    import(`@arcgis/core/layers/GraphicsLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  group: () =>
    import(`@arcgis/core/layers/GroupLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  imagery: () =>
    import(`@arcgis/core/layers/ImageryLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'imagery-tile': () =>
    import(`@arcgis/core/layers/ImageryTileLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'integrated-mesh': () =>
    import(`@arcgis/core/layers/IntegratedMeshLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  kml: () =>
    import(`@arcgis/core/layers/KmlLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'line-of-sight': () =>
    import(`@arcgis/core/layers/LineOfSightLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'map-image': () =>
    import(`@arcgis/core/layers/MapImageLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'map-notes': () =>
    import(`@arcgis/core/layers/MapNotesLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  media: () =>
    import(`@arcgis/core/layers/MediaLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'ogc-feature': () =>
    import(`@arcgis/core/layers/OgcFeatureLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'open-street-map': () =>
    import(`@arcgis/core/layers/OpenStreetMapLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'point-cloud': () =>
    import(`@arcgis/core/layers/PointCloudLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  route: () =>
    import(`@arcgis/core/layers/RouteLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  scene: () =>
    import(`@arcgis/core/layers/SceneLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),

  stream: () =>
    import(`@arcgis/core/layers/StreamLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  tile: () =>
    import(`@arcgis/core/layers/TileLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  unknown: () =>
    import(`@arcgis/core/layers/UnknownLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  unsupported: () =>
    import(`@arcgis/core/layers/UnsupportedLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'vector-tile': () =>
    import(`@arcgis/core/layers/VectorTileLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  wcs: () =>
    import(`@arcgis/core/layers/WcsLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'web-tile': () =>
    import(`@arcgis/core/layers/WebTileLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  wfs: () =>
    import(`@arcgis/core/layers/WfsLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  wms: () =>
    import(`@arcgis/core/layers/WmsLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  wmts: () =>
    import(`@arcgis/core/layers/WmtsLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  voxel: () =>
    import(`@arcgis/core/layers/VoxelLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'subtype-group': () =>
    import(`@arcgis/core/layers/SubtypeGroupLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
  'knowledge-graph': () =>
    import(`@arcgis/core/layers/KnowledgeGraphLayer`).then(
      (m) => (props: ConstructorParameters<typeof m.default>[0]) =>
        new m.default(props)
    ),
};
