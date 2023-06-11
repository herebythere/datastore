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
    if (!this.reactions.hasOwnProperty(action.type)) return false;

    const reaction = this.reactions[action.type];
    return reaction(this.data, action);
  }

  getState(): D {
    return this.data;
  }
}

export { Store };
