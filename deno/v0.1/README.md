# Datastore

Manage application data with a portable state manager pattern.

## How to build

```
bash build-datastore.sh
```

## How to use

### State

Create a context for `state`.

The following example defines `state` for a `counter`.

```
interface State {
  count: number,
}

const state = {
	count: 0;
}
```

### Actions

Define `actions` by creating context with a `type` property.

The following example defines two `actions`: `increment` and `reset`.

```
interface Increment {
	type: "increment";
	step: number;
}

interface Reset {
	type: "reset";
}

type Actions = Increment | Reset;
```

### Reactions

Define `reactions` by creating `reaction` functions for each `action.type`. A
`reaction` is a function that takes `state` and an optional `action` as
arguments and returns a `boolean` to indicate if `state` changed.

The following example defines `reactions` with a `reaction` corresponding to
each `action`.

```
const reactions: Reactions = {
	"increment": function(state: State, action: Actions) {
		if (action.type !== "increment") return false;
		state.count += action.step;
		return true;
	},
	"reset": function(state: State, action: Actions) {
		state.count = 0;
		return true;
	},
}
```

### Import

Import `Store` or clone this repository into your project.

```
import { Store } from "https://raw.githubusercontent.com/herebythere/datastore/main/deno/v0.1/mod.ts"
```

### Store

Create a `Store` instsance with `reactions` and `state`.

```
const datastore = new Store(reactions, state);
```

Next use the `dispatch` method to send an action to the `reaction` map.

```
datastore.dispatch({type: "increment", step: 2});
datastore.dispatch({type: "increment", step: -1}};
datastore.dispatch({type: "decrement"});
```

Then use the `getState` method to retrieve the updated state.

```
const state = datastore.getState()
// state.count === 1
```

## Licence

Datastore is released under the BSD 3-Clause License
