import React, { useRef, useEffect } from 'react';

export const ArcWidget = <T extends __esri.Widget>({
  widget,
}: {
  widget: T;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widgetDiv = ref.current;
    if (!widgetDiv) return;

    widget.container = document.createElement('div');
    widgetDiv.append(widget.container);

    return () => {
      widgetDiv.replaceChildren();
    };
  }, [widget]);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};
