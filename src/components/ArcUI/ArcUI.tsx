import './ArcUI.css';

import React, { useEffect, useRef } from 'react';

import { useView } from '../ArcView/ViewContext';

type ArcUIProps = {
  position: __esri.UIAddPosition['position'];
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const ArcUI: React.FC<ArcUIProps> = ({
  position,
  children,
  ...divProps
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const view = useView();

  useEffect(() => {
    const ref = widgetRef.current;
    if (!ref || !view) return () => undefined;

    const viewUi = view.ui;
    viewUi.add(ref, position);
    return () => {
      if (!view.destroyed) viewUi.remove(ref);
    };
  }, [position, view]);

  return (
    // We need to wrap the ref in an empty div because when this component
    // is rendered, the div with the ref on it is placed in a different spot
    // in the DOM by the View UI. This is basically the same as trying to
    // render a fragment.
    <div>
      <div ref={widgetRef} className="MapUIComponent" {...divProps}>
        {children}
      </div>
    </div>
  );
};
