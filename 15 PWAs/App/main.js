// REGISTER SW

if ('serviceWorker' in navigator) {
  console.log('browser can use a sw');
  navigator.serviceWorker.register('sw.js').then(registration => {
    console.log('registered sw',registration);
  })
  .catch(error => {
    console.log('something bad happened',error);
  });
}







//if ('serviceWorker' in navigator) {
//  window.addEventListener('load',() => {
//    navigator.serviceWorker.register('sw.js')
//    .then(reg => {
//      console.log('registered',reg);
//    }).catch(err => {
//      console.log('registration failed',err);
//    });
//  });
//}
