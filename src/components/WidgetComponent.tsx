import React, { useRef, useEffect, useState } from 'react';

export const WidgetComponent = <T extends __esri.Widget>({
  widgetInit,
}: {
  widgetInit: () => T;
}) => {
  const [widget, setWidget] = useState<T | null>();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widgetDiv = ref.current;
    if (!widgetDiv) return;

    const newWidget = widgetInit();
    newWidget.container = document.createElement('div');
    widgetDiv.append(newWidget.container);
    setWidget(newWidget);

    return () => {
      newWidget.destroy();
    };
  }, [widgetInit]);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};
