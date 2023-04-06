import {
  CalciteLoader,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';
import { lazy, Suspense, useEffect } from 'react';

import { useCalciteActionBar } from './hooks/calciteHooks';

const Examples = [
  {
    name: 'ReactiveUtils',
    component: lazy(() => import('./examples/ReactiveUtils')),
    icon: 'refresh',
  },
  {
    name: 'Daylight Widget',
    component: lazy(() => import('./examples/DaylightWidget')),
    icon: 'brightness',
  },
  {
    name: 'Intro to Layers',
    component: lazy(() => import('./examples/IntroToLayers')),
    icon: 'layers',
  },
  {
    name: 'Sketch Widget',
    component: lazy(() => import('./examples/SketchWidget')),
    icon: 'pencil',
  },
  {
    name: 'Client-Side Stream Layer',
    component: lazy(() => import('./examples/ClientSideStreamLayer')),
    icon: 'layer-graphics',
  },
  {
    name: 'Basemap Picker',
    component: lazy(() => import('./examples/BasemapPicker')),
    icon: 'basemap',
  },
  {
    name: 'MultiView',
    component: lazy(() => import('./examples/MultiView')),
    icon: '3d-glasses',
  },
  {
    name: 'Simple',
    component: lazy(() => import('./examples/Simple')),
    icon: 'map',
  },
];

export function App() {
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
      <CalciteShell className="calcite-mode-dark">
        <CalciteShellPanel slot="panel-start" collapsed>
          {actions}
        </CalciteShellPanel>

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
          {currentAction?.component && <currentAction.component />}
        </Suspense>
      </CalciteShell>
    </div>
  );
}
