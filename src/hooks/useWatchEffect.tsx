import { useCallback, useEffect, useState } from 'react';
import { watch, on } from '@arcgis/core/core/reactiveUtils';
import { Overloads } from '../typings/utilityTypes';

export function useWatchEffect<T>(
  getValue: () => T,
  callback: (newValue: T, oldValue: T) => void,
  options?: __esri.ReactiveWatchOptions
) {
  useEffect(() => {
    // Watch for changes to value
    const handle = watch(getValue, callback, { initial: true, ...options });

    // Remove watch when component unmounts
    return () => handle.remove();
  }, [callback, getValue, options]);
}

export function useWatchState<T>(
  getValue: () => T,
  deps: any[],
  options?: __esri.ReactiveWatchOptions
): T | undefined {
  const [state, setState] = useState<T>();

  const cb = useCallback(getValue, deps);

  useWatchEffect(cb, setState, options);

  return state;
}

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
  EventName extends Event[0]
>(
  target: Target | (() => Target) | undefined,
  event: EventName,
  callback: Event extends [EventName, infer CallbackHandler]
    ? CallbackHandler
    : never,
  options?: __esri.ReactiveListenerOptions<Target>
): void {
  useEffect(() => {
    const handle = on(
      typeof target === 'function' ? target : () => target,
      event as string,
      callback,
      options
    );
    return () => handle.remove();
  }, [callback, event, options, target]);
}
