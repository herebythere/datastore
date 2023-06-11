// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

class Store {
    reactions;
    data;
    constructor(reactions, data){
        this.reactions = reactions;
        this.data = data;
    }
    dispatch(action) {
        if (!this.reactions.hasOwnProperty(action.type)) return false;
        const reaction = this.reactions[action.type];
        return reaction(this.data, action);
    }
    getState() {
        return this.data;
    }
}
class StoreImmutable {
    reactions;
    copyFunc;
    data;
    dataCopy;
    constructor(reactions, data, copyFunc){
        this.reactions = reactions;
        this.copyFunc = copyFunc;
        this.data = this.copyFunc(data);
        this.dataCopy = this.copyFunc(data);
    }
    dispatch(action) {
        if (!this.reactions.hasOwnProperty(action.type)) return false;
        const reaction = this.reactions[action.type];
        reaction(this.data, action);
        this.dataCopy = this.copyFunc(this.data);
        return true;
    }
    getState() {
        return this.dataCopy;
    }
}
export { Store as Store };
export { StoreImmutable as StoreImmutable };
