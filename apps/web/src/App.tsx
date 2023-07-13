import arcgisDarkCss from '@arcgis/core/assets/esri/themes/dark/main.css?inline';
import arcgisLightCss from '@arcgis/core/assets/esri/themes/light/main.css?inline';
import {
  CalciteAction,
  CalciteActionBar,
  CalciteLoader,
  CalciteNavigation,
  CalciteNavigationLogo,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';
import { lazy, Suspense, useEffect, useState } from 'react';

import logoDark from './assets/arcgis-react-logo-dark.png';
import logoLight from './assets/arcgis-react-logo-light.png';
import GithubIcon from './assets/GithubIcon';
import { CodeDisplay, CodeDisplayAsync } from './components/CodeDisplay';
import { useTheme } from './contexts/ThemeProvider';
import { ActionItem, useCalciteActionBar } from './hooks/calciteHooks';

const Examples: ActionItem[] = [
  {
    name: 'Home',
    component: lazy(() => import('./examples/Home')),
    icon: 'home',
  },
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
  {
    name: 'Custom Zoom Component',
    component: lazy(() => import('./examples/CustomZoom')),
    code: () => import('./examples/CustomZoom?raw'),
    icon: 'magnifying-glass',
  },
  // {
  //   name: 'FeatureSelection',
  //   component: lazy(() => import('./examples/FeatureSelection')),
  //   code: () => import('./examples/FeatureSelection?raw'),
  //   icon: 'select',
  // },
];

export function App() {
  const { theme, setTheme } = useTheme();

  // Set the ArcGIS theme on the document head
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = theme === 'dark' ? arcgisDarkCss : arcgisLightCss;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [theme]);

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
    <div style={{ colorScheme: theme }}>
      <CalciteShell className={`calcite-mode-${theme}`}>
        <CalciteNavigation slot="header">
          <CalciteNavigationLogo
            slot="logo"
            heading="ArcGIS React"
            thumbnail={theme === 'light' ? logoLight : logoDark}
            style={{
              '--calcite-font-size-0': '20px',
            }}
          />
          <div slot="content-end">
            <CalciteAction
              text="View on Github"
              onClick={() =>
                window.open(
                  'https://github.com/am-maneaters/arcgis-react',
                  '_blank'
                )
              }
              scale="l"
            >
              <GithubIcon />
            </CalciteAction>
            <CalciteAction
              icon={theme === 'dark' ? 'brightness' : 'moon'}
              text="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              scale="l"
            />
          </div>
        </CalciteNavigation>

        <CalciteShellPanel slot="panel-start" collapsed>
          <CalciteActionBar slot="action-bar" expanded>
            {actions}
          </CalciteActionBar>
        </CalciteShellPanel>

        {currentAction && (
          <Suspense
            fallback={
              <div className="w-full h-full">
                <CalciteLoader label="Sample Loading" />
              </div>
            }
          >
            <div className="flex flex-col gap-4 p-4 bg-dotted min-h-full items-center box-border [&>*]:max-w-3xl [&>*]:w-full">
              <div className="flex-1 min-h-[50vh] rounded-lg overflow-hidden shadow-3xl bg-foreground-1">
                {currentAction?.component && <currentAction.component />}
              </div>
              <div className="shadow-3xl overflow-auto rounded-lg">
                {currentAction.code && (
                  <CodeDisplayAsync codePromise={currentAction?.code} />
                )}
              </div>
            </div>
          </Suspense>
        )}
      </CalciteShell>
    </div>
  );
}
