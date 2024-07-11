# State Chart

- precise diagrams
- model visualizations
- comprehensive tests
- accommodate changes

# State Machine

Application structured as a graph.
Comprised of nodes and edges.

# Graphs

- undirected graph - information flows in any direction
- directed graph - information flows in one direction

**Undirected Graph**

Comprised of nodes a,b,c,d and bidirectional edges

```
a - b - c
 \  |
   d
```

**Directed Graph**

Comprised of 3 types of nodes
- source node - no incoming edges
- sink node - no outgoing edges
- transfer node - at least 1 incoming and 1 outgoing edge

```
a -> b -> c
 \   ^
  \  |
   ->d  
```
a is a source node
b is a transfer node
c is a sink node

# Finite State Machine

Comprised of
- finite states
- transitions
- events
- initial state
- final states

Promise represented as a finite state machine.
```
                              > [resolved]
                             /
                         resolve
                           /
[idle] - fetch -> [pending] 
                           \
                          reject
                             \
                              > [rejected]
```

**Finite States**

Exist in only one status at a time.

- idle
- pending
- resolved
- rejected

**Transitions**

Change between one state to another state.

- idle to pending
- pending to resolved
- pending to rejected

*Actions*

Side effects that occur when switching states.

Types Of Actions
- transition actions
- entry actions
- exit actions

Example
Moving between idle state and pending state causes the transition action - display 'transitioning'
Entering the pending state causes the entry action - show pending icon
Exiting the pending state causes the exit action - hide pending icon

Execution order is usually
- exit a state
- transition to another state
- enter new state

**Guarded Transitions**

A transition with a condition that if it returns false then no transition occurs.

`cond`

Useful for limiting log in attempts.

js
```js
cond: (context,event) => {
  return context.retries < 4; // limited to 3 log in attempts
}
```

**Transient Transitions**

Automatically occur upon entering a state.

Useful for directing to appropriate states.

An authorization state sends user to 
- dashboard if authorized
- log in screen if not authorized

```js
'': [
  {
   target: 'dashboard',
    cond: authorized
  },
  {
    target: 'login'
  }
]
```

**Delayed Transitions**

Although there are no in between states , a delay from transitioning from one state to the next can be made.

```js
after: {
  2000: {
    actions: () => {
      console.log('and 2 seconds later');
    },
  },
},
```

**Events**

Actions that cause transitions to occur.

- fetch
- resolve
- reject

**Initial State**

Starting point of state machine.
There is only one initial state per state machine.

- idle

**Final States**

End point of a state machine.
There can be multiple final states per state machine.

# Extended State

Finite state describes the qualitative behaviour.
Extended state describes the potential infinite contextual attributes that a finite state can have.

**Assignments**

Actions on extended states.

- static assignment - string , boolean , array , object
- function assignment - takes context and event to perform some operation

# Switch Statements

Building a state machine with switch statements.

js
```js
function transition(state,event) {
  switch(state) {
    case 'idle':
      switch (event) {
        case 'FETCH':
          return 'pending';
        default:
          return state;
      }
    case 'pending':
      switch (event) {
        case 'RESOLVE':
          return 'resolved';
        case 'REJECT':
          return 'rejected';
        default:
          return state;
      }
    case 'resolved':
    case 'rejected':
    default:
      return state;
  }
}
```

# Objects

Building a state machine with objects.

js
```js
const machine = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: 'pending'
      }
    },
    pending: {
      on: {
        RESOLVE: 'resolved',
        REJECT: 'rejected'
      }
    },
    resolved: {},
    rejected: {}
  }
}

function transition(state,event) {
  return machine.states[state]?.on?.[event] || state;
}

console.log(transition('idle','FETCH'));
```

# Interpreter State Machine

Manages various states.
Updates states based on received events.

js
```js
// tracks current state
let currentState = machine.initial;

// receives events
const send = (event) => {
  // determine next state
  const nextState = transition(currentState,event);
  console.log(nextState);
  // update current state
  currentState = nextState;
}

window.send = send;
```

terminal
```bash
send('FETCH') // pending
send('RESOLVE') // resolved
send('REJECT') // rejected
```

# Full Example State Machine Switch

Changes colour of element and displays active or inactive in console.

html
```html
<body>
  <header>
    <h1>hi</h1>
  </header>
  <main>
    <div id="box"></div>
  </main>
  <script src="main.js"></script>
</body>
```

css
```css
#box {
  width: 25vw;
  height: 25vh;
  background-color: salmon;
  opacity: 1;
}

#box[data-state='inactive'] {
  opacity: 0.5;
}

#box::after {
  content: 'state: ' attr(data-state);
  background: tomato;
}
```

js
```js
const elBox = document.querySelector('#box');

function transition(state,event) {
  switch(state) {
    case 'inactive':
      switch (event) {
        case 'CLICK':
          return 'active';
        default:
          return state;
      }
    case 'active':
      switch (event) {
        case 'CLICK':
          return 'inactive';
        default:
          return state;
      }
    default:
      return state;
  }
}

let currentState = 'inactive';

function send(event) {
  const nextState = transition(currentState,event);
  currentState = nextState;
  elBox.dataset.state = currentState;
  console.log(currentState);
}

elBox.addEventListener('click',() => {
  send('CLICK');
});
```

# Full Example State Machine Object

Changes colour of element and displays active or inactive in console.

html
```html
<body>
  <header>
    <h1>hi</h1>
  </header>
  <main>
    <div id="box"></div>
  </main>
  <script src="main.js"></script>
</body>
```

css
```css
#box {
  width: 25vw;
  height: 25vh;
  background-color: salmon;
  opacity: 1;
}

#box[data-state='inactive'] {
  opacity: 0.5;
}

#box::after {
  content: 'state: ' attr(data-state);
  background: tomato;
}
```

js
```js
const elBox = document.querySelector('#box');

const machine = {
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        CLICK: 'active'
      }
    },
    active: {
      on: {
        CLICK: 'inactive'
      }
    }
  }
}

function transition(state,event) {
  return machine.states[state].on[event] || state;
}

let currentState = 'inactive';

function send(event) {
  const nextState = transition(currentState,event);
  currentState = nextState;
  elBox.dataset.state = currentState;
  console.log(currentState);
}

elBox.addEventListener('click',() => {
  send('CLICK');
});
```

# Hierarchical States

Nested states.

```
          <- [hidden] <-
          |            |
       turn on     turn off
          |            |
   --------------------------
  [          visible         ]
  |                          |
  |  [light]  <- ->  [dark]  |
  [         switches         ]
   --------------------------
```

```js
const displayMachine = createMachine({
  initial: 'hidden',
  states: {
    hidden: {},
    visible: {
      initial: 'light',
      states: {
        light: {},
        dark: {},
      },
    },
  },
});
```

# History States

Stores the last used state within the visible state.
So that when re entering visible state , it picks up from the last used state.

```
          <- [hidden] <-
          |            |
       turn on     turn off
          |            |
   --------------------------
  [          visible         ]
  |                          |
  |  [light]  <- ->  [dark]  |
  |         switches         |
  |                          |
  [          [hist]          ]
   --------------------------
```

```js
const someMachine = createMachine({
  initial: 'something.hist',
  states: {
    something: {
      initial: 'one',
      states: {
        one: {},
        two: {},
        hist: {             // can have any name
          type: 'history',  // makes hist state a history state
        },
      },
    },
    somethingElse: {
      on: {
        TOGGLE: 'something.hist',
      },
    },
  },
});
```

# Parallel States

Better known as orthogonal states since two states cannot simultaneously exist.
Instead these are regions that can combine with each other within a state.

The regions mode and bright exist within the visible state.
These 2 regions give rise to 4 combinations.
- light + bright
- light + dim
- dark + bright
- dark + dim

```
          <- [hidden] <-
          |            |
       turn on     turn off
          |            |
   --------------------------
  [          visible         ]
  |                          |
  |  -------  mode  -------  |
  |                          |
  |  [light]  <- ->  [dark]  |
  |         switches         |
  |                          |
  |  -----   bright  ------  |
  |                          |
  |  [bright] <- focus [dim] |
  [           5s ->          ]
   --------------------------
```

```js
visible: {
  type: 'parallel',  // defines the states as parallel
  states: {
    mode: {
      initial: 'light',
      states: {
        light: {},
        dark: {},
      },
    },
    brightness: {
      initial: 'bright',
      states: {
        bright: {},
        dim: {},
      },
    },
  },
},
```

# Actor Model

Actor can
- send a message to another actor
- change its own behaviour in response to a message
- spawn new actors

An actor's state is local and private.
Cannot be seen outside.

Actors function similar to a promise.

```
 <- [  fetcher  ]  <-
 |                  |
invoke           resolve
 |                  |
 [      actor       ]
   |             |
   -> [ actor ] ->
```

Actors can invoke
- promises
- callbacks
- observables
- machines

These then can send a message back to the original machine.
Once the invoked actions complete , they are automatically cleared.

```js
invoke: {
  src: (context,event) {
    return something();
  },
  onDone: {
    target: 'resolved',
  },
  onError: {
    target: 'rejected'
  },
},
```


# State Machine Model

Steps for making a state machine.

- identify all the individual states
these are instances that the application can exist in
- identify all events
these are the user interactions that can change one state to another
- add transition function
- listen for events
- interpret events

As can be seen below this becomes complicated.
The library xstate.js simplifies making and using state machines.

**States**

js
```js
const feedbackMachine = {
  initial: 'question',
  states: {
    question: {
      
    },
    form: {
      
    },
    thanks: {
      
    },
    closed: {
      
    }
  }
}
```

**Events**

js
```js
const feedbackMachine = {
  initial: 'question',
  states: {
    question: {
      on: {
        CLICK_GOOD: 'thanks',
        CLICK_BAD: 'form'
      }
    },
    form: {
      on: {
        SUBMIT: 'thanks'
      }
    },
    thanks: {
      on: {
        CLOSE: 'closed'
      }
    },
    closed: {} // sink node
  }
};
```

**Transition Function**

js
```js
let currentState = feedbackMachine.initial;

function transition(state,event) {
  return feedbackMachine.states[state]?.on?.[event] || state;
}
```

**Send Event Function**

js
```js
function send(event) {
  const nextState = transition(currentState,event);
  currentState = nextState;
}
```

**Interpret Events Function**

js
```js
function interpret(machine) {
  // tracks current state within closure
  let currentState = machine.initial;
  let status = 1; // 1 for started , 2 for stopped
  // track listeners
  const listeners = new Set();
  // receive events
  const send = (event) => {
    if (status === 2) {
      return;
    }
    const nextState = transition(currentState,event);
    currentState = nextState;
  }
  // register listeners
  const onTransition = (listener) => {
    listeners.add(listener);
  }
  // tidy up
  const stop = () => {
    status = 2;
    listeners.clear();
  }
  return {
    // expose way to register listeners
    onTransition,
    // expose tidy up
    stop,
    send
  };
}
```

# To Avoid

Placing state logic within event handlers makes it difficult see the overall structure when more handlers are added.
This is one of the main reasons to instead implement state machines as in the examples above.
Although the code below works for such a simple example , it is not as effective once it needs to scale.
Instead of using code like below , make a state machine.

html
```html
<body>
  <main>
    <button id="button">click me</button>
    <pre id="output"></pre>
  </main>
  <script src="main.js"></script>
</body>
```

css
```css
html,body,main,div {
  margin: 0;
  padding: 0;
}

body {
  background-color: pink;
  width: 100vw;
  height: 100vh;
}

main {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  width: 50vw;
  margin: 0 auto;
  text-align: center;
}

#button[disabled] {
    opacity: .25;
}
```

js
```js
const elOutput = document.querySelector('#output');

function output(object) {
  elOutput.innerHTML = JSON.stringify(user,null,2);
}

console.log('you made it here!');

const user = {
  name: 'hello kitty',
  company: 'sun rio',
  interests: ['purring','playing','looking cute'],
};

output(user);

const elButton = document.querySelector('#button');

elButton.addEventListener('click', () => {
  elButton.setAttribute('disabled','true'); // makes the button clickable only once
  console.log('you clicked me');
});
```

# Resources

- statecharts.github.io
- spectrum.chat / statecharts
- xstate.js.org / docs
