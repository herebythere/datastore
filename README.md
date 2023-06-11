# Datastore

Manage application data.

## About

Datastore is a portable state manager pattern.

## Abstract

Data store is a slice of application state. `State` is a context or object
reference that exists as a single instance.

```
State { }
```

An action is a context that provides the store with details to update state.

```
Action {
	type: string
}
```

The store modifies itself through reactions. A `reaction` is a function that
takes `State` and an `Action` as arguments.

```
(state: State, action: Action) => void;
```

`Reactions` are a map of `reaction` functions

```
Reactions {
	[type]: (state: State, action: Action) => void;
}
```

## Licence

BSD 3-Clause License
