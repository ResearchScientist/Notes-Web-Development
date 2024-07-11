const elBox = document.querySelector('#box');

// switch between inactive and active based on click

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

// set initial state

let currentState = machine.initial; // initial state is inactive

// pure function that returns next state based on current state and event

function transition(state,event) {
  const nextState = machine.states[state].on[event] || state; // if no event then returns state
  return nextState;
}

// finds next current state

function send(event) {
  currentState = transition(currentState,event);
  console.log(currentState);
  elBox.dataset.state = currentState;
}

elBox.addEventListener('click',() => {
  send('CLICK');
});