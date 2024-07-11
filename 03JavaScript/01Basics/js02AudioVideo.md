# Video

`<video>` element for embedding video

**Attributes**
`width`
`height`
`controls` displays default controls, if omitted you can define your own buttons
`src` video source
`poster` image to use as thumbnail
`preload` good to always set this to none


**Methods**
`play()`
`pause()`
`load()`
`canPlayType()`

**Properties**
`duration`
`paused`
`muted`
`volume`
`error`
`height`
`width`

**Events**
`play`
`pause`
`progress`
`waiting`
`error`

```html
<!--embed directly via html-->
<video width="200" height="150" controls>
  <source src="someVid.mp4" type="video/mp4"/>  // give other sources and types
</video>
```
```javascript
// embed dinamically via javascript
var video = document.createElement('video');
video.src = 'someVid.mp4';
video.controls = true;
document.body.appendChild(video);
```
**Video Controls**

Custom video controls
```html
<!--html-->
<section id="videoContainer">
  <video id="vid" width="640" height="360">
    <source src="bouncyball.mp4" type="video/mp4"/>  // give other sources and types
  </video>
  <div id="vidButtons">
    <button id="playB" onclick="playVideo();">
      <div id="rtriangle"></div>
    </button>
    <button id="pauseB" onclick="pauseVideo();">||</button>
    <button id="rewindB" onclick="rewindVideo();">
      <div id="ltriangle"></div>
    </button>
    <button id="minus10B" aria-label="rewind" onclick="minus10Video();">- 0.5</button>
  </div>
</section>
```
```css
/*css*/
#videoContainer {
    width: 640px;
    height: 360px;
    margin: 0 auto;
}

#videoContainer #vidButtons {
    width: 640px;
    margin-left: 10px;
    margin-top: -40px;
}

#videoContainer button {
    height: 25px;
    width: 50px;
    margin-right: 20px;
    background: rgba(250,180,60,0.5);
    cursor: pointer;
    
}

#rtriangle {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 10px solid black;
    border-bottom: 5px solid transparent;
    margin-left: 18px;
}

#ltriangle {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 10px solid black;
    border-bottom: 5px solid transparent;
    margin-left: 16px;
}

#playB {
    margin-top: -5px;
}

#pauseB,#minus10B {
    font-weight: bold;
}
```
```javascript
var vid = document.querySelector("#vid");

function playVideo() {
    vid.play();
}

function pauseVideo() {
    vid.pause();
}

function rewindVideo() {
    vid.currentTime = 0;
}

function minus10Video() {
    vid.currentTime -= 0.5;
    vid.pause();
}
```

**Simple Auto Play Videos From List**

```html
<!--html-->
<body onload="init();">
  <video id="myVideo" controls></video>
</body>
```

```javascript
// javascript
var myVideo;
var currentVideo = 0;
var sources = ["https:vidlocation1.mp4,https:vid2location.mp4,https:vid3location.mp4"];
function loadNextVideo() {
    myVideo.src = sources[currentVideo % sources.length] // loops through 0 and length of list
    myVideo.load();
    currentVideo++;
}
function loadAndPlayNextVideo() {
    console.log("playing video" + sources[currentVideo % sources.length])
    loadNextVideo();
    myVideoPlay();
}
function init() {
    myVideo = document.querySelector("myVideo");
    myVideo.addEventListener('ended',loadAndPlayNextVideo,false);
    loadNextVideo();
}

```

**Centering Video to % of ViewPort**

```html
<!--html-->
<video id="responsiveVideo" width="200" height="150" controls preload="none">
  <!--<source src="someVid.mp4" type="video/mp4"/>-->
</video>
```

```css
/*css*/
#responsiveVideo {
    width: 98vw;
    height: 98vh;
    object-fit: cover;
    object-position: center center;
}
```

**Webcam**

`getUserMedia` asks for access to devices such as webcam and microphone

```html
<!--html-->
<section id="theWebCam">
  <video width:200 height: 200 id="theWebVideo" controls autoplay></video>
</section>
```
```javascript
// javascript
function minus10Video() {
    vid.currentTime -= 0.5;
    vid.pause();
}

window.onload = init;
function init() {
    navigator.mediaDevices.getUserMedia({audio:true,video:true})
    .then(function(stream) {
        var webVideo = document.querySelector("#theWebVideo");
        webVideo.src = URL.createObjectURL(stream);
        webVideo.play();
    })
    .catch(function(err) {
        alert("oops" + err)
    });
}
```

**Start Stop Webcam**

```html
<!--html-->
<section id="webCamSection">
  <video id="webVideo" width=200 height=200 controls>no web video</video>
  <button onclick="startWebcam();">Start Webcam</button>
  <button onclick="stopWebcam();">Stop Webcam</button>
</section>
```
```javascript
// javascript
let webcamStream;

function startWebcam() {
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then((stream) => {
        let video = document.querySelector('#webVideo');
        video.srcObject = stream; // stores video object stream as variable stream
        video.play();
        webcamStream = stream;  // stream saved as a global variable webcamStream so other functions can use it
    }).catch((error) => {
        console.log('navigator.getUserMedia error',error);
    });
}

function stopWebcam() {
    webcamStream.getTracks()[0].stop(); // audio
    webcamStream.getTracks()[1].stop(); // video
}
```
**Front or Rear Camera on Mobile**

Setting Constraints
```
var front = false;

document.getElementById('flipButton').onclick = function() {
  front = !front;
};

// toggle between front and back
constraints = {video: {facingMode: (front? "user":"environment")}};

// preference for front camera
constraints = {audio: true,video: {facingMode: "user"}}

// required to use rear camera
constraints = {audio: true,video: {facingMode: {exact: "environment"}}}
```

**Supposed to Record but missing items**
```javascript
var options = {mimeType: 'video/webm; codecs=vp9'};
mediaRecorder = new MediaRecorder(stream,options);

var recordedChunks = [];
mediaRecorder.ondataavailable = handleDataAvailable;
mediaRecorder.start();

function handleDataAvailable(event) {
    if (event.data.size > 0) {
        recordedChunks.push(event.data);
    } else {
        // something
    }
}

mediaRecorder.stop();

function play() {
    var superBuffer = new Blob(recordedChunks);
    videoElement.src = window.URL.createObjectURL(superBuffer);
}

function download() {
    var blob = new Blob(recordedChunks, {
        type: 'video/webm'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    docmunent.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'test.webm';
    a.click();
    window.URL.revokeObjectURL(url);
}
```

# Audio

_Web Audio API_ not an element but an API for generating sounds in the browser with JS

`<audio>` element for embedding an audio player for streamed audio

**Attributes**

`controls`
`loop` replay when end is reached
`preload="none"` best practice is to set preload to none for mobile

```html
<audio controls="controls">
  <source src="someClip.mp3" type="audio/mp3"/>
</audio>
```
**Libraries**
howler.js
sound.js