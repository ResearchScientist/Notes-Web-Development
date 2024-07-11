const { Machine, actions, createMachine } = XState;

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
