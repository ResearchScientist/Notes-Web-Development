# Install

Two options available for using xstate.

- if using node then install with npm
- if using html,css,js then link to xstate.js file

**Node**

In node use npm to install.

node
```bash
npm instal xstate
```

**JS**

In html add link.

html
```html
<script src="https://unpkg.com/xstate@4/dist/xstate.js"></script>
```

# Access Xstate

Write either of these as the first line of the js file.

**If Using Node**

main.js
```js
import { createMachine,interpret } from 'xstate'
```

**If Using HTML,CSS,JS**

main.js
```js
const { Machine, actions, interpret, createMachine } = XState;
```

# Make Machine 1

Click an element to change its state between active and inactive.

> example files: m1.html , m1.css , m1.js

main.js
```js
const { createMachine } = XState;

const elBox = document.querySelector('#box');

const machine = createMachine({
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        CLICK: 'active',
      },
    },
    active: {
      on: {
        CLICK: 'inactive',
      },
    },
  },
});

let currentState = machine.initial;

function send(event) {
  currentState = machine.transition(currentState,event);
  elBox.dataset.state = currentState.value;
  console.log(currentState);
}

elBox.addEventListener('click',() => {
  send('CLICK');
});
```

# Make Machine 2

Hold an element to make it active , release to make it inactive.

> example files: m2.html , m2.css , m2.js

main.js
```js
const { createMachine, interpret } = XState;

const elBox = document.querySelector('#box');

// set up states

const machine = createMachine({
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        mousedown: 'active',
      },
    },
    active: {
      on: {
        mouseup: 'inactive',
      },
    },
  },
});

// set up interpreter

const service = interpret(machine);

service.onTransition(state => {
  // log state to console
  console.log(state.value);
  // display state on box
  elBox.dataset.state = state.value;
});

service.start();

elBox.addEventListener('mousedown',(event) => {
  service.send({
    type: 'mousedown'
  })
});

elBox.addEventListener('mouseup',(event) => {
  service.send({
    type: 'mouseup'
  })
});
```

# Make Machine 3

Click within an element and display its clicked position.

> example files: m3.html , m3.css , m3.js

main.js
```js
const { createMachine, interpret } = XState;

const elBox = document.querySelector('#box');

const setPoint = (context,event) => {
  elBox.dataset.point = `(${event.clientX},${event.clientY})`;
};

const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        mousedown: {
          target: 'dragging',
          actions: [setPoint],
        },
      },
    },
    dragging: {
      on: {
        mouseup: {
          target: 'idle',
        },
      },
    },
  },
});

const service = interpret(machine);

service.onTransition((state) => {
  console.log(state);
  elBox.dataset.state = state.value;
});

service.start();

elBox.addEventListener('mousedown',(event) => {
  service.send(event);
});

elBox.addEventListener('mouseup',(event) => {
  service.send(event);
});
```

# Make Machine 4

Make a draggable element.

> example files: m4.html , m4.css , m4.js

main.js
```js
const { createMachine, assign, interpret } = XState;

const elBox = document.querySelector('#box');
const elBody = document.body;

const assignPoint = assign({
  px: (context,event) => event.clientX,
  py: (context,event) => event.clientY,
});

const assignPosition = assign({
  x: (context,event) => {
    return context.x + context.dx;
  },
  y: (context,event) => {
    return context.y + context.dy;
  },
  dx: 0,
  dy: 0,
  px: 0,
  py: 0,
});

const assignDelta = assign({
  dx: (context,event) => {
    return event.clientX - context.px;
  },
  dy: (context,event) => {
     return event.clientY - context.py;
  },
});

const showDelta = (context) => {
  elBox.dataset.delta = `delta: ${context.dx},${context.dy}`;
};

const resetPosition = assign({
  dx: 0,
  dy: 0,
  px: 0,
  py: 0,
});

//const setPoint = (context,event) => {
//  elBox.dataset.point = `(${event.clientX},${event.clientY})`;
//};

const machine = createMachine({
  initial: 'idle',
  context: {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    px: 0,
    py: 0,
  },
  states: {
    idle: {
      on: {
        mousedown: {
          actions: assignPoint,
          target: 'dragging',
        },
      },
    },
    dragging: {
      on: {
        mousemove: {
          actions: [assignDelta,showDelta],
        },
        mouseup: {
          actions: assignPosition,
          target: 'idle',
        },
        'keyup.escape': {
          target: 'idle',
          actions: resetPosition,
        },
      },
    },
  },
});

const service = interpret(machine);

service.onTransition((state) => {
  if (state.changed) {
    console.log(state.context);
    elBox.dataset.state = state.value;
    elBox.style.setProperty('--dx',state.context.dx);
    elBox.style.setProperty('--dy',state.context.dy);
    elBox.style.setProperty('--x',state.context.x);
    elBox.style.setProperty('--y',state.context.y);
  }
});

service.start();

elBox.addEventListener('mousedown',(event) => {
  service.send(event);
});
elBox.addEventListener('mousemove',(event) => {
  service.send(event);
});
elBox.addEventListener('mouseup',(event) => {
  service.send(event);
});
elBody.addEventListener('keyup',(e) => {
  if (e.key === 'Escape') {
    service.send('keyup.escape');
  }
});
```

# Make Machine 4.5

Add a conditional transition.

> example files: m4.html , m4.css , m4.js


main.js
```js
const { createMachine, assign, interpret } = XState;

const elBox = document.querySelector('#box');
const elBody = document.body;

const assignPoint = assign({
  px: (context,event) => event.clientX,
  py: (context,event) => event.clientY,
});

const assignPosition = assign({
  x: (context,event) => {
    return context.x + context.dx;
  },
  y: (context,event) => {
    return context.y + context.dy;
  },
  dx: 0,
  dy: 0,
  px: 0,
  py: 0,
});

const assignDelta = assign({
  dx: (context,event) => {
    return event.clientX - context.px;
  },
  dy: (context,event) => {
     return event.clientY - context.py;
  },
});

const countDrags = assign({
  drags: (context) => {
    return context.drags + 1
  },
});

const showDelta = (context) => {
  elBox.dataset.delta = `delta: ${context.dx},${context.dy}`;
};

const notMaxDrags = (context,event) => {
  return context.drags < 5;
};

const resetPosition = assign({
  dx: 0,
  dy: 0,
  px: 0,
  py: 0,
});

const machine = createMachine({
  initial: 'idle',
  context: {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    px: 0,
    py: 0,
    drags: 0,
  },
  states: {
    idle: {
      on: {
        mousedown: {
          cond: notMaxDrags,
          actions: assignPoint,
          target: 'dragging',
        },
      },
    },
    dragging: {
      entry: countDrags,
      on: {
        mousemove: {
          actions: assignDelta,
        },
        mouseup: {
          actions: [assignPosition],
          target: 'idle',
        },
        'keyup.escape': {
          target: 'idle',
          actions: resetPosition,
        },
      },
    },
  },
});

const service = interpret(machine);

service.onTransition((state) => {
  if (state.changed) {
    console.log(state.context);
    elBox.dataset.state = state.value;
    elBody.dataset.drags = state.context.drags;
    elBox.style.setProperty('--dx',state.context.dx);
    elBox.style.setProperty('--dy',state.context.dy);
    elBox.style.setProperty('--x',state.context.x);
    elBox.style.setProperty('--y',state.context.y);
  }
});

service.start();

elBox.addEventListener('mousedown',(event) => {
  service.send(event);
});
elBox.addEventListener('mousemove',(event) => {
  service.send(event);
});
elBox.addEventListener('mouseup',(event) => {
  service.send(event);
});
elBody.addEventListener('keyup',(e) => {
  if (e.key === 'Escape') {
    service.send('keyup.escape');
  }
});
```

# Make Machine 5

Add a transient transition.
Make machine with an authorized user.

> example files: m5.html , m5.css , m5.js

main.js
```js
const { createMachine, assign, interpret } = XState;

const elBox = document.querySelector('#box');
const elBody = document.body;

const assignPoint = assign({
  px: (context,event) => event.clientX,
  py: (context,event) => event.clientY,
});

const assignPosition = assign({
  x: (context,event) => {
    return context.x + context.dx;
  },
  y: (context,event) => {
    return context.y + context.dy;
  },
  dx: 0,
  dy: 0,
  px: 0,
  py: 0,
});

const assignDelta = assign({
  dx: (context,event) => {
    return event.clientX - context.px;
  },
  dy: (context,event) => {
     return event.clientY - context.py;
  },
});

const resetPosition = assign({
  dx: 0,
  dy: 0,
  px: 0,
  py: 0,
});

const createDragDropMachine = (user) => createMachine({
  initial: 'idle',
  context: {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    px: 0,
    py: 0,
    user,
  },
  states: {
    checkingAuth: {
      on: {
        '': [
          {
            cond: (context,event) => {
              return !!context.user;
            },
            target: 'idle',
          },
          {
            target: 'unathorized',
          },
        ],
      },
    },
    unathorized: {},
    idle: {
      on: {
        mousedown: {
          actions: assignPoint,
          target: 'dragging',
        },
      },
    },
    dragging: {
      on: {
        mousemove: {
          actions: assignDelta,
        },
        mouseup: {
          actions: [assignPosition],
          target: 'idle',
        },
        'keyup.escape': {
          target: 'idle',
          actions: resetPosition,
        },
      },
    },
  },
});

const service = interpret(
  createDragDropMachine({name: 'cat'})
);

service.onTransition((state) => {
  elBox.dataset.state = state.value;
  if (state.changed) {
    console.log(state.context);
    
    elBox.style.setProperty('--dx',state.context.dx);
    elBox.style.setProperty('--dy',state.context.dy);
    elBox.style.setProperty('--x',state.context.x);
    elBox.style.setProperty('--y',state.context.y);
  }
});

service.start();

elBox.addEventListener('mousedown',(event) => {
  service.send(event);
});
elBox.addEventListener('mousemove',(event) => {
  service.send(event);
});
elBox.addEventListener('mouseup',(event) => {
  service.send(event);
});
elBody.addEventListener('keyup',(e) => {
  if (e.key === 'Escape') {
    service.send('keyup.escape');
  }
});
```

# Make Machine 6

Restrict movement to only drag along x axis with shift.
Make a nested state.

> example files: m6.html , m6.css , m6.js

main.js
```js
const { createMachine, assign, interpret } = XState;

const elBox = document.querySelector('#box');
const elBody = document.body;

const assignPoint = assign({
  px: (context,event) => event.clientX,
  py: (context,event) => event.clientY,
});

const assignPosition = assign({
  x: (context,event) => {
    return context.x + context.dx;
  },
  y: (context,event) => {
    return context.y + context.dy;
  },
  dx: 0,
  dy: 0,
  px: 0,
  py: 0,
});

const assignDelta = assign({
  dx: (context, event) => {
    return event.clientX - context.px;
  },
  dy: (context, event) => {
     return event.clientY - context.py;
  },
});

const assignXDelta = assign({
  dx: (context, event) => {
    return event.clientX - context.px;
  },
});

const resetPosition = assign({
  dx: 0,
  dy: 0,
  px: 0,
  py: 0,
});

const createDragDropMachine = (user) => createMachine({
  initial: 'idle',
  context: {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    px: 0,
    py: 0,
    user,
  },
  states: {
    checkingAuth: {
      on: {
        '': [
          {
            cond: (context,event) => {
              return !!context.user;
            },
            target: 'idle',
          },
          {
            target: 'unathorized',
          },
        ],
      },
    },
    unathorized: {},
    idle: {
      on: {
        mousedown: {
          actions: assignPoint,
          target: 'dragging',
        },
      },
    },
    dragging: {
      initial: 'normal',
      states: {
        normal: {
          on: {
            'keydown.shift':'locked',
          },
        },
        locked: {
          on: {
            mousemove: {
              actions: assignXDelta,
            },
            'keyup.shift': 'normal',
          },
        },
      },
      on: {
        mousemove: {
          actions: assignDelta,
          internal: false,
        },
        mouseup: {
          actions: [assignPosition],
          target: 'idle',
        },
        'keyup.escape': {
          target: 'idle',
          actions: resetPosition,
        },
      },
    },
  },
});

const service = interpret(
  createDragDropMachine({name: 'cat'})
);

service.onTransition((state) => {
  elBox.dataset.state = state.value;
  if (state.changed) {
    console.log(state.context);
    
    elBox.style.setProperty('--dx',state.context.dx);
    elBox.style.setProperty('--dy',state.context.dy);
    elBox.style.setProperty('--x',state.context.x);
    elBox.style.setProperty('--y',state.context.y);
  }
});

service.start();

elBox.addEventListener('mousedown',(event) => {
  service.send(event);
});
elBox.addEventListener('mousemove',(event) => {
  service.send(event);
});
elBox.addEventListener('mouseup',(event) => {
  service.send(event);
});
elBody.addEventListener('keyup',(e) => {
  if (e.key === 'Escape') {
    service.send('keyup.escape');
  }
});

elBody.addEventListener('keydown',(e) => {
  if (e.key === 'Shift') {
    service.send('keydown.shift');
  }
});

elBody.addEventListener('keyup',(e) => {
  if (e.key === 'Shift') {
    service.send('keyup.shift');
  }
});
```

# Make Machine 7

Switch between dark mode and light mode.
Remember last mode used.

> example files: m7.html , m7.css , m7.js

main.js
```js
const { createMachine, interpret } = XState;

const elApp = document.querySelector('#app');
const elOnButton = document.querySelector('#onButton');
const elOffButton = document.querySelector('#offButton');
const elModeButton = document.querySelector('#modeButton');

const displayMachine = createMachine({
  initial: 'hidden',
  states: {
    hidden: {
      on: {
        TURN_ON: 'visible.hist',
      },
    },
    visible: {
      initial: 'light',
      states: {
        light: {
          on: {
            SWITCH: 'dark',
          },
        },
        dark: {
          on: {
            SWITCH: 'light',
          },
        },
        hist: {
          type: 'history',
        },
      },
      on: {
        TURN_OFF: 'hidden',
      },
    },
  },
});

const displayService = interpret(displayMachine).onTransition((state) => {
  elApp.dataset.state = state.toStrings().join(' ');
}).start();

elOnButton.addEventListener('click', () => {
  displayService.send('TURN_ON');
});

elOffButton.addEventListener('click', () => {
  displayService.send('TURN_OFF');
});

elModeButton.addEventListener('click', () => {
  displayService.send('SWITCH');
});
```

# Make Machine 8

Introduce orthogonal states.

> example files: m8.html , m8.css , m8.js

main.js
```js
const { createMachine, interpret } = XState;

const elApp = document.querySelector('#app');
const elOnButton = document.querySelector('#onButton');
const elOffButton = document.querySelector('#offButton');
const elModeButton = document.querySelector('#modeButton');

const displayMachine = createMachine({
  initial: 'hidden',
  states: {
    hidden: {
      on: {
        TURN_ON: 'visible',
      },
    },
    visible: {
      type: 'parallel',
      on: {
        TURN_OFF: 'hidden',
      },
      states: {
        mode: {
          initial: 'light',
          states: {
            light: {
              on: {
                SWITCH: 'dark',
              },
            },
            dark: {
              on: {
                SWITCH: 'light',
              },
            },
          },
        },
        brightness: {
          initial: 'bright',
          states: {
            bright: {
              after: {
                TIMEOUT: 'dim',
              },
            },
            dim: {
              on: {
                SWITCH: 'bright',
              },
            },
          },
        },
      },
    },
  },
},
{
  delays: {
    TIMEOUT: 5000,
  },
 },
);

const displayService = interpret(displayMachine).onTransition((state) => {
  elApp.dataset.state = state.toStrings().join(' ');
}).start();

elOnButton.addEventListener('click', () => {
  displayService.send('TURN_ON');
});

elOffButton.addEventListener('click', () => {
  displayService.send('TURN_OFF');
});

elModeButton.addEventListener('click', () => {
  displayService.send('SWITCH');
});
```

# Make Machine 9

Make an element that when clicked it fires a fetch request. The request returns a promise that randomly generates either a success or a fail response after a short delay. Add a cancel button that cancels the request by discarding the returned response.

> example files: m9.html , m9.css , m9.js

main.js
```js
const { createMachine, assign, interpret } = XState;

const elBox = document.querySelector('#box');

const randomFetch = () => {
  return new Promise((res,rej) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        rej('fetch failed');
      }
      else {
        res('fetch succeded');
      }
    },2000);
  });
};

const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: 'pending',
      },
    },
    pending: {
      on: {                  // added for cancel button
        RESOLVE: 'resolved', // 
        CANCEL: 'idle',      //
      },                     //
      invoke: {
        src: (context,event) => {
          return randomFetch();
        },
        onDone: 'resolved',
        onError: 'rejected',
      },
    },
    resolved: {
      on: {
        FETCH: 'pending',
      },
    },
    rejected: {
      on: {
        FETCH: 'pending',
      },
    },
  },
});

const service = interpret(machine);

service.onTransition((state) => {
  elBox.dataset.state = state.toStrings().join(' ');
  console.log(state);
});

service.start();

elBox.addEventListener('click',(event) => {
  service.send('FETCH');
});

const elCancel = document.querySelector('#cancel');

elCancel.addEventListener('click',(event) => {
  service.send('CANCEL');
});
```

# Visualize Machine

xstate . js . org / viz

Copy machine function into definition tab.

Displays
- graph view
- states
- events
