import MapViewComponent from '../components/MapViewComponent';
import { ViewUIComponent } from '../components/ViewUIComponent';

import LayerList from '@arcgis/core/widgets/LayerList';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import esriId from '@arcgis/core/identity/IdentityManager';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Graphic from '@arcgis/core/Graphic';

import Polyline from '@arcgis/core/geometry/Polyline';

import {
  CalciteButton,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';
import { useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { WidgetComponent } from '../components/WidgetComponent';
import { useOnEvent } from '../hooks/useOnEvent';
import { isGraphicsHit } from '../utils/esriUtils';
import { useFeatureLayer, useGraphicsLayer } from '../hooks/useGraphicsLayer';

const info = new OAuthInfo({
  // Swap this ID out with registered application ID
  appId: import.meta.env.VITE_ARCGIS_APP_ID as string,
  // Uncomment the next line and update if using your own portal
  // portalUrl: "https://<host>:<port>/arcgis"
  // Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
  // authNamespace: "portal_oauth_inline",
  flowType: 'auto', // default that uses two-step flow
  popup: false,
});

esriId.registerOAuthInfos([info]);

const nhlTeamsLayerUrl =
  'https://services1.arcgis.com/wQnFk5ouCfPzTlPw/arcgis/rest/services/NHL_Teams/FeatureServer/0';
const nhlPlayersLayerUrl =
  'https://services1.arcgis.com/wQnFk5ouCfPzTlPw/arcgis/rest/services/nhl_players_20222023_flat_geocoded/FeatureServer/0';

// create signal controller
const controller = new AbortController();

export function NhlPlayersDemo() {
  const [mapView, setMapView] = useState<MapView>();

  const [currentTeam, setCurrentTeam] = useState<string>();

  const [credentials, setCredentials] = useState<__esri.Credential>();

  const nhlPlayersLayer = useFeatureLayer(mapView, {
    url: nhlPlayersLayerUrl,
    title: 'NHL Players',
    outFields: ['*'],
  });

  const nhlTeamLayer = useFeatureLayer(mapView, {
    url: nhlTeamsLayerUrl,
    title: 'NHL Teams',
    outFields: ['*'],
  });

  const graphicsLayer = useGraphicsLayer(mapView, {
    title: 'Graphics Layer',
  });

  useEffect(() => {
    graphicsLayer.removeAll();
    if (!currentTeam) return;

    const getTeamPlayers = async () => {
      const relatedPlayers = await nhlPlayersLayer.queryFeatures(
        {
          where: `teamName = '${currentTeam}'`,
          outFields: ['*'],
          returnGeometry: true,
        },
        { signal: controller.signal }
      );

      const nhlTeam = await nhlTeamLayer.queryFeatures({
        where: `name = '${currentTeam}'`,
        outFields: ['*'],
        returnGeometry: true,
      });

      if (nhlTeam.features.length === 0) throw new Error('No team found');

      const lines = relatedPlayers.features.map((feature) => {
        const point = feature.geometry as __esri.Point;
        const teamPoint = nhlTeam.features[0].geometry as __esri.Point;
        console.log(teamPoint);
        const line = new Polyline({
          paths: [
            [
              [point.x, point.y],
              [teamPoint.x, teamPoint.y],
            ],
          ],
          spatialReference: mapView?.spatialReference,
        });

        return new Graphic({
          geometry: line,
          symbol: new SimpleLineSymbol({}),
        });
      });

      graphicsLayer.addMany(lines);
    };
    getTeamPlayers();
  }, [
    currentTeam,
    graphicsLayer,
    mapView?.spatialReference,
    nhlPlayersLayer,
    nhlTeamLayer,
  ]);

  useOnEvent(mapView, 'pointer-move', async (e) => {
    const mapHit = await mapView?.hitTest(e, {
      exclude: [nhlPlayersLayer],
      include: [nhlTeamLayer],
    });
    if (!mapHit) return;

    if (mapHit.results.length === 0) return setCurrentTeam(undefined);

    const [firstHit, ...others] = mapHit.results;

    if (isGraphicsHit(firstHit)) {
      const { graphic, mapPoint } = firstHit;
      // console.log('mapPoint', mapPoint.toJSON());

      const { attributes } = graphic;
      setCurrentTeam(attributes?.name);
    }
  });

  useEffect(() => {
    esriId.checkSignInStatus(info.portalUrl + '/sharing').then((credential) => {
      setCredentials(credential);
    });
  }, []);

  return (
    <div>
      <CalciteShell className="calcite-theme-dark">
        <MapViewComponent
          mapProps={{
            basemap: 'dark-gray-vector',
          }}
          mapViewProps={{}}
          onMapViewLoad={(loadedView) => {
            setMapView(loadedView);
          }}
          style={{ height: '100vh' }}
        >
          <ViewUIComponent position="top-left" style={{ background: 'white' }}>
            {currentTeam}
          </ViewUIComponent>
          <ViewUIComponent position="top-right">
            <WidgetComponent
              widgetInit={() => new LayerList({ view: mapView })}
            />
          </ViewUIComponent>
          <ViewUIComponent position="bottom-right">
            Hello, world
          </ViewUIComponent>
        </MapViewComponent>
        <CalciteShellPanel slot="contextual-panel">
          <CalcitePanel heading="ReactiveUtils Watch Events">
            {credentials ? (
              <CalciteButton
                onClick={(e) => {
                  esriId.destroyCredentials();
                  window.location.reload();
                }}
              >
                Log Out
              </CalciteButton>
            ) : (
              <CalciteButton
                onClick={(e) => {
                  esriId.getCredential(info.portalUrl + '/sharing');
                }}
              >
                Log in
              </CalciteButton>
            )}
          </CalcitePanel>
        </CalciteShellPanel>
      </CalciteShell>
    </div>
  );
}
