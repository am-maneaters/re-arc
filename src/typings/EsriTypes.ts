import { Overloads } from './utilityTypes';

export type EventHandlerLookup<LayerEvents extends any[]> = {
  [EventName in LayerEvents[0]]?: LayerEvents extends [
    EventName,
    infer CallbackHandler
  ]
    ? CallbackHandler
    : never;
};

export type EsriEvented = {
  on: (name: string, eventHandler: unknown) => IHandle;
};

export type EventHandlers<T extends EsriEvented> = EventHandlerLookup<
  Parameters<Overloads<T['on']>>
>;

type ArcViewProps<View extends __esri.MapView | __esri.SceneView> = {
  children?: React.ReactNode;
  onViewCreated?: (view: View) => void;
  style?: React.CSSProperties;
  className?: string;
  eventHandlers?: EventHandlers<View>;
};

export type EsriView = typeof __esri.MapView | typeof __esri.SceneView;

type ViewProps<Constructor extends EsriView> =
  Constructor extends typeof __esri.MapView
    ? __esri.MapViewProperties
    : __esri.SceneViewProperties;

export type ArcViewWrapperProps<
  Constructor extends EsriView,
  View extends InstanceType<Constructor>
> = ArcViewProps<View> &
  ViewProps<Constructor> & { map?: __esri.WebMapProperties };
