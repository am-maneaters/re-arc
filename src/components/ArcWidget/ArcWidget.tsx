import { useEffect, useRef } from 'react';

import { useView } from '../ArcView/ViewContext';

export const ArcWidget = <T extends __esri.Widget>({
  widget,
}: {
  widget: T;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const view = useView();

  useEffect(() => {
    const widgetDiv = ref.current;
    if (!widgetDiv) return;

    widget.container = document.createElement('div');
    widgetDiv.append(widget.container);
    if ('view' in widget) widget.view = view;

    return () => {
      widgetDiv.replaceChildren();
    };
  }, [view, widget]);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};
