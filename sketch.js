//initialize dice variables
let d12;
let d20;

//dihedral angle for the different dice
const D20ANGLE = 138.189685;

//load models for use
function preload() {
  //obtained from here:
  //https://commons.wikimedia.org/wiki/File:Dodecahedron.stl
  d12 = loadModel("assets/Dodecahedron.stl", true);
  //obtained from here:
  //https://commons.wikimedia.org/wiki/File:Regular_icosahedron.stl
  d20 = loadModel("assets/Regular_icosahedron.stl", true);
}

function setup() {
  //create canvas w/ webgl so that 3d can be used
  createCanvas(400, 400, WEBGL);
  //noLoop();
}

function smoothRotate(angle, speed) {
  if (!speed){speed=1;}
  
}

function draw() {
  //translate(0, 0, 200);
  //fill("red");
  
  background(220);

  //draw the d20
  push();
  
  //rotate down half of the exterior dihedral angle to the main face
  rotateX((360-D20ANGLE)/2);
  //rotate left by the dihedral angle to the left face
  rotateY(D20ANGLE);
  
  //draw lines for axis
  push();
  
  translate(width/2, height/2, 0);
  strokeWeight(10);
  stroke(51);
  line(0, 400, 0, 0 -400, 0);
  
  pop();
  
  normalMaterial();
  model(d20);
  pop();
}
