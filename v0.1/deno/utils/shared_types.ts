// brian taylor vann
// datastore types

interface Action {
  type: string;
}

type Reaction<S, A> = (storeData: S, action: A) => void;

type ReactionRecord<S, A> = Record<string, Reaction<S, A>>;

interface StoreContext<D, A> {
  data: D;
  reactions: ReactionRecord<D, A>;
}

interface StoreInterface<D, A> {
  dispatch(action: A): void;
  getState(): D;
}

type Copy<D> = (data: D) => D;

interface StoreImmunatableContext<D, A> extends StoreContext<D, A> {
  copy: Copy<D>;
}

type StoreImmunatableInterface<D, A> = StoreInterface<D, A>;

export type {
  Action,
  Copy,
  Reaction,
  ReactionRecord,
  StoreContext,
  StoreImmunatableContext,
  StoreImmunatableInterface,
  StoreInterface,
};
