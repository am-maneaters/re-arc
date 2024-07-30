// useArcView.js or useArcView.ts

import {
  useState,
  useId,
  useContext,
  useCallback,
  useEffect,
  createContext,
} from 'react';
import { ArcViewContext } from '../components/ArcView/ArcViewContext';

export const MapContext = createContext<
  __esri.MapView | __esri.SceneView | undefined
>(undefined);
export function useCreateView(id?: string) {
  const [view, setView] = useState<__esri.MapView | __esri.SceneView>();

  const internalId = useId();
  const mapId = id ?? internalId;

  const mountedViewsContext = useContext(ArcViewContext);
  const { onViewMount, onViewUnmount } = mountedViewsContext ?? {};

  const onViewReady = useCallback(
    (view: __esri.MapView | __esri.SceneView) => {
      setView(view);
      onViewMount?.(view, mapId);
    },
    [mapId, onViewMount],
  );

  useEffect(() => {
    return () => {
      onViewUnmount?.(mapId);
    };
  }, [mapId, onViewUnmount]);

  return { view, mapId, onViewReady };
}
