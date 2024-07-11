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















/* Microphone Stream */

/*
var microstream;
var microsource = document.querySelector('#microStream');

var ctx = window.AudioContext || window.webkitAudioContext;
var audioContext;
var gainSlider;
var gainNode;

function streamit() {
  navigator.mediaDevices.getUserMedia ({
    audio: true
  }).then((stream) => {
    let audio = document.querySelector('#microStream');
    audio.srcObject = stream;
    audio.play();
    microstream = stream;
  }).catch((error) => {
    console.log('something went wrong',error);
  });
  audioContext = new ctx();
  gainSlider = document.querySelector('#gainSlider');
  buildAudioGraph();
  gainSlider.oninput = function(e) {
    gainNode.gain.value = e.target.value;
  }
}


function buildAudioGraph() {
  var gainMediaElementSource = audioContext.createMediaElementSource(microsource);
  gainNode = audioContext.createGain();
  gainMediaElementSource.connect(gainNode);
  gainNode.connect(audioContext.destination);
}
*/

