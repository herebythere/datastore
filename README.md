# Datastore

Manage application data with a portable state manager pattern.

[Deno](./deno/v0.1/) [ECMAScript](./es/v0.1/)

## Abstract

### State

`Datastore` is application state. `State` is a singular context or object
instance.

```
State { }
```

### Actions

An `action` provides the store with details to update state.

```
Action {
	type: string
	params: unknown
}
```

### Reactions

A `reaction` is a function that takes `State` and an `Action` as arguments. Data
from the `action` can be used to update `state`. A `reaction` returns a
`boolean` to indicate if the state was updated.

```
Reaction {
	(state: State, action: Action) => boolean;
}
```

`Reactions` are a map of `reaction` functions.

```
Reactions {
	[Action.type]: Reaction;
}
```

### Store

A `Store` contains references to `State` and `Reactions`.

A `dispatch` method passes an `action` to a `reaction` and returns the results
of a `reaction` to confirm if state has changed.

A `getState` method returns a reference to `state`.

```
Store {
	reactions: Reactions
	data: State
	
	dispatch(action): boolean
	getState(): State
}
```

## Licence

Datastore is released under the BSD 3-Clause License
