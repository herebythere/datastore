# Datastore

Manage application data with a portable state manager pattern.

[Typescript](./deno/v0.1/) (via Deno)

[ECMAScript](./es/v0.1/)

## Abstract

### State

`State` is a singular context or object instance.

```
State { }
```

### Actions

An `action` provides details used to update `state`.

```
Action {
	type: string
	params: unknown
}
```

### Reactions

A `reaction` is a function that takes `state` and an `action` as arguments. Data
from an `action` is used to update `state`. A `reaction` returns a `boolean` to
indicate if `state` was updated.

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
of that `reaction` to confirm if state has changed.

A `getState` method returns a reference to `state`.

```
Store {
	reactions: Reactions
	data: State
	
	dispatch(action: Action): boolean
	getState(): State
}
```

## Licence

Datastore is released under the BSD 3-Clause License.
