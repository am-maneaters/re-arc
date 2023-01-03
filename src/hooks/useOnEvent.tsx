import { on } from '@arcgis/core/core/reactiveUtils';
import { useEffect } from 'react';
import { Overloads } from '../typings/utilityTypes';

/**
 * Hook wrapper around ArcGIS JS API 'on' reactiveUtils function.
 * @param target - Target object with event (e.g. MapView, FeatureLayerView, etc.)
 * @param event - Event to watch (e.g. "click", "mouse-move", etc.)
 * @param callback - Callback function to call when event is triggered
 * @param options - Options to pass to on function
 *
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html#on
 */
export function useOnEvent<
  Target extends __esri.Evented,
  Event extends Parameters<Overloads<Target['on']>>,
  EventName extends Event[0],
  Callback extends Event extends [EventName, infer CallbackHandler]
    ? CallbackHandler
    : never
>(
  target: Target,
  event: EventName,
  callback: Callback,
  options?: __esri.ReactiveListenerOptions<Target>
): void {
  useEffect(() => {
    const handle = on(() => target, event as string, callback, options);
    return () => handle.remove();
  }, [callback, event, options, target]);
}
