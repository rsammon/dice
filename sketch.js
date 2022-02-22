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
}

function setup() {
  //create canvas w/ webgl so that 3d can be used
  createCanvas(400, 400, WEBGL);
  //noLoop();
}

function smoothRotate(angle, speed) {
  if (!speed) {
    speed = 1;
  }
}

function draw() {
  //translate(0, 0, 200);
  //fill("red");

  background(220);

  //draw the d20
  push();

  //rotate down half of the exterior dihedral angle to the main face
  rotateX((360 - d20.ANGLE) / 2);
  //rotate left by the dihedral angle to the left face

  function keyPressed() {
    if (keyCode == LEFT_ARROW) {
      rotateY(d20.ANGLE);
    }
    console.log('keyPressed');
  }

  //rotate the d20
  /*
  rotateX(d20.rotX);
  d20.rotX+=0.01;
  rotateY(d20.rotY);
  d20.rotY+=0.01;
  rotateZ(d20.rotZ);
  d20.rotZ+=0.01;
  */

  //draw lines for axis
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

  //render d20 model
  normalMaterial();
  model(d20.model);

  pop();
}
