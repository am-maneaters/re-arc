import React, { useEffect, useRef, useState } from 'react';

export function useWidget<Widget extends __esri.Widget>(
  widgetInit: () => Widget,
  dependencies: any[] = []
): Widget {
  const [widget, setWidget] = useState<Widget>(widgetInit());

  useEffect(() => {
    const newWidget = widgetInit();
    newWidget.container = document.createElement('div');
    setWidget(newWidget);

    return () => {
      newWidget.destroy();
    };
  }, [widgetInit, ...dependencies]);

  return widget;
}
