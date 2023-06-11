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

  dispatch(action: Action): boolean {
    if (!this.reactions.hasOwnProperty(action.type)) return false;

    const reaction = this.reactions[action.type];
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
