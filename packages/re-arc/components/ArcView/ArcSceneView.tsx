import '@arcgis/map-components/dist/components/arcgis-scene';

import { ArcgisScene } from '@arcgis/map-components-react';

import { MapContext, useCreateView } from '../../hooks/useCreateView';
export function ArcSceneView({
  children,
  onArcgisViewReadyChange,
  ...props
}: React.ComponentProps<typeof ArcgisScene>) {
  const { view, onViewReady } = useCreateView(props.id);

  return (
    <MapContext.Provider value={view}>
      <ArcgisScene
        {...props}
        onArcgisViewReadyChange={(ev) => {
          onViewReady(ev.target.view);
          onArcgisViewReadyChange?.(ev);
        }}
      >
        {view && children}
      </ArcgisScene>
    </MapContext.Provider>
  );
}
