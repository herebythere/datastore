# Datastore

Manage application data.

## Abstract

Datastore is a portable state manager.

## About

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

## How to use

Create a context for state:

```
const state = {
	count: 0;
}
```

Create a `reaction` map:

```
const reactions = {
	"increment": function(action, state) {
		state.count += 1;
	},
	"decrement": function(action, state) {
		state.count -= 1;
	},
	"reset": function(action, state) {
		state.count = 0;
	}
}
```

Create an instance of a data store:

```
const datastore = new Datastore(reactions, state);
```

Next use the `dispatch` to send an action to the `reaction` map.

```
dispatch({type: "increment"});
dispatch({type: "increment"}};
dispatch({type: "decrement"});
```

Then use the `getState` function to retrieve the updated state.

```
const state = datastore.getState()
// state.count === 1
```

## Licence

BSD 3-Clause License
