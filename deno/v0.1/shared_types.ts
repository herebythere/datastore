// brian taylor vann
// datastore types

interface Action {
  type: string;
}

type Reaction<S> = (storeData: S, action: Action) => void;

type Reactions<S> = Record<string, Reaction<S>>;

interface StoreInterface<D> {
  dispatch(action: Action): void;
  getState(): D;
}

type Copy<D> = (data: D) => D;

export type { Action, Copy, Reaction, Reactions, StoreInterface };
