class Store {
  reactions;
  data;
  constructor(reactions, data) {
    this.reactions = reactions;
    this.data = data;
  }
  dispatch(action) {
    const reaction = this.reactions[action.type];
    if (reaction === undefined) return;
    reaction(this.data, action);
  }
  getState() {
    return this.data;
  }
}
class StoreImmutable {
  reactions;
  data;
  copy;
  dataCopy;
  constructor(reactions, data, copy) {
    this.reactions = reactions;
    this.data = data;
    this.copy = copy;
    this.dataCopy = this.copy(this.data);
  }
  dispatch(action) {
    const reaction = this.reactions[action.type];
    if (reaction === undefined) return;
    reaction(this.data, action);
    this.dataCopy = this.copy(this.data);
  }
  getState() {
    return this.dataCopy;
  }
}
export { Store as Store };
export { StoreImmutable as StoreImmutable };
