import { UniqueValueRenderer } from '@arcgis/core/renderers';
import { SimpleFillSymbol } from '@arcgis/core/symbols';
import { ArcMapView, ArcStreamLayer } from 'arcgis-react';
import { useEffect, useState } from 'react';

export default function Example() {
  const [layer, setLayer] = useState<__esri.StreamLayer>();

  useEffect(() => {
    if (!layer) {
      return;
    }
    const status = ['blocked', 'unknown', 'open'];

    let objectIdCounter = 0;
    const t = setInterval(() => {
      layer.sendMessageToClient({
        type: 'features',
        features: [
          {
            attributes: {
              TRACKID: 1,
              OBJECTID: objectIdCounter++,
              STATUS: status[Math.floor(Math.random() * status.length)],
            },
            geometry: {
              rings: [
                [
                  [-13_180_792.011_510_11, 4_037_145.930_395_948_7],
                  [-13_180_509.058_277_348, 4_037_145.930_395_948_7],
                  [-13_180_509.058_277_348, 4_036_824.292_114_444_5],
                  [-13_180_792.011_510_11, 4_036_824.292_114_444_5],
                  [-13_180_792.011_510_11, 4_037_145.930_395_948_7],
                ],
              ],
            },
          },
          {
            attributes: {
              TRACKID: 2,
              OBJECTID: objectIdCounter++,
              STATUS: status[Math.floor(Math.random() * status.length)],
            },
            geometry: {
              rings: [
                [
                  [-13_180_458.980_453_761, 4_036_356.273_937_947_6],
                  [-13_180_207.564_959_718, 4_036_356.273_937_947_6],
                  [-13_180_207.564_959_718, 4_036_190.056_991_914],
                  [-13_180_458.980_453_761, 4_036_190.056_991_914],
                  [-13_180_458.980_453_761, 4_036_356.273_937_947_6],
                ],
              ],
            },
          },
          {
            attributes: {
              TRACKID: 3,
              OBJECTID: objectIdCounter++,
              STATUS: status[Math.floor(Math.random() * status.length)],
            },
            geometry: {
              rings: [
                [
                  [-13_179_890.918_598_393, 4_036_915.303_683_526],
                  [-13_179_661.411_569_001, 4_036_915.303_683_526],
                  [-13_179_661.411_569_001, 4_036_673.041_598_266],
                  [-13_179_890.918_598_393, 4_036_673.041_598_266],
                  [-13_179_890.918_598_393, 4_036_915.303_683_526],
                ],
              ],
            },
          },
        ],
      });
    }, 2000);

    // clear interval on unmount
    return () => clearInterval(t);
  }, [layer]);

  return (
    <ArcMapView
      style={{ height: '100%' }}
      map={{ basemap: 'gray-vector' }}
      zoom={15}
      center={[-118.4, 34.0573]}
    >
      <ArcStreamLayer
        onLayerCreated={setLayer}
        // field schemas in the fields array should match the
        // feature attributes that will stream to the layer.
        // set the objectIdField and trackIdField in the fields
        fields={[
          { name: 'OBJECTID', alias: 'OBJECTID', type: 'oid' },
          { name: 'TRACKID', alias: 'TrackId', type: 'long' },
          { name: 'STATUS', alias: 'STATUS', type: 'string' },
        ]}
        // trackIdField is required and the field schema must exist
        // in the fields array
        timeInfo={{ trackIdField: 'TRACKID' }}
        updateInterval={100}
        geometryType="polygon"
        spatialReference={{ wkid: 102_100 }}
        popupTemplate={{
          title: 'Status: {STATUS}',
          content: 'trackId: {TRACKID}, objectId: {OBJECTID}',
        }}
        labelingInfo={[
          {
            symbol: { type: 'text', color: 'black' },
            labelPlacement: 'always-horizontal',
            labelExpressionInfo: { expression: '$feature.STATUS' },
          },
        ]}
        // set unique value renderer based on the status field
        renderer={
          new UniqueValueRenderer({
            field: 'STATUS',
            uniqueValueInfos: [
              {
                value: 'blocked',
                symbol: new SimpleFillSymbol({
                  color: [233, 116, 81, 0.5],
                  outline: { width: 1, color: 'white' },
                }),
              },
              {
                value: 'open',
                symbol: new SimpleFillSymbol({
                  color: [34, 139, 34, 0.5],
                  outline: { width: 1, color: 'white' },
                }),
              },
              {
                value: 'unknown',
                symbol: new SimpleFillSymbol({
                  color: [255, 191, 0, 0.5],
                  outline: { width: 1, color: 'white' },
                }),
              },
            ],
          })
        }
      />
    </ArcMapView>
  );
}
