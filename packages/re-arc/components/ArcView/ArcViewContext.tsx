import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { MapContext } from '../../hooks/useCreateView';

type MountedViewsContextValue = {
  views: { [id: string]: MapView | SceneView };
  onViewMount: (map: MapView | SceneView, id: string) => void;
  onViewUnmount: (id: string) => void;
};

export const ArcViewContext = createContext<
  MountedViewsContextValue | undefined
>(undefined);

export const ArcViewProvider = ({ children }: React.PropsWithChildren) => {
  const [views, setViews] = useState<{ [id: string]: MapView | SceneView }>({});

  const onViewMount = useCallback((view: MapView | SceneView, id: string) => {
    setViews((currViews) => {
      if (id === 'current') {
        throw new Error("'current' cannot be used as map id");
      }
      if (currViews[id]) {
        throw new Error(`Multiple maps with the same id: ${id}`);
      }
      return { ...currViews, [id]: view };
    });
  }, []);

  const onViewUnmount = useCallback((id: string) => {
    setViews((currViews) => {
      if (currViews[id]) {
        const nextViews = { ...currViews };
        delete nextViews[id];
        return nextViews;
      }
      return currViews;
    });
  }, []);

  return (
    <ArcViewContext.Provider
      value={{
        views,
        onViewMount,
        onViewUnmount,
      }}
    >
      {children}
    </ArcViewContext.Provider>
  );
};

type ViewCollection = {
  [id: string]: MapView | SceneView | undefined;
  current?: MapView | SceneView;
};

export function useView(): ViewCollection {
  const views = useContext(ArcViewContext)?.views;
  const currentView = useContext(MapContext);

  if (!views && !currentView) {
    throw new Error('useView must be used within a valid Provider');
  }

  const mapsWithCurrent: ViewCollection = useMemo(
    () => ({ ...views, current: currentView }),
    [views, currentView],
  );

  return mapsWithCurrent;
}
