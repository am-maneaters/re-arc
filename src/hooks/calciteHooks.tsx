import {
  CalciteAction,
  CalciteActionBar,
} from '@esri/calcite-components-react';
import { useMemo, useState } from 'react';

type ActionItem = {
  name: string;
  icon: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

export function useCalciteActionBar(
  items: ActionItem[],
  defaultValue: ActionItem['name']
): {
  currentAction: ActionItem | undefined;
  actions: JSX.Element;
} {
  const [currentActionName, setCurrentActionName] = useState(defaultValue);

  const currentAction = useMemo(
    () => items.find((example) => example.name === currentActionName),
    [currentActionName, items]
  );

  const action: React.MouseEventHandler<HTMLCalciteActionElement> = (e) => {
    const action = e.currentTarget.text;

    setCurrentActionName(action);
  };

  const actions = useMemo(
    () => (
      <CalciteActionBar slot="action-bar" expanded expandDisabled>
        {items.map((item) => (
          <CalciteAction
            key={item.name}
            text={item.name}
            icon={item.icon}
            onClick={action}
            active={currentActionName === item.name ? true : undefined}
          />
        ))}
      </CalciteActionBar>
    ),
    [currentActionName, items]
  );

  return {
    currentAction,
    actions,
  };
}
