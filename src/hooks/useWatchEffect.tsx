import { useEffect, useRef } from "react";
import { watch, on } from "@arcgis/core/core/reactiveUtils";
import { Overloads } from "../typings/utilityTypes";

/**
 * Hook wrapper around ArcGIS JS API watch reactiveUtils function.
 * Use this hook to watch a single property of an Accessor object (most ArcGIS JS API objects).
 * @param accessor - Accessor object to watch (e.g. MapView, FeatureLayerView, etc.)
 * @param property - Property on the Accessor object to watch (e.g. "extent", "geometry", "geometry.spatialReference", etc.)
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html#watch
 */
export function useWatchEffect<
  Accessor extends __esri.Accessor,
  Property extends keyof Accessor
>(
  callback: (
    newValue?: Accessor[Property] | undefined,
    oldValue?: Accessor[Property] | undefined
  ) => void,
  accessor: Accessor,
  property: Property
): void {
  const handleRef = useRef<__esri.Handle>();
  useEffect(() => {
    let handle = handleRef.current;
    handle?.remove();

    if (accessor && property in accessor)
      handle = watch(() => accessor[property], callback);

    return () => handle?.remove();
  }, [callback, accessor, property]);
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
  Event extends Parameters<Overloads<Target["on"]>>,
  EventName extends Event[0]
>(
  target: Target,
  event: EventName,
  callback: Event extends [EventName, infer CallbackHandler]
    ? CallbackHandler
    : never,
  options?: __esri.ReactiveListenerOptions<Target>
): void {
  useEffect(() => {
    const handle = on(() => target, event as string, callback, options);
    return () => handle.remove();
  }, [callback, event, options, target]);
}
