import {
  CalciteLoader,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';
import { useCalciteActionBar } from '../hooks/calciteHooks';
import { Suspense, useEffect } from 'react';
import React from 'react';

const Examples = [
  {
    name: 'ReactiveUtils',
    component: React.lazy(() => import('../examples/ReactiveUtils')),
    icon: 'refresh',
  },
  {
    name: 'Daylight Widget',
    component: React.lazy(() => import('../examples/DaylightWidget')),
    icon: 'brightness',
  },
  {
    name: 'Intro to Layers',
    component: React.lazy(() => import('../examples/IntroToLayers')),
    icon: 'layers',
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
