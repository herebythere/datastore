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
    this.data = copyFunc(data);
    this.dataCopy = copyFunc(data);
  }

  dispatch(action: Action): boolean {
    const reaction = this.reactions.get(action.type);
    if (reaction === undefined) return false;

    const stateHasChanged = reaction(this.data, action);
    if (stateHasChanged) {
      this.dataCopy = this.copyFunc(this.data);
    }

    return stateHasChanged;
  }

  getState(): D {
    return this.dataCopy;
  }
}

export { StoreImmutable };
