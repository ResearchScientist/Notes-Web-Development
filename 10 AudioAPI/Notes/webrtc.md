# Uses

Web Real Time Communication

- can transmit any file type
- video
- audio

# Components

**Media Stream API**

- access to camera and mic

**Peer Connection API**

- connect audio video streams

**Data Channel API**

- P2P real time data transfer

# Make Player

JS
```js
// make player
let myPlayer = document.createElement('audio');

// specify codec
if (myPlayer.canPlayType('audio/mpeg')) {
  myPlayer.setAttribute('src','https://website.com/some.mp3');
}

// specify codec
if (myPlayer.canPlayType('video/mp4')) {
  myPlayer.setAttribute('src','https://webiste.com/something.mp4');
}

myPlayer.play();
alert("play");

myPlayer.pause();
alert("paused");
```

html
```html
<audio controls>
  <source src="song.mp3" type="audio/mp3">
</audio>

<video controls width="200" height="100">
  <source src="song.mp4" type="video/mp4">
</video>
```

# Seek

Returns playable time ranges for media.
Useful for displaying what has been downloaded and is available for scrubbing.

JS obtain media downloaded data.
```js
// currently seeking
let isSeeking = myPlayer.seeking;

// can media be seeked
let isSeekable = myPlayer.seekable;

// returns seekable time range in ms
let seekRange = myPlayer.seekable.end();
```
