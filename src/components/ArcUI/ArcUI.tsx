import React from 'react';

import { useArcUI } from '../../hooks/useArcUI';

type ArcUIProps = {
  position: __esri.UIAddPosition['position'];
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const ArcUI: React.FC<ArcUIProps> = ({
  position,
  children,
  ...divProps
}) => {
  const widgetRef = useArcUI(position);

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
