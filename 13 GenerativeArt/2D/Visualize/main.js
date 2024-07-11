const canvas = document.querySelector('#myCanvas');

canvas.width = 400;
canvas.height = 400;


const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.fillRect(10,10,100,100);



// makes array of 20 random numbers
const count = 20;
const randoms = Array.from(new Array(count)).map(() => Math.random());

console.log(randoms);

// makes array of 20 random numbers in order between 0 and 1
const count1 = 20;
const values1 = Array.from(new Array(count1)).map((_,i) => {
  const t = i / (count1 -1);
  console.log(t);
  return t;
});

// same as above but handles error if count is 1 or less
const count2 = 20;
const values2 = Array.from(new Array(count2)).map((_,i) => {
  const t = count2 <= 1 ? 0 : (i / (count2 -1));
  console.log(t);
  return t;
});

// makes a grid
const count5 = 5;
const points = [];
for (let x = 0; x < count5; x++) {
  for (let y = 0; y < count5; y++) {
    const u = count5 <= 1 ? 0.5 : (x / (count5 - 1));
    const v = count5 <= 1 ? 0.5 : (y / (count5 - 1));
    points.push([u,v]);
  }
}

console.log(points);

// 2d unit vector
const normal = [Math.cos(angle),Math.sin(angle)];

// looping motion -1 to 1
const motionSpeed = 0.5;
const v = Math.sin(time * motionSpeed);


