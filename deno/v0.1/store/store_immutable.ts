import type {
  Action,
  Copy,
  Reactions,
  StoreInterface,
} from "../type_flyweight/store.ts";

class StoreImmutable<D> implements StoreInterface<D> {
  private reactions: Reactions<D>;
  private data: D;
  private copy: Copy<D>;
  private dataCopy: D;

  constructor(reactions: Reactions<D>, data: D, copy: Copy<D>) {
    this.reactions = reactions;
    this.data = data;
    this.copy = copy;

    this.dataCopy = this.copy(this.data);
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

export { StoreImmutable };
