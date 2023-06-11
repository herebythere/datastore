import type {
  Action,
  Reactions,
  StoreInterface,
} from "../type_flyweight/store.ts";

class Store<D> implements StoreInterface<D> {
  reactions: Reactions<D>;
  data: D;

  constructor(reactions: Reactions<D>, data: D) {
    this.reactions = reactions;
    this.data = data;
  }

  dispatch(action: Action): boolean {
    const reaction = this.reactions.get(action.type);
    if (reaction === undefined) return false;

    return reaction(this.data, action);
  }

  getState(): D {
    return this.data;
  }
}

export { Store };
