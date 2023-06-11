# Datastore

Manage application data with a portable state manager pattern.

## How to build

```
bash build-datastore.sh
```

## How to use

Import `Store` or clone this repository into your project.

```
import { Store } from "https://raw.githubusercontent.com/herebythere/datastore/main/deno/v0.1/mod.ts"
```

Create a context for `state`:

```
const state = {
	count: 0;
}
```

Create a `reaction` map. A `reaction` is a function that takes an action and
state as an argument.

```
const reactions = {
	"increment": function(state, action) {
		state.count += 1;
	},
	"decrement": function(state, action) {
		state.count -= 1;
	},
	"reset": function(state, action) {
		state.count = 0;
	}
}
```

Create a `Store` instsance using with `reactions` and `state`

```
const datastore = new Store(reactions, state);
```

Next use the `dispatch` method to send an action to the `reaction` map.

```
datastore.dispatch({type: "increment"});
datastore.dispatch({type: "increment"}};
datastore.dispatch({type: "decrement"});
```

Then use the `getState` method to retrieve the updated state.

```
const state = datastore.getState()
// state.count === 1
```

## Licence

BSD 3-Clause License
