# Datastore

Manage application data with a portable state manager pattern.

## How to build

```SH
bash build-datastore.sh
```

## How to use

### State

Create a context for `state`.

The following example defines `state` for a `counter`.

```TS
interface State {
 	count: number,
}

const state: State = {
	count: 0;
};
```

### Actions

Define `actions` by creating context with a `type` property.

The following example defines two `actions`: `increment` and `reset`.

```TS
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

Define `reactions` by creating `reaction` functions for each `action.type`.

A `reaction` is a function that takes `state` and an optional `action` as
arguments and returns a `boolean` to indicate if `state` changed.

The following example defines `reactions` with a `reaction` corresponding to
each `action`.

```TS
function increment(state: State, action: Actions) {
  if (action.type !== "increment") return false;

  state.count += action.step;
  return true;
}

function reset(state: State, action: Actions) {
  state.count = 0;
  return true;
}

const reactions: Reactions = new Map<string, Reaction>([
  ["increment", increment],
  ["reset", reset],
]);
```

### Import

Import `Store` or clone this repository into your project.

```TS
import { Store } from "https://raw.githubusercontent.com/herebythere/datastore/main/deno/v0.1/mod.ts";
```

### Store

Create a `Store` instsance with `reactions` and `state`.

```TS
const datastore = new Store<State, Actions>(state, reactions);
```

Next use the `dispatch` method to send an action to the `reaction` map.

```TS
datastore.dispatch({type: "increment", step: 2});
datastore.dispatch({type: "increment", step: -1}};
datastore.dispatch({type: "decrement"});
```

Then use the `getState` method to retrieve the updated state.

```TS
const state = datastore.getState();
// state.count === 1
```

## Licence

Datastore is released under the BSD 3-Clause License.
