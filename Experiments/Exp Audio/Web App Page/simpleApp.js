window.addEventListener('load', () => {
  const sounds = document.querySelectorAll(".sound");
  const pads = document.querySelectorAll(".pads div");
  const visual = document.querySelector(".visual");
  const colors = ["#990000","#d36060","#000055","#60d394","#005500"];
  pads.forEach((pad,index) => {
    pad.addEventListener('click',function() {
      sounds[index].currentTime = 0; /*forces current played sound to stop when any button is clicked*/
      sounds[index].play();
      createBubbles(index);
    });
  });
  const createBubbles = (index) => {
    const bubble = document.createElement("div");
    visual.appendChild(bubble);
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = 'jump 1s ease';
    bubble.addEventListener('animationend',function() { /*use this to increas performance,it removes the div when animation is done*/
      visual.removeChild(this);
    });
  };
});