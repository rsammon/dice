let d12;
function preload(){
  //obtained from here: https://commons.wikimedia.org/wiki/File:Dodecahedron.stl
  d12 = loadModel("diceModels/Dodecahedron.obj", true);
}

function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(220);
  //translate(0, 0, 200);
  fill('red');
  rotateX(frameCount * 0.01);
  //rotateY(frameCount * 0.01);
  model(d12);
}