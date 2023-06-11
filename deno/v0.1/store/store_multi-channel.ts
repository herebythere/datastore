import type {
  Action,
  Reactions,
  StoreInterface,
} from "../type_flyweight/store.ts";

// maybe multi channel isn't needed? revamp?
class StoreMultiChannel<D> implements StoreInterface<D> {
  private reactionMap = new Map<string, Reactions<D>>();
  private data: D;

  constructor(data: D) {
    this.data = data;
  }

  setChannel(name: string, reactions: Reactions<D>) {
    this.reactionMap.set(name, reactions);
  }

  removeChannel(name: string) {
    this.reactionMap.delete(name);
  }

  dispatch(action: Action) {
    for (const [channel, reactions] of this.reactionMap) {
      const reaction = reactions[action.type];
      if (reaction === undefined) return;

      reaction(this.data, action);
    }
  }

  getState(): D {
    return this.data;
  }
}

export { StoreMultiChannel };
