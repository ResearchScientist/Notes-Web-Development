const { interpret, createMachine } = XState;

const elBox = document.querySelector('#box');

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

// listen to state transitions

const service = interpret(machine);

service.onTransition(state => {
  console.log(state.value);
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
