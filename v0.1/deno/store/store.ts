// brian taylor vann
// store

import type {
  Action,
  StoreContext,
  StoreInterface,
} from "../utils/shared_types.ts";

/*
  All store actions and ancillary functions must be syncronous
*/

class Store<D, A extends Action> implements StoreInterface<D, A> {
  private ctx: StoreContext<D, A>;

  constructor(ctx: StoreContext<D, A>) {
    this.ctx = ctx;
  }

  dispatch(action: A) {
    const reaction = this.ctx.reactions[action.type];
    if (reaction === undefined) return;

    reaction(this.ctx.data, action);
  }

  getState(): D {
    return this.ctx.data;
  }
}

export { Store };
