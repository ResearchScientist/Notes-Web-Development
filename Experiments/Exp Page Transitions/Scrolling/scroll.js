function scrollappear() {
  var slideIn = document.querySelector('.slideOut');
  var introPosition = slideIn.getBoundingClientRect().top;
  //console.log(introPosition);
  var screenPosition = window.innerHeight / 2.5; // calculate based on full page height
  if(introPosition < screenPosition) {
    slideIn.classList.add('slideIn');
    //console.log('im sliding');
  }
}

window.addEventListener('scroll',scrollappear);
// decide when to remove event listeners


function bgChanger() {
  var pages = document.querySelector('.pageodd');
  if(this.scrollY > this.innerHeight / 5) {
    pages.classList.add("bg-active");
    console.log('works');
  } else {
    pages.classList.remove("bg-active");
  }
}

window.addEventListener('scroll',bgChanger);