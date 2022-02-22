//initialize dice variables
let d12;
let d20;

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

let i = 0;
function draw() {
  background(220);
  //translate(0, 0, 200);
  //fill("red");
  normalMaterial();
  
  if ( i<138.189685 ) {
  rotateY(1);
  i+=1;
}
  model(d20);
}
