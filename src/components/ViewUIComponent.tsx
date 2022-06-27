import React, { useRef, useEffect, useContext } from "react";
import { MapContext } from "./MapViewComponent";
import "./Map.css";
interface MapWidgetProps {
  position: __esri.UIAddPosition;
  children?: React.ReactNode;
}

export function ViewUIComponent({
  position,
  children,
}: MapWidgetProps): JSX.Element {
  const widgetRef = useRef<HTMLDivElement>(null);
  const view = useContext(MapContext);

  useEffect(() => {
    const ref = widgetRef.current;
    if (!ref) return () => undefined;

    view?.ui.add(ref, position);
    return () => view?.ui.remove(ref);
  }, [position, view]);

  return (
    <div ref={widgetRef} className={"MapUIComponent"}>
      {children}
    </div>
  );
}
