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
