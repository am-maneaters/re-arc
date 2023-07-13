import arcgisDarkCss from '@arcgis/core/assets/esri/themes/dark/main.css?inline';
import arcgisLightCss from '@arcgis/core/assets/esri/themes/light/main.css?inline';
import {
  CalciteAction,
  CalciteLoader,
  CalciteNavigation,
  CalciteNavigationLogo,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';
import { lazy, Suspense, useEffect, useState } from 'react';

import logoDark from './assets/arcgis-react-logo-dark.png';
import logoLight from './assets/arcgis-react-logo-light.png';
import { CodeDisplay } from './components/CodeDisplay';
import { ActionItem, useCalciteActionBar } from './hooks/calciteHooks';

const Examples: ActionItem[] = [
  {
    name: 'Map View',
    component: lazy(() => import('./examples/MapView')),
    code: () => import('./examples/MapView?raw'),
    icon: 'map',
  },
  {
    name: 'Scene View',
    component: lazy(() => import('./examples/SceneView')),
    code: () => import('./examples/SceneView?raw'),
    icon: 'globe',
  },
  {
    name: 'ReactiveUtils',
    component: lazy(() => import('./examples/ReactiveUtils')),
    code: () => import('./examples/ReactiveUtils?raw'),
    icon: 'refresh',
  },
  {
    name: 'Daylight Widget',
    component: lazy(() => import('./examples/DaylightWidget')),
    code: () => import('./examples/DaylightWidget?raw'),
    icon: 'brightness',
  },
  {
    name: 'Intro to Layers',
    component: lazy(() => import('./examples/IntroToLayers')),
    code: () => import('./examples/IntroToLayers?raw'),
    icon: 'layers',
  },
  {
    name: 'Sketch Widget',
    component: lazy(() => import('./examples/SketchWidget')),
    code: () => import('./examples/SketchWidget?raw'),
    icon: 'pencil',
  },
  {
    name: 'Client-Side Stream Layer',
    component: lazy(() => import('./examples/ClientSideStreamLayer')),
    code: () => import('./examples/ClientSideStreamLayer?raw'),
    icon: 'layer-graphics',
  },
  {
    name: 'Basemap Picker',
    component: lazy(() => import('./examples/BasemapPicker')),
    code: () => import('./examples/BasemapPicker?raw'),
    icon: 'basemap',
  },
  {
    name: 'MultiView',
    component: lazy(() => import('./examples/MultiView')),
    code: () => import('./examples/MultiView?raw'),
    icon: '3d-glasses',
  },
  // {
  //   name: 'FeatureSelection',
  //   component: lazy(() => import('./examples/FeatureSelection')),
  //   code: () => import('./examples/FeatureSelection?raw'),
  //   icon: 'select',
  // },
];

export function App() {
  const [appTheme, setAppTheme] = useState<'light' | 'dark'>('dark');

  // Set the ArcGIS theme on the document head
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = appTheme === 'dark' ? arcgisDarkCss : arcgisLightCss;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [appTheme]);

  const { currentAction, actions } = useCalciteActionBar(
    Examples,
    window.location.hash
      ? decodeURI(window.location.hash.slice(1))
      : Examples[0].name
  );

  useEffect(() => {
    if (currentAction) window.location.hash = currentAction?.name;
  }, [currentAction]);

  return (
    <div>
      <CalciteShell className={`calcite-mode-${appTheme}`}>
        <CalciteNavigation slot="header">
          <CalciteNavigationLogo
            slot="logo"
            heading="ArcGIS React"
            thumbnail={appTheme === 'light' ? logoLight : logoDark}
            style={{
              '--calcite-font-size-0': '20px',
            }}
          />
          <div slot="content-end">
            <CalciteAction
              icon={appTheme === 'dark' ? 'brightness' : 'moon'}
              text="Toggle theme"
              onClick={() =>
                setAppTheme(appTheme === 'dark' ? 'light' : 'dark')
              }
            />
          </div>
        </CalciteNavigation>

        <CalciteShellPanel slot="panel-start" collapsed>
          {actions}
        </CalciteShellPanel>

        {currentAction && (
          <Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <CalciteLoader label="Sample Loading" />
              </div>
            }
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                padding: 16,
                backgroundSize: '16px 16px',
                backgroundColor: 'var(--calcite-ui-background)',
                backgroundImage:
                  'radial-gradient( circle, var(--calcite-ui-border-3) 1px, transparent 1px )',
              }}
            >
              <div
                style={{
                  height: 800,
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow:
                    '0 4px 16px 0 rgba(0, 0, 0, 0.18), 0 2px 8px 0 rgba(0, 0, 0, 0.34)',
                }}
              >
                {currentAction?.component && <currentAction.component />}
              </div>
              <CodeDisplay
                codePromise={currentAction?.code}
                appTheme={appTheme}
              />
            </div>
          </Suspense>
        )}
      </CalciteShell>
    </div>
  );
}
