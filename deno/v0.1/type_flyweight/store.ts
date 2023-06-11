interface Action {
  type: string;
}

type CopyFunc<D> = (data: D) => D;

type Reaction<S> = (storeData: S, action: Action) => boolean;

type Reactions<S> = Map<string, Reaction<S>>;

interface StoreInterface<D> {
  dispatch(action: Action): void;
  getState(): D;
}

export type { Action, CopyFunc, Reaction, Reactions, StoreInterface };
