class Store {
  ctx;
  constructor(ctx) {
    this.ctx = ctx;
  }
  dispatch(action) {
    const reaction = this.ctx.reactions[action.type];
    if (reaction === undefined) return;
    reaction(this.ctx.data, action);
  }
  getState() {
    return this.ctx.data;
  }
}
class StoreImmutable {
  ctx;
  dataCopy;
  constructor(ctx) {
    this.ctx = ctx;
    this.dataCopy = this.ctx.copy(this.ctx.data);
  }
  dispatch(action) {
    const reaction = this.ctx.reactions[action.type];
    if (reaction === undefined) return;
    reaction(this.ctx.data, action);
    this.dataCopy = this.ctx.copy(this.ctx.data);
  }
  getState() {
    return this.dataCopy;
  }
}
export { Store as Store };
export { StoreImmutable as StoreImmutable };
