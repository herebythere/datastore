import type {
  Action,
  Reactions,
  StoreInterface,
} from "../type_flyweight/store.ts";

class Store<D> implements StoreInterface<D> {
  private reactions: Reactions<D>;
  private data: D;

  constructor(reactions: Reactions<D>, data: D) {
    this.reactions = reactions;
    this.data = data;
  }

  dispatch(action: Action) {
    const reaction = this.reactions[action.type];
    if (reaction === undefined) return;

    reaction(this.data, action);
  }

  getState(): D {
    return this.data;
  }
}

export { Store };
