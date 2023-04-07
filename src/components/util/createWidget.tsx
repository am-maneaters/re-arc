import { memo, useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';

import { useEventHandlers } from '../../hooks/useEventHandlers';
import { EventHandlers } from '../../typings/EsriTypes';
import { useView } from '../ArcView/ViewContext';
import { ArcReactiveProp } from './ArcReactiveProp';

export function createWidget<
  WidgetConstructorType extends new (
    props: WidgetProperties | undefined
  ) => WidgetInstance,
  WidgetProperties,
  WidgetInstance extends __esri.Widget
>(WidgetConstructor: WidgetConstructorType) {
  function ArcWidget({
    eventHandlers,
    ...widgetProps
  }: {
    eventHandlers?: EventHandlers<WidgetInstance>;
  } & WidgetProperties) {
    const ref = useRef<HTMLDivElement>(null);
    const view = useView();
    const [widget] = useState<WidgetInstance>(
      new WidgetConstructor(widgetProps as WidgetProperties)
    );

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

    useEventHandlers(widget, eventHandlers);

    return (
      <div>
        <div ref={ref} />
        {widgetProps &&
          widget &&
          Object.entries(widgetProps).map(([key, val]) => (
            <ArcReactiveProp
              key={key}
              accessor={widget}
              property={key}
              value={val}
            />
          ))}
      </div>
    );
  }

  return memo(ArcWidget, isEqual);
}
