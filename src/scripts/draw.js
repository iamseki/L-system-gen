// DRAWING STUFF:
let x, y; // the current position of the realtime drawing
let currentangle = 0; // which way the realtime drawing is pointing
let step = 6; // how much the line moves with each 'F'
//let angle = 25; // how much the turtle turns with a '-' or '
let angle = 22.5;
let isTimeToDraw = false;
// Declaring P5js canvas globally
let cnv;

// LINDENMAYER STUFF (L-SYSTEMS)
let thestring = 'F'; // "axiom" or start of the string

// How many generations of the alphabet we have
let generations = 5;
let rules = new Map();

rules.set('F', 'FF+[+F-F-F]-[-F+F+F]');

let whereinstring = 0; // where in the L-system are we?


// first thing that p5js do before starts draw() function
function setup() {
  const parentDiv = document.getElementById('container').getBoundingClientRect()
  cnv = createCanvas(parentDiv.width, parentDiv.height);
  cnv.parent('container');
  cnv.background(255);

  stroke(0, 0, 0, 255);

  // start the x and y position at lower-left corner
  x = width / 2;
  y = height - height / 2;

  // COMPUTE THE L-SYSTEM
  for (let i = 0; i < generations; i++) {
    thestring = lindenmayer(thestring);
  }
  console.log(thestring);
  console.log(thestring.length);
  //saveStrings(test, 'lindenmayerSequence', 'txt');
  drawTree(thestring);
  //resetMatrix();
  // translate(width / 2, height);
}

function draw() {
  if (isTimeToDraw) {
    drawRealTime(thestring[whereinstring]);
    // increment the point for where we're reading the string.
    // wrap around at the end.
    whereinstring++;
    if (whereinstring > thestring.length - 1) {
      whereinstring = 0;
      // console.log('Real time chegou ao fim');
      noLoop();
    }
  }
}

function drawTree(outputstring) {
  resetMatrix();
  translate(width / 2, height);

  for (let letter of outputstring) {
    if (letter == 'F') {
      line(0, 0, 0, -step);
      let r = random(128, 255);
      let g = random(100, 217);
      let b = random(0, 50);
      let a = random(80, 100);

      // pick a gaussian (D&D) distribution for the radius:
      let radius = 0;
      radius += random(0, 8);
      radius += random(0, 8);
      radius += random(0, 8);
      radius = radius / 3;

      // draw the stuff:
      fill(r, g, b, a);

      //console.log(x, y);
      ellipse(0, -step, radius, radius);
      translate(0, -step);
    } else if (letter == '+') {
      rotate(radians(angle));
    } else if (letter == '-') {
      rotate(radians(-angle));
    } else if (letter == '[') {
      push();
    } else if (letter == ']') {
      pop();
    }
  }
}

// this is a custom function that draws realtime commands
function drawRealTime(k) {
  if (x + step * cos(radians(currentangle)) > width - 10) k = '-';
  else if (x + step * cos(radians(currentangle)) <= 10) k = '-';
  else if (y + step * sin(radians(currentangle)) > height - 10) k = '-';
  else if (y + step * sin(radians(currentangle)) <= 10) k = '-';

  if (k == 'F') {
    // draw forward
    // polar to cartesian based on step and currentangle:
    let x1 = x + step * cos(radians(currentangle));
    let y1 = y + step * sin(radians(currentangle));
    line(x, y, x1, y1); // connect the old and the new

    // update the realtime position:
    x = x1;
    y = y1;
  } else if (k == '+') {
    currentangle += angle; // turn left
  } else if (k == '-') {
    currentangle -= angle; // turn right
  }

  // give me some random color values:
  let r = random(128, 255);
  let g = random(0, 192);
  let b = random(0, 50);
  let a = random(50, 100);

  // pick a gaussian (D&D) distribution for the radius:
  let radius = 0;
  radius += random(0, 15);
  radius += random(0, 15);
  radius += random(0, 15);
  radius = radius / 3;

  // draw the stuff:
  fill(r, g, b, a);

  //console.log(x, y);
  ellipse(x, y, radius, radius);
}
