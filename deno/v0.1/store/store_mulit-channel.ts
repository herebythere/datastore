import type {
  Action,
  Reactions,
  StoreInterface,
} from "../type_flyweight/store.ts";

class StoreMultiChannel<D> implements StoreInterface<D> {
  private reactionMap = new Map<string, Reactions<D>>();
  private data: D;

  constructor(data: D) {
    this.data = data;
  }

  setChannel(name: string, reactions: Reactions<D>) {
    this.reactionMap.set(string, reactions);
  }

  removeChannel(name: string, reactions: Reactions<D>) {
    this.reactionMap.delete(string, reactions);
  }

  dispatch(action: Action) {
    for (const reactions of this.reactions) {
      const reaction = this.reactions[action.type];
      if (reaction === undefined) return;

      reaction(this.data, action);
    }
  }

  getState(): D {
    return this.data;
  }
}

export { StoreMultiChannel };
