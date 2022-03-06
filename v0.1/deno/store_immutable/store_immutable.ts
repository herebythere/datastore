import type {
  Action,
  StoreImmunatableContext,
  StoreImmunatableInterface,
} from "../utils/shared_types.ts";

class StoreImmutable<D, A extends Action>
  implements StoreImmunatableInterface<D, A> {
  private ctx: StoreImmunatableContext<D, A>;
  private dataCopy: D;

  constructor(ctx: StoreImmunatableContext<D, A>) {
    this.ctx = ctx;
    this.dataCopy = this.ctx.copy(this.ctx.data);
  }

  dispatch(action: A) {
    const reaction = this.ctx.reactions[action.type];
    if (reaction === undefined) return;

    reaction(this.ctx.data, action);

    this.dataCopy = this.ctx.copy(this.ctx.data);
  }

  getState(): D {
    return this.dataCopy;
  }
}

export { StoreImmutable };
