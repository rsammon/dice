let d12;
let d20;
function preload() {
  //obtained from here: 
  //https://commons.wikimedia.org/wiki/File:Dodecahedron.stl
  d12 = loadModel(
    "assets/Dodecahedron.stl",
    true
  );
  //obtained from here: 
  //https://commons.wikimedia.org/wiki/File:Regular_icosahedron.stl
  d20 = loadModel("assets/Ico");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  //test!
}

function draw() {
  background(220);
  //translate(0, 0, 200);
  fill("red");
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  //model(d12);
}
