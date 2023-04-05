import { Overloads } from './utilityTypes';

export type EventHandlers<
  View extends { on: (event: string, ...args: unknown[]) => unknown },
  LayerEvents extends Parameters<Overloads<View['on']>>
> = {
  [EventName in LayerEvents[0]]?: LayerEvents extends [
    EventName,
    infer CallbackHandler
  ]
    ? CallbackHandler
    : never;
};
