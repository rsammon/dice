//different settings for debugging
const DEBUG = {
  //have d20 rotate so that all sides can be seen
  ROT: false,
  //log rot values to console
  ANGLELOG: false,
  //display x, y, and z axes
  AXIS: true
}

//create a dice object template
class dice {
  constructor(ANGLE) {
    this.model;
    this.texture;
    this.rotX = 0;
    this.rotY = 0;
    this.rotZ = 0;
    this.ANGLE = ANGLE;
  }
}

//initialize dice variables
let d12 = new dice(0);
let d20 = new dice(138.189685);

//dihedral angle for the different dice
const D20ANGLE = 138.189685;

//load models for use
function preload() {
  //obtained from here:
  //https://commons.wikimedia.org/wiki/File:Dodecahedron.stl
  d12 = loadModel("assets/Dodecahedron.stl", true);
  //obtained from here:
  //https://commons.wikimedia.org/wiki/File:Regular_icosahedron.stl
  d20.model = loadModel("assets/Regular_icosahedron.stl", true);
  //obtained from here:
  //https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg
  d20.texture = loadImage("");
}

function setup() {
  //create canvas w/ webgl so that 3d can be used
  createCanvas(400, 400, WEBGL);
}

function draw() {
  //translate(0, 0, 200);
  //fill("red");

  background(220);
  
  //change angle mode to degreese
  angleMode(DEGREES);
  
  //draw the d20
  push();

  //rotate down half of the exterior dihedral angle to the main face
  rotateX((d20.ANGLE)/2);
  //rotate left by the dihedral angle to the left face

  if (DEBUG.ROT){
  //rotate the d20
  rotateX(d20.rotX);
  d20.rotX+=1;
  rotateY(d20.rotY);
  d20.rotY+=1;
  rotateZ(d20.rotZ);
  d20.rotZ+=1;
  }
  
  //log the rot angle measures to the console
  if (DEBUG.ANGLELOG){
    console.log(d20.rotX + ', ' + d20.rotY + ', ' + d20.rotZ);
  }

if (DEBUG.AXIS){
  //draw lines for axes
  push();
  strokeWeight(5);

  //z axis
  stroke("blue");
  line(0, 400, 0, 0, -400, 0);

  //x axis
  stroke("red");
  line(400, 0, 0, -400, 0, 0);

  //y axis
  stroke("green");
  line(0, 0, 400, 0, 0, -400);

  pop();
}

  //render d20 model
  normalMaterial();
  model(d20.model);

  pop();
}