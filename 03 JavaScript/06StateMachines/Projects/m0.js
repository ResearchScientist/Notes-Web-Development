const elBox = document.querySelector('#box');

const machine = {
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        CLICK: 'active'
      },
    },
    active: {
      on: {
        CLICK: 'inactive'
      },
    },
  },
};

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