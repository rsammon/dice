let d12;
function preload() {
  //obtained from here: https://commons.wikimedia.org/wiki/File:Dodecahedron.stl
  d12 = loadModel(
    "https://cdn.glitch.global/480fbbe9-66ac-4d90-a58e-7af20abfde25/Dodecahedron.stl?v=1645507143156",
    true
  );
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
  //rotateY(frameCount * 0.01);
  model(d12);
}
