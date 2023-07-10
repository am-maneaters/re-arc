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
    style,
    view: propsView,
    ...widgetProps
  }: {
    eventHandlers?: EventHandlers<WidgetInstance>;
  } & WidgetProperties & {
      style?: React.CSSProperties;
      view?: __esri.SceneView | __esri.MapView;
    }) {
    const ref = useRef<HTMLDivElement>(null);
    const view = useView(propsView);
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
      <>
        <div style={style} ref={ref} />
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
      </>
    );
  }

  return memo(ArcWidget, isEqual);
}