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

// state machine

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

console.log(transition('pending','RESOLVE'));

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

const elBox = document.querySelector('#box');
