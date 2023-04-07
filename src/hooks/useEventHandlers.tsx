import { useEffect } from 'react';

import { EsriEvented, EventHandlers } from '../typings/EsriTypes';

export const useEventHandlers = <View extends EsriEvented>(
  accessor?: View,
  eventHandlers?: EventHandlers<View>
) => {
  useEffect(() => {
    if (!accessor || !eventHandlers) return;

    const handles = Object.entries(eventHandlers).map(([event, handler]) =>
      accessor.on(event as any, handler as any)
    );

    return () => {
      for (const handle of handles) handle.remove();
    };
  }, [eventHandlers, accessor]);
};
