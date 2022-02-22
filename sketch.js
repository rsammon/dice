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

//let i = 0;
function draw() {
  //translate(0, 0, 200);
  //fill("red");

  for (let i = 0; i < 138.189685; i += frameCount * 0.001) {
    background(220);
    push();
    rotateY(frameCount * 0.001);
    normalMaterial();
    model(d20);
    pop();
  }
}
