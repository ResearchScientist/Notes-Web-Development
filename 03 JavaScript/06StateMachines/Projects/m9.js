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
