// brian taylor vann
// store

import type { Action, Reactions, StoreInterface } from "./shared_types.ts";

/*
  All store actions and ancillary functions must be syncronous
*/

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
