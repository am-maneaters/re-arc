import { ArcgisMap } from '@arcgis/map-components-react';

import { MapContext, useCreateView } from '../../hooks/useCreateView';
import '@arcgis/map-components/dist/components/arcgis-map';
export function ArcMapView({
  children,
  onArcgisViewReadyChange,
  ...props
}: React.ComponentProps<typeof ArcgisMap>) {
  const { view, onViewReady } = useCreateView(props.id);

  return (
    <MapContext.Provider value={view}>
      <ArcgisMap
        {...props}
        onArcgisViewReadyChange={(ev) => {
          onViewReady(ev.target.view);
          onArcgisViewReadyChange?.(ev);
        }}
      >
        {view && children}
      </ArcgisMap>
    </MapContext.Provider>
  );
}
