import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { SimpleRenderer } from '@arcgis/core/renderers';
import { SimpleFillSymbol } from '@arcgis/core/symbols';
import { ArcCSVLayer, ArcFeatureTable, ArcMapView, ArcUI } from 'arcgis-react';
import React from 'react';

import { getCSVRenderer } from './helpers/FeatureSelectionHelpers';

export default function Example() {
  const [mapView, setMapView] = React.useState<__esri.MapView>();
  const [csvLayerView, setCSVLayerView] = React.useState<__esri.CSVLayerView>();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ArcMapView
        onViewCreated={setMapView}
        map={{ basemap: { baseLayers } }}
        background={{ color: 'white' }}
        spatialReference={{ wkid: 102_003 }}
        constraints={{ snapToZoom: false, minScale: 50_465_153 }}
        extent={{
          spatialReference: {
            wkid: 102_003,
          },
          xmax: 2_275_062,
          xmin: -2_752_064,
          ymax: 1_676_207,
          ymin: -1_348_080,
        }}
        style={{ flex: 1 }}
      >
        <ArcCSVLayer
          url={CSV_URL}
          delimiter=","
          popupTemplate={{
            title: '{unit_name}',
            content:
              'Established on <b>{date_est}</b> <br/><br/> {description}',
          }}
          renderer={getCSVRenderer()}
          eventHandlers={{
            'layerview-create': (event) => {
              setCSVLayerView(event.layerView as __esri.CSVLayerView);
            },
          }}
        />

        <ArcUI position="top-left">
          <div
            id="select-by-rectangle"
            className="esri-widget esri-widget--button esri-widget esri-interactive"
            title="Select features by rectangle"
          >
            <span className="esri-icon-checkbox-unchecked" />
          </div>
        </ArcUI>
      </ArcMapView>
      {csvLayerView && mapView && (
        <ArcFeatureTable
          view={mapView}
          style={{ width: '100%', height: '250px', marginBottom: 4 }}
          layer={csvLayerView.layer as __esri.CSVLayer}
          highlightEnabled={false}
          tableTemplate={{
            columnTemplates: [
              {
                fieldName: 'unit_name',
                type: 'field',
                label: 'Name',
              },
              {
                fieldName: 'state',
                type: 'field',
                label: 'State',
              },
              {
                fieldName: 'region',
                type: 'field',
                label: 'Region',
              },
            ],
          }}
        />
      )}
    </div>
  );
}

const CSV_URL =
  'https://ubatsukh.github.io/arcgis-js-api-demos/devsummit2021/csvLayer-nps/data/nps_establishments.csv';

const baseLayers = [
  new FeatureLayer({
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2',
    renderer: new SimpleRenderer({
      symbol: new SimpleFillSymbol({
        color: '#f0ebe4',
        outline: {
          color: '#DCDCDC',
          width: '0.5px',
        },
      }),
    }),
    spatialReference: {
      wkid: 102_003,
    },
    effect: 'drop-shadow(-10px, 10px, 6px gray)',
  }),
];
