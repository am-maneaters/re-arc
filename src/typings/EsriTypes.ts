import { Overloads } from './utilityTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export type EsriView = typeof __esri.MapView | typeof __esri.SceneView;

type ViewProps<Constructor extends EsriView> =
  Constructor extends typeof __esri.MapView
    ? __esri.MapViewProperties
    : __esri.SceneViewProperties;

export type ArcViewWrapperProps<
  Constructor extends EsriView,
  View extends InstanceType<Constructor>,
  Properties = ViewProps<Constructor>
> = {
  /** `map` can either be an object of map properties, or */
  map?: __esri.WebMapProperties;
  children?: React.ReactNode;
  onViewCreated?: (view: View) => void;
  style?: React.CSSProperties;
  className?: string;
  eventHandlers?: EventHandlers<View>;
} & Properties;
