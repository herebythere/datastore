# Datastore

Manage application data with a portable state manager pattern.

[Deno](./deno/v0.1/)
[ECMAScript](./es/v0.1/)

## Abstract

`Datastore` is application state. `State` is a singular context or object
instance.

```
State { }
```

An `action` provides the store with details to update state.

```
Action {
	type: string
	params: unknown
}
```

A `reaction` is a function that takes `State` and an `Action` as arguments. Data
from the `action` can be used to update `state`.

```
(state: State, action: Action) => void;
```

`Reactions` are a map of `reaction` functions.

```
Reactions {
	[Action.type]: (state: State, action: Action) => void;
}
```

A `Store` contains references to `State` and `Reactions`. A `dispatch` method
passes `actions` to `reactions` to update state. A `getState` method passes a
reference to `state`.

```
Store {
	reactions: Reactions
	data: State
	
	dispatch(action): void
	getState(): State
}
```

## Licence

Datastore is released under the BSD 3-Clause License
