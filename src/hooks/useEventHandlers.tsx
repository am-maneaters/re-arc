import { useEffect } from 'react';

import { EsriEvented, EventHandlers } from '../typings/EsriTypes';

export const useEventHandlers = <View extends EsriEvented>(
  accessor?: View,
  eventHandlers?: EventHandlers<View>
): void => {
  useEffect(() => {
    if (!accessor || !eventHandlers) return;

    const handles = Object.entries(eventHandlers).map(([event, handler]) =>
      accessor.on(event, handler)
    );

    return () => {
      for (const handle of handles) handle.remove();
    };
  }, [eventHandlers, accessor]);
};
