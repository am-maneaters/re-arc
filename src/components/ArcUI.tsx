import React, { useRef, useEffect, useContext } from 'react';
import { MapContext } from './MapViewComponent';
import './Map.css';

export type ArcUIProps = {
  position: __esri.UIAddPosition['position'];
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const ArcUI: React.FC<ArcUIProps> = ({
  position,
  children,
  ...divProps
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const view = useContext(MapContext);

  useEffect(() => {
    const ref = widgetRef.current;
    if (!ref) return () => undefined;

    view?.ui.add(ref, position);
    return () => view?.ui.remove(ref);
  }, [position, view]);

  return (
    <div ref={widgetRef} className="MapUIComponent" {...divProps}>
      {children}
    </div>
  );
};
