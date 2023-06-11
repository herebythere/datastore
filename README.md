# Datastore

Manage application data.

## About

`Datastore` is a portable state manager pattern.

## Abstract

`Datastore` is application state. `State` is a context or object reference that
exists as a single instance.

```
State { }
```

An action is a context that provides the store with details to update state.

```
Action {
	type: string
	params: unknown
}
```

A `reaction` is a function that takes `State` and an `Action` as arguments.

```
(state: State, action: Action) => void;
```

`Reactions` are a map of `reaction` functions

```
Reactions {
	[type]: (state: State, action: Action) => void;
}
```

The `store` modifies itself through reactions. A `dispatch` method passes
`actions` to `reactions` to update state. A `getState` method passes a reference
to `state`.

```
Store {
	reactions: Reactions
	data: State
	
	dispatch(action): void
	getState(): State
}
```

## Licence

BSD 3-Clause License
