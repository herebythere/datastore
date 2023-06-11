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
        const reaction = this.reactions.get(action.type);
        if (reaction === undefined) return false;
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
        this.data = copyFunc(data);
        this.dataCopy = copyFunc(data);
    }
    dispatch(action) {
        const reaction = this.reactions.get(action.type);
        if (reaction === undefined) return false;
        const stateHasChanged = reaction(this.data, action);
        if (stateHasChanged) {
            this.dataCopy = this.copyFunc(this.data);
        }
        return stateHasChanged;
    }
    getState() {
        return this.dataCopy;
    }
}
export { Store as Store };
export { StoreImmutable as StoreImmutable };
