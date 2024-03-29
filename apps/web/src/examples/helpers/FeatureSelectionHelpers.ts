export function getCSVRenderer() {
  return {
    type: 'simple',
    symbol: {
      type: 'cim',
      data: {
        type: 'CIMSymbolReference',
        symbol: {
          type: 'CIMPointSymbol',
          symbolLayers: [
            {
              type: 'CIMVectorMarker',
              enable: true,
              anchorPointUnits: 'Relative',
              dominantSizeAxis3D: 'Y',
              size: 15.75,
              billboardMode3D: 'FaceNearPlane',
              frame: {
                xmin: 0,
                ymin: 0,
                xmax: 21,
                ymax: 21,
              },
              markerGraphics: [
                {
                  type: 'CIMMarkerGraphic',
                  geometry: {
                    rings: [
                      [
                        [15, 15],
                        [12, 15],
                        [16, 10],
                        [13, 10],
                        [17, 5],
                        [11, 5],
                        [11, 2],
                        [10, 2],
                        [10, 5],
                        [4, 5],
                        [8, 10],
                        [5, 10],
                        [9, 15],
                        [6, 15],
                        [10.5, 19],
                        [15, 15],
                      ],
                    ],
                  },
                  symbol: {
                    type: 'CIMPolygonSymbol',
                    symbolLayers: [
                      {
                        type: 'CIMSolidStroke',
                        enable: true,
                        capStyle: 'Round',
                        joinStyle: 'Round',
                        lineStyle3D: 'Strip',
                        miterLimit: 10,
                        width: 0,
                        color: [0, 0, 0, 255],
                      },
                      {
                        type: 'CIMSolidFill',
                        enable: true,
                        color: [0, 160, 0, 255],
                      },
                    ],
                  },
                },
              ],
              scaleSymbolsProportionally: true,
              respectFrame: true,
            },
            {
              type: 'CIMVectorMarker',
              enable: true,
              colorLocked: true,
              anchorPointUnits: 'Relative',
              dominantSizeAxis3D: 'Y',
              size: 8,
              billboardMode3D: 'FaceNearPlane',
              frame: {
                xmin: -5,
                ymin: -5,
                xmax: 5,
                ymax: 5,
              },
              markerGraphics: [
                {
                  type: 'CIMMarkerGraphic',
                  geometry: {
                    rings: [
                      [
                        [0, 5],
                        [0.87, 4.92],
                        [1.71, 4.7],
                        [2.5, 4.33],
                        [3.21, 3.83],
                        [3.83, 3.21],
                        [4.33, 2.5],
                        [4.7, 1.71],
                        [4.92, 0.87],
                        [5, 0],
                        [4.92, -0.87],
                        [4.7, -1.71],
                        [4.33, -2.5],
                        [3.83, -3.21],
                        [3.21, -3.83],
                        [2.5, -4.33],
                        [1.71, -4.7],
                        [0.87, -4.92],
                        [0, -5],
                        [-0.87, -4.92],
                        [-1.71, -4.7],
                        [-2.5, -4.33],
                        [-3.21, -3.83],
                        [-3.83, -3.21],
                        [-4.33, -2.5],
                        [-4.7, -1.71],
                        [-4.92, -0.87],
                        [-5, 0],
                        [-4.92, 0.87],
                        [-4.7, 1.71],
                        [-4.33, 2.5],
                        [-3.83, 3.21],
                        [-3.21, 3.83],
                        [-2.5, 4.33],
                        [-1.71, 4.7],
                        [-0.87, 4.92],
                        [0, 5],
                      ],
                    ],
                  },
                  symbol: {
                    type: 'CIMPolygonSymbol',
                    symbolLayers: [
                      {
                        type: 'CIMSolidStroke',
                        enable: true,
                        capStyle: 'Round',
                        joinStyle: 'Round',
                        lineStyle3D: 'Strip',
                        miterLimit: 10,
                        width: 0.5,
                        color: [167, 169, 172, 255],
                      },
                      {
                        type: 'CIMSolidFill',
                        enable: true,
                        color: [255, 255, 255, 255],
                      },
                    ],
                  },
                },
              ],
              scaleSymbolsProportionally: true,
              respectFrame: true,
            },
          ],
          haloSize: 1,
          scaleX: 1,
          angleAlignment: 'Display',
        },
      },
    },
  } as unknown as  __esri.SimpleRenderer;
}
