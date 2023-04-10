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
    constructor(reactions, data, copy){
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
class StoreMultiChannel {
    reactionMap = new Map();
    data;
    constructor(data){
        this.data = data;
    }
    setChannel(name, reactions) {
        this.reactionMap.set(name, reactions);
    }
    removeChannel(name) {
        this.reactionMap.delete(name);
    }
    dispatch(action) {
        for (const [channel, reactions] of this.reactionMap){
            const reaction = reactions[action.type];
            if (reaction === undefined) return;
            reaction(this.data, action);
        }
    }
    getState() {
        return this.data;
    }
}
export { Store as Store };
export { StoreImmutable as StoreImmutable };
export { StoreMultiChannel as StoreMultiChannel };
