import {
  CalciteLoader,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';
import * as React from 'react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';

import { ActionItem, useCalciteActionBar } from './hooks/calciteHooks';

SyntaxHighlighter.registerLanguage('typescript', ts);

const Examples: ActionItem[] = [
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
    name: 'Simple',
    component: lazy(() => import('./examples/Simple')),
    code: () => import('./examples/Simple?raw'),
    icon: 'map',
  },
  {
    name: 'FeatureSelection',
    component: lazy(() => import('./examples/FeatureSelection')),
    code: () => import('./examples/FeatureSelection?raw'),
    icon: 'select',
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
            <div style={{ padding: 16 }}>
              <h1>{currentAction?.name}</h1>
              <div style={{ height: 800 }}>
                {currentAction?.component && <currentAction.component />}
              </div>
              <CodeDisplay codePromise={currentAction?.code} />
            </div>
          </Suspense>
        )}
      </CalciteShell>
    </div>
  );
}

function CodeDisplay({
  codePromise,
}: {
  codePromise: () => Promise<typeof import('*?raw')>;
}) {
  const [code, setCode] = useState('');

  useEffect(() => {
    codePromise().then((code) => setCode(code.default));
  }, [codePromise]);

  return (
    <div>
      <h2>Code</h2>
      <SyntaxHighlighter
        style={{ ...docco }}
        codeTagProps={{ style: { fontFamily: 'Fira Code, monospace' } }}
        language="typescript"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
