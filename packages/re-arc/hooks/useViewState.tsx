import { useCallback, useState } from 'react';

/**
 * `useViewState` is the recommended way to get a reference to a view because it
 * uses the `useCallback` hook to ensure that the view is only set once. Otherwise
 * the view would be set every time the component re-renders because the `onViewCreated`
 * callback would be recreated every time.
 * @returns A tuple of the view and a callback to set the view.
 */
export function useViewState<View extends __esri.MapView | __esri.SceneView>() {
  const [view, setView] = useState<View>();

  const onViewCreated = useCallback((view: View) => {
    setView(view);
  }, []);

  return [view, onViewCreated] as const;
}
