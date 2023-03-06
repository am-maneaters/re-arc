import {
  CalciteAction,
  CalciteActionBar,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';
import { useState } from 'react';
import { ReactiveUtils } from '../examples/ReactiveUtils';
import DaylightWidget from '../examples/DaylightWidget';

enum Examples {
  ReactiveUtils = 'ReactiveUtils',
  Daylight = 'Daylight Widget',
}

export function App() {
  const [selectedExample, setSelectedExample] = useState('ReactiveUtils');

  const action = (
    e: React.MouseEvent<HTMLCalciteActionElement, MouseEvent>
  ) => {
    const action = e.target.text;

    setSelectedExample(action);
  };

  return (
    <div>
      <CalciteShell className="calcite-mode-dark">
        <CalciteShellPanel slot="panel-start" collapsed>
          <CalciteActionBar slot="action-bar" expanded expandDisabled>
            <CalciteAction
              text="ReactiveUtils"
              icon="refresh"
              onClick={action}
              active={selectedExample === 'ReactiveUtils' ? true : undefined}
            />
            <CalciteAction
              text="Daylight Widget"
              icon="brightness"
              onClick={action}
              active={selectedExample === 'Daylight Widget' ? true : undefined}
            />

            <CalciteAction text="Example 3" icon="refresh" onClick={action} />
          </CalciteActionBar>
        </CalciteShellPanel>

        {selectedExample === 'ReactiveUtils' && <ReactiveUtils />}
        {selectedExample === 'Daylight Widget' && <DaylightWidget />}
      </CalciteShell>
    </div>
  );
}
