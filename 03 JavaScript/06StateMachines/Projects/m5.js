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