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
    // Need to wrap the UI ref in a div because the View UI will
    // use the parent element to add and remove the UI element
    <div>
      <div ref={widgetRef} {...divProps}>
        {children}
      </div>
    </div>
  );
};
