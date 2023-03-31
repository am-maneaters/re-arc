import { useRef } from 'react';

export const useViewInit = (init: () => __esri.MapView | __esri.SceneView) => {
  const view = useRef(init());

  return view.current;
};
