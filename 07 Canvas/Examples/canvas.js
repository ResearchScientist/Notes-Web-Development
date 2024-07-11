window.onload = () => {
  draw();
};

function draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    ctx.fillRect(50,50,100,100);
    ctx.clearRect(75,75,50,50);
    ctx.strokeRect(80,80,40,40);
    ctx.beginPath();
    ctx.moveTo(100,110);
    ctx.lineTo(110,120);
    ctx.lineTo(90,120);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(100,95,10,0,Math.PI*2,true);
    ctx.moveTo(98,92);
    ctx.arc(96,92,2,0,Math.PI*2,true);
    ctx.moveTo(106,92);
    ctx.arc(104,92,2,0,Math.PI*2,true);
    ctx.moveTo(105,97);
    ctx.arc(100,97,5,0,Math.PI,false);
    ctx.stroke();
}
