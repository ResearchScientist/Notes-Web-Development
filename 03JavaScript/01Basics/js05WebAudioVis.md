# Web Audio

Firefox has a web audio debugger found in settings. Useful for visualizing nodes.

**Elements**

`<audio>` add attribute `crossorigin="anonymous"` if source file is on a different domain

AudioContext

**Properties**

`sampleRate`
`currentTime` 
`destination`

**Nodes**

`.createGain()` volume
`.createStereoPanner()` balance
`.createBiquadFilter()` frequency , detune , Q , lowpass , highpass , peaking
`.createDynamicsCompressor()` make louder,richer,fuller sound , prevents clipping

`.connect()` connect one node to another

`ctx = window.AudioContext || window.webkitAudioContext;` set up context
`someAudioCTX = new ctx();` new context
`someAudioCTX.createMediaElementSource(someAudioObject);` to set up nodes

**Simple Music Player**
```html
<!--html-->
<section>
  <audio id="microStream" src="butternow.mp3" controls="true"></audio>
  <label for="gainSlider">Gain</label>
  <input id="gainSlider" type="range" min="0" max="1" step="0.1" value="1"/>
</section>
```

```javascript
// javascript
var ctx = window.AudioContext || window.webkitAudioContext;
var audioContext;
var microstream;
var gainSlider;
var gainNode;

window.onload = streamit;

function streamit() {
  audioContext = new ctx();
  microsource = document.querySelector('#microStream');
  gainSlider = document.querySelector('#gainSlider');
  buildAudioGraph();
  gainSlider.oninput = function(e) {
    gainNode.gain.value = e.target.value;
  };
};

function buildAudioGraph() {
  var gainMediaElementSource = audioContext.createMediaElementSource(microsource);
  gainNode = audioContext.createGain();
  gainMediaElementSource.connect(gainNode);
  gainNode.connect(audioContext.destination);
}
```

**EQ**

```html
<!--html-->
<section>
    <audio id="microStream" src="butternow.mp3" controls="true"></audio>
  </section>
    
  <section id="eq">
    <div class="control">
      <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;60Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,0);"/>
      <output id="gain0">0 dB</output>
    </div>
    <div class="control">
      <label>&nbsp;&nbsp;&nbsp;&nbsp;170Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,1);"/>
      <output id="gain1">0 dB</output>
    </div>
    <div class="control">
      <label>&nbsp;&nbsp;&nbsp;&nbsp;350Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,2);"/>
      <output id="gain2">0 dB</output>
    </div>
    <div class="control">
      <label>&nbsp;&nbsp;1000Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,3);"/>
      <output id="gain3">0 dB</output>
    </div>
    <div class="control">
      <label>&nbsp;&nbsp;3500Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,4);"/>
      <output id="gain4">0 dB</output>
    </div>
    <div class="control">
      <label>10000Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,5);"/>
      <output id="gain5">0 dB</output>
    </div>
</section>
```

```css
/*css*/
body {background: rgb(50,50,50);}
h1 {color: rgb(250,250,250);}
p {color: rgb(240,240,240);}

#eq {
  width: 250px;
  padding: 10px;
  border-radius: 10px;
  background: rgb(100,100,100);
}
```

```javascript
// javascript
var ctx = window.AudioContext || window.webkitAudioContext;
var audioContext;

window.onload = streamit;

function streamit() {
  audioContext = new ctx();
  microsource = document.querySelector('#microStream');
  sourceNode = audioContext.createMediaElementSource(microsource);
  buildEq();
};

function buildEq() {
  filters = [];
  [60,170,350,1000,3500,10000].forEach(function(freq,i) {
    var eq = audioContext.createBiquadFilter();
    eq.frequency.value = freq;
    eq.type = "peaking";
    eq.gain.value = 0;
    filters.push(eq);
  });
  sourceNode.connect(filters[0]);
  for(var i = 0;i < filters.length - 1; i++) {
    filters[i].connect(filters[i+1]);
  }
  filters[filters.length - 1].connect(audioContext.destination);
}

function changeGain(sliderVal,nbFilter) {
  var value = parseFloat(sliderVal);
  filters[nbFilter].gain.value = value;
  var output = document.querySelector("#gain"+nbFilter);
  output.value = value + " dB";
}
```

**Waveform**

`.getByteTimeDomainData()` returns waveform data

```html
<!--html-->
<section>
  <audio id="microStream" src="butternow.mp3" controls="true"></audio>
</section>
   
<canvas id="visualizerCanvas" width="270px" height="100px"></canvas>
```
```css
/*css*/
body {background: rgb(50,50,50);}
h1 {color: rgb(250,250,250);}
p {color: rgb(240,240,240);}

#visualizerCanvas {
  background: black;
  margin-bottom: 2px;
}
```
```javascript
// javascript
var ctx = window.AudioContext || window.webkitAudioContext;
var audioContext;
var canvasContext;

window.onload = streamit;

function streamit() {
  audioContext = new ctx();
  canvas = document.querySelector('#visualizerCanvas');
  width = canvas.width;
  height = canvas.height;
  canvasContext = canvas.getContext('2d');
  buildAudioGraph();
  requestAnimationFrame(visualize);
  
  buildEq();
  /*microsource = document.querySelector('#microStream');
  sourceNode = audioContext.createMediaElementSource(microsource);*/
};

function buildAudioGraph() {
  var mediaElement = document.querySelector('#microStream');
  var sourceNode = audioContext.createMediaElementSource(mediaElement);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 1024; // precision
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  sourceNode.connect(analyser);
  analyser.connect(audioContext.destination);
}

function visualize() { // waveform animation
  canvasContext.fillStyle = 'rgba(0,0,0,0.5)'; // clear canvas with blur
  canvasContext.fillRect(0,0,width,height);
  analyser.getByteTimeDomainData(dataArray); // analyser data
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = 'orange';
  canvasContext.beginPath();
  var sliceWidth = width / bufferLength;
  var x = 0;
  for(var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 255; // values between 0 and 255 become normalized between 0 and 1
    var y = v * height;
    if(i === 0) {
      canvasContext.moveTo(x,y);
    } else {
      canvasContext.lineTo(x,y);
    }
    x += sliceWidth;
  }
  canvasContext.lineTo(canvas.width,canvas.height/2);
  canvasContext.stroke();
  requestAnimationFrame(visualize);
}

function buildEq() {
  filters = [];
  [60,170,350,1000,3500,10000].forEach(function(freq,i) {
    var eq = audioContext.createBiquadFilter();
    eq.frequency.value = freq;
    eq.type = "peaking";
    eq.gain.value = 0;
    filters.push(eq);
  });
  sourceNode.connect(filters[0]);
  for(var i = 0;i < filters.length - 1; i++) {
    filters[i].connect(filters[i+1]);
  }
  filters[filters.length - 1].connect(audioContext.destination);
}

function changeGain(sliderVal,nbFilter) {
  var value = parseFloat(sliderVal);
  filters[nbFilter].gain.value = value;
  var output = document.querySelector("#gain"+nbFilter);
  output.value = value + " dB";
}
```

**Waveform & EQ**

```html
<!--html-->
<section>
    <audio id="microStream" src="butternow.mp3" controls="true"></audio>
  </section>
    
  <canvas id="visualizerCanvas" width="270px" height="100px"></canvas>
    
  <section id="eq">
    <div class="control">
      <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;60Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,0);"/>
      <output id="gain0">0 dB</output>
    </div>
    <div class="control">
      <label>&nbsp;&nbsp;&nbsp;&nbsp;170Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,1);"/>
      <output id="gain1">0 dB</output>
    </div>
    <div class="control">
      <label>&nbsp;&nbsp;&nbsp;&nbsp;350Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,2);"/>
      <output id="gain2">0 dB</output>
    </div>
    <div class="control">
      <label>&nbsp;&nbsp;1000Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,3);"/>
      <output id="gain3">0 dB</output>
    </div>
    <div class="control">
      <label>&nbsp;&nbsp;3500Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,4);"/>
      <output id="gain4">0 dB</output>
    </div>
    <div class="control">
      <label>10000Hz</label>
      <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,5);"/>
      <output id="gain5">0 dB</output>
    </div>
</section>
```
```css
/*css*/
body {background: rgb(50,50,50);}
h1 {color: rgb(250,250,250);}
p {color: rgb(240,240,240);}

#visualizerCanvas {
  background: black;
  margin-bottom: 2px;
}

#eq {
  width: 250px;
  padding: 10px;
  border-radius: 10px;
  background: rgb(100,100,100);
}
```
```javascript
// javascript
var audioCtx = window.AudioContext || window.webkitAudioContext;
var audioContext;
var canvasContext;
var filters = [];
var canvas;
var analyser;
var width;
var height;
var dataArray;
var bufferLength;

window.onload = streamit;

function streamit() {
  audioContext = new audioCtx();
  canvas = document.querySelector('#visualizerCanvas');
  width = canvas.width;
  height = canvas.height;
  canvasContext = canvas.getContext('2d');
  buildAudioGraph();
  requestAnimationFrame(visualize);
};

function buildAudioGraph() {
  var mediaElement = document.querySelector('#microStream');
  mediaElement.onplay = (e) => {audioContext.resume();}
  mediaElement.addEventListener('play',() => audioContext.resume());
  sourceNode = audioContext.createMediaElementSource(mediaElement);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 1024; // precision
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  buildEq();
  analyser.connect(audioContext.destination);
}

function visualize() { // waveform animation
  canvasContext.fillStyle = 'rgba(0,0,0,0.5)'; // clear canvas with blur
  canvasContext.fillRect(0,0,width,height);
  analyser.getByteTimeDomainData(dataArray); // analyser data
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = 'orange';
  canvasContext.beginPath();
  var sliceWidth = width / bufferLength;
  var x = 0;
  for(var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 255; // values between 0 and 255 become normalized between 0 and 1
    var y = v * height;
    if(i === 0) {
      canvasContext.moveTo(x,y);
    } else {
      canvasContext.lineTo(x,y);
    }
    x += sliceWidth;
  }
  canvasContext.lineTo(canvas.width,canvas.height/2);
  canvasContext.stroke();
  requestAnimationFrame(visualize);
}

function buildEq() {
  filters = [];
  [60,170,350,1000,3500,10000].forEach(function(freq,i) {
    var eq = audioContext.createBiquadFilter();
    eq.frequency.value = freq;
    eq.type = "peaking";
    eq.gain.value = 0;
    filters.push(eq);
  });
  sourceNode.connect(filters[0]);
  for(var i = 0;i < filters.length - 1; i++) {
    filters[i].connect(filters[i+1]);
  }
  filters[filters.length - 1].connect(analyser);
}

function changeGain(sliderVal,nbFilter) {
  var value = parseFloat(sliderVal);
  filters[nbFilter].gain.value = value;
  var output = document.querySelector("#gain"+nbFilter);
  output.value = value + " dB";
}
```

**Frequency**

Number of bars is equal to `fftSize` / 2.
Bar frequency is equal to sample rate / `fftSize`.

`.getByteFrequencyData()` returns frequency data for bar graphs

```javascript
var audioCtx = window.AudioContext || window.webkitAudioContext;
var audioContext;
var canvasContext;
var filters = [];
var canvas;
var analyser;
var width;
var height;
var dataArray;
var bufferLength;

window.onload = streamit;

function streamit() {
  audioContext = new audioCtx();
  canvas = document.querySelector('#visualizerCanvas');
  width = canvas.width;
  height = canvas.height;
  canvasContext = canvas.getContext('2d');
  buildAudioGraph();
  requestAnimationFrame(visualize);
};

function buildAudioGraph() {
  var mediaElement = document.querySelector('#microStream');
  mediaElement.onplay = (e) => {audioContext.resume();}
  mediaElement.addEventListener('play',() => audioContext.resume());
  sourceNode = audioContext.createMediaElementSource(mediaElement);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256; // precision
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  buildEq();
  analyser.connect(audioContext.destination);
}

function visualize() { // frequency animation
  canvasContext.clearRect(0,0,width,height);
  analyser.getByteFrequencyData(dataArray); // analyser data
  var barWidth = width / bufferLength;
  var barHeight;
  var x = 0;
  heightScale = height / 128;
  
  for(var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i]; // values between 0 and 255 become normalized between 0 and 1
    canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'; // red bars
    barHeight *= heightScale; // scale from 0-255 to 0-height
    canvasContext.fillRect(x,height-barHeight/2,barWidth,barHeight/2);
    x += barWidth + 1; // distance between bars 1px
  }
  canvasContext.lineTo(canvas.width,canvas.height/2);
  canvasContext.stroke();
  requestAnimationFrame(visualize);
}

function buildEq() {
  filters = [];
  [60,170,350,1000,3500,10000].forEach(function(freq,i) {
    var eq = audioContext.createBiquadFilter();
    eq.frequency.value = freq;
    eq.type = "peaking";
    eq.gain.value = 0;
    filters.push(eq);
  });
  sourceNode.connect(filters[0]);
  for(var i = 0;i < filters.length - 1; i++) {
    filters[i].connect(filters[i+1]);
  }
  filters[filters.length - 1].connect(analyser);
}

function changeGain(sliderVal,nbFilter) {
  var value = parseFloat(sliderVal);
  filters[nbFilter].gain.value = value;
  var output = document.querySelector("#gain"+nbFilter);
  output.value = value + " dB";
}
```

**Waveform Frequency EQ Main Volume**

```html
<!--html-->
<section>
  <audio id="microStream" src="butternow.mp3" controls="true"></audio>
</section>

<section id="visualizers">
  <canvas id="visualizer1Canvas" width="270px" height="100px"></canvas>
  <canvas id="visualizerCanvas" width="270px" height="100px"></canvas>
</section>

<section id="eq">
  <div class="control">
    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;60Hz</label>
    <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,0);"/>
    <output id="gain0">0 dB</output>
  </div>
  <div class="control">
    <label>&nbsp;&nbsp;&nbsp;&nbsp;170Hz</label>
    <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,1);"/>
    <output id="gain1">0 dB</output>
  </div>
  <div class="control">
    <label>&nbsp;&nbsp;&nbsp;&nbsp;350Hz</label>
    <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,2);"/>
    <output id="gain2">0 dB</output>
  </div>
  <div class="control">
    <label>&nbsp;&nbsp;1000Hz</label>
    <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,3);"/>
    <output id="gain3">0 dB</output>
  </div>
  <div class="control">
    <label>&nbsp;&nbsp;3500Hz</label>
    <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,4);"/>
    <output id="gain4">0 dB</output>
  </div>
  <div class="control">
    <label>10000Hz</label>
    <input type="range" value="0" step="1" min="-30" max="30" oninput="changeGain(this.value,5);"/>
    <output id="gain5">0 dB</output>
  </div>
</section>
    
<section id="masterVolume">
  <label>Master Volume</label>
  <input type="range" value="10" step="0.1" min="0" max="10" oninput="changeMasterGain(this.value);"/>
  <output id="masterGainOutput">10</output>
</section>
```
```css
/*css*/
body {background: rgb(50,50,50);}
h1 {color: rgb(250,250,250);}
p {color: rgb(240,240,240);}

#visualizers {
  display: grid;
}

#visualizer1Canvas {
  background: black;
  margin-bottom: 1px;
}

#visualizerCanvas {
  background: black;
  margin-bottom: 8px;
}

#eq,#masterVolume {
  width: 250px;
  padding: 10px;
  border-radius: 10px;
  background: rgb(100,100,100);
}

#masterVolume {
  margin-top: 5px;
  font-size: 12px;
}
```
```javascript
// javascript
var audioCtx = window.AudioContext || window.webkitAudioContext;
var audioContext;
var canvasContext;
var filters = [];
var canvas;
var analyser;
var width;
var height;
var dataArray;
var bufferLength;

window.onload = streamit;

function streamit() {
  audioContext = new audioCtx();
  canvas = document.querySelector('#visualizerCanvas');
  width = canvas.width;
  height = canvas.height;
  canvasContext = canvas.getContext('2d');
  buildAudioGraph();
  requestAnimationFrame(visualize);
  requestAnimationFrame(visualize2);
};

function buildAudioGraph() {
  var mediaElement = document.querySelector('#microStream');
  mediaElement.onplay = (e) => {audioContext.resume();}
  mediaElement.addEventListener('play',() => audioContext.resume());
  sourceNode = audioContext.createMediaElementSource(mediaElement);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256; // precision
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  buildEq();
  masterGain = audioContext.createGain(); // main volume
  masterGain.value = 1;
  analyser.connect(masterGain);  // connect nodes
  masterGain.connect(audioContext.destination); // connect to final output
}

function visualize2() { // waveform animation
  canvasContext.fillStyle = 'rgba(0,0,0,0.5)'; // clear canvas with blur
  canvasContext.fillRect(0,0,width,height);
  analyser.getByteTimeDomainData(dataArray); // analyser data
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = 'orange';
  canvasContext.beginPath();
  var sliceWidth = width / bufferLength;
  var x = 0;
  for(var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 255; // values between 0 and 255 become normalized between 0 and 1
    var y = v * height;
    if(i === 0) {
      canvasContext.moveTo(x,y);
    } else {
      canvasContext.lineTo(x,y);
    }
    x += sliceWidth;
  }
  canvasContext.lineTo(canvas.width,canvas.height/2);
  canvasContext.stroke();
  requestAnimationFrame(visualize2);
}

function visualize() { // frequency animation
  canvasContext.clearRect(0,0,width,height);
  analyser.getByteFrequencyData(dataArray); // analyser data
  var barWidth = width / bufferLength;
  var barHeight;
  var x = 0;
  heightScale = height / 128;
  
  for(var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i]; // values between 0 and 255 become normalized between 0 and 1
    canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'; // red bars
    barHeight *= heightScale; // scale from 0-255 to 0-height
    canvasContext.fillRect(x,height-barHeight/2,barWidth,barHeight/2);
    x += barWidth + 1; // distance between bars 1px
  }
  canvasContext.lineTo(canvas.width,canvas.height/2);
  canvasContext.stroke();
  requestAnimationFrame(visualize);
}

function buildEq() {
  filters = [];
  [60,170,350,1000,3500,10000].forEach(function(freq,i) {
    var eq = audioContext.createBiquadFilter();
    eq.frequency.value = freq;
    eq.type = "peaking";
    eq.gain.value = 0;
    filters.push(eq);
  });
  sourceNode.connect(filters[0]);
  for(var i = 0;i < filters.length - 1; i++) {
    filters[i].connect(filters[i+1]);
  }
  filters[filters.length - 1].connect(analyser);
}

function changeGain(sliderVal,nbFilter) {
  var value = parseFloat(sliderVal);
  filters[nbFilter].gain.value = value;
  var output = document.querySelector("#gain"+nbFilter);
  output.value = value + " dB";
}
var masterGain;

function changeMasterGain(sliderVal) {
  var value = parseFloat(sliderVal);
  masterGain.gain.value = value/10;
  var output = document.querySelector('#masterGainOutput');
  output.value = value;
}
```
