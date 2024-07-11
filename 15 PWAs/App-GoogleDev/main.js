if ('serviceWorker' in navigator) {
  console.log('browser can use a sw');
  navigator.serviceWorker.register('sw.js').then(registration => {
    console.log('registered sw',registration.scope);
  })
  .catch(error => {
    console.log('something bad happened',error);
  });
}







async function sendSWMessage(target) {
  if (target) {
    target.postMessage(msg);
  }
  else if (svcworker) {
    svcworker.postMessage(msg);
  }
  else {
    navigator.serviceWorker.controller.postMessage(msg);
  }
}
