# Node Based API

- modules for routing
- spatial sound scape
- convolution engine
- dynamic
- low latency
- visualizer
- real time domain and frequency analysis

# Custom Audio Player

html
```html
<audio id="my-audio">
  <source src="song.mp3" type="audio/mp3">
</audio>

<a id="play" href="#">play</a>
<a id="pause" href="#">pause</a>
```

JS
```js
window.onload = function() {
  // get elements
  let myPlayer = document.getElementById('my-audio');
  let play = document.getElementById('play');
  let pause = document.getElementById('pause');
  
  // custom controls
  play.onclick = playAudio;
  pause.onclick = pauseAudio;
  
  function playAudio() {
    myAudio.play();
  }
  function pauseAudio() {
    myAudio.pause();
  }
}
```

# Progress Bar

html
```html
<div id="bar-played">00</div>
<div id="bar-buffered">00</div>
<div id="bar-control">
  
  <a href="0">00</a>
  <a href="10">10</a>
  <a href="20">20</a>
  <a href="30">30</a>
  <a href="40">40</a>
  <a href="50">50</a>
  <a href="60">60</a>
  <a href="70">70</a>
  <a href="80">80</a>
  <a href="90">90</a>
</div>
```

js
```js
window.onload = function() {
  // get elements
  let myPlayer = document.getElementById('my-audio');
  let controlBar = document.getElementById('bar-control');
  
  // add listeners
  myPlayer.addEventListener('timeupdate',updatePlayed,false);
  myPlayer.addEventListener('progress',updateBuffered,false);
  
  function updatePlayed() {
    let played = parseInt(((myPlayer.currentTime / myPlayer.duration) * 100),10);
    addBars(played,'bar-played');
  }
  function updateBuffered() {
    let loaded = parseInt(((myPlayer.buffered.end(0) / myPlayer.) * 100),10);
    addBars(loaded,'bar-buffered');
  }
  function addBars(amount,element) {
    let bars = "00";
    for (i=10;i<100;i=i+10) {
      if (i <= amount) {
        bars = bars + " " + i;
      }
    }
    let bar = document.getElementById(element);
    bar.innerHTML = bars;
  }
}

controlBar.onclick = setTime;

function setTime(e) {
  var playPosition = e.target.getAttribute('href')
  myPlayer.currentTime = (myPlayer.duration * playPosition) /  100;
  myPlayer.play();
  return false;
}
```

# Playlist

html
```html
<!-- this method only works if JS is enabled , use a better method -->
<ul id="tracklist">
  <li class="playlist">
    <a class="playlist-item" href="sample-1">sample 1</a>
  </li>
  <li class="playlist">
    <a class="playlist-item" href="sample-2">sample 2</a>
  </li>
</ul>
```

js
```js
let playlistItems = document.getElementByClassName('playlist');
let playlist = document.getElementByClassName('playlist');
let currentTrack = "";

for (i=0; i<playlistItems.length; i++) {
  playlistItems[i].onclick = playTrackHandler;
}

function playTrackHandler() {
  let src = this.Attribute('href');
  currentTrack = src;
  playTrack(src);
  return(false);
}

function playTrack(id) {
  var src = "";
  if (myPlayer.canPlayType('audio/mp4; codecs="mp4a.40"')) {
    src = "https/mp3s/" + id + ".mp3";
  }
  else if (myPlayer.canPlayType('audio/wav; codecs="mp4a.40"')) {
    src = "https/mp3s/" + id + ".wav";
  }
  myPlayer.setAttribute('src',src);
  myPlayer.play();
}

let shuffleButton = document.getElementById('shuffle');
shuffleButton.onclick = shufflePlaylist;

function shuffle(els) {
  let array = Array.prototype.slice.call(els,0);
  return array.sort(function() {
    return .5 - Math.random();
  });
}

myPlayer.addEventListener('ended',function() {
  for (i=0; i< playlistItems.length; i++) {
    if (playlistItems[i].getAttribute('href') == currentTrack) // not sure if complete
      if (i < (playlistItems.length - 1)) {
        playTrack(playlistItems[i+1].getAttribute('href'));
      }
    else {
      playTrack(playlistItems[0].getAttribute('href'));
    }
  }
})
```
