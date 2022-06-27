import React, { FC, HTMLAttributes, useMemo, useCallback } from "react";

export function useWidget<
  WidgetConstructorType extends __esri.WidgetConstructor,
  Widget extends InstanceType<WidgetConstructorType>
>(
  WidgetConstructor: WidgetConstructorType,
  widgetParams: ConstructorParameters<WidgetConstructorType>[0]
): [FC<HTMLAttributes<HTMLDivElement>>, Widget] {
  // The current instance of the widget
  const widgetInstance = useMemo(
    () => new WidgetConstructor(widgetParams) as Widget,
    [WidgetConstructor, widgetParams]
  );

  const refFn = useCallback(
    (node: HTMLDivElement | null) => {
      if (node === null) return;

      // If widget is already rendered, destroy it
      if (node.firstChild) {
        node.removeChild(node.firstChild);
      }

      // Create new widget instance and place it in the DOM
      widgetInstance.container = node;
    },
    [widgetInstance]
  );

  // Render widget as a JSX Element
  const component = useMemo(
    () => (props: React.HTMLAttributes<HTMLDivElement>) =>
      <div ref={refFn} {...props} />,
    [refFn]
  );

  return [component, widgetInstance];
}
