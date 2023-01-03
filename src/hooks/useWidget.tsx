import React from 'react';

export function useWidget<Widget extends __esri.Widget>(
  Widget: Widget
): Widget {
  return React.useRef(Widget).current;
}
