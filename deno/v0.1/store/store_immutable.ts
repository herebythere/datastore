import type {
  Action,
  Copy,
  Reactions,
  StoreInterface,
} from "../type_flyweight/store.ts";

class DataStoreImmutable<D> implements StoreInterface<D> {
  private reactions: Reactions<D>;
  private copyFunc: Copy<D>;
  private data: D;
  private dataCopy: D;

  constructor(reactions: Reactions<D>, data: D, copyFunc: Copy<D>) {
    this.reactions = reactions;
    this.copyFunc = copyFunc;
    this.data = this.copyFunc(this.data);
    this.dataCopy = this.copyFunc(this.data);
  }

  dispatch(action: Action) {
    const reaction = this.reactions[action.type];
    if (reaction === undefined) return;

    reaction(this.data, action);

    this.dataCopy = this.copy(this.data);
  }

  getState(): D {
    return this.dataCopy;
  }
}

export { DataStoreImmutable };
