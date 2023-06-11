import type {
  Action,
  CopyFunc,
  Reactions,
  StoreInterface,
} from "../type_flyweight/store.ts";

class StoreImmutable<D> implements StoreInterface<D> {
  private reactions: Reactions<D>;
  private copyFunc: CopyFunc<D>;
  private data: D;
  private dataCopy: D;

  constructor(reactions: Reactions<D>, data: D, copyFunc: CopyFunc<D>) {
    this.reactions = reactions;
    this.copyFunc = copyFunc;
    this.data = this.copyFunc(data);
    this.dataCopy = this.copyFunc(data);
  }

  dispatch(action: Action) {
    const reaction = this.reactions[action.type];
    if (reaction === undefined) return;

    reaction(this.data, action);

    this.dataCopy = this.copyFunc(this.data);
  }

  getState(): D {
    return this.dataCopy;
  }
}

export { StoreImmutable };
