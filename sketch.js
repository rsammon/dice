//different settings for debugging
const DEBUG = {
  //have d20 rotate so that all sides can be seen
  ROT: false,
  //log rot values to console
  ANGLELOG: false,
  //display x, y, and z axes
  AXIS: true,
};

let RATIO;

//create a dice object template
class dice {
  constructor(ANGLE) {
    this.model;
    this.txtr;
    this.rotX = 0;
    this.rotY = 0;
    this.rotZ = 0;
    this.ANGLE = ANGLE;
    this.vrt = [];
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
  d20.txtr = loadImage("assets/cat.jpg");
}

function setup() {
  //create canvas w/ webgl so that 3d can be used
  createCanvas(500, 500, WEBGL);
  RATIO = (1 + sqrt(5)) / 2;

  //assign the verticies of the d20
  //verticies from here: https://en.wikipedia.org/wiki/Regular_icosahedron#Cartesian_coordinates
  d20.vrt = [
    0,
    1,
    RATIO,
    0,
    -1,
    RATIO,
    0,
    1,
    -RATIO,
    0,
    -1,
    -RATIO,

    1,
    RATIO,
    0,
    -1,
    RATIO,
    0,
    1,
    -RATIO,
    0,
    -1,
    -RATIO,
    0,

    RATIO,
    0,
    1,
    RATIO,
    0,
    -1,
    -RATIO,
    0,
    1,
    -RATIO,
    0,
    -1,
  ];
}

function draw() {
  //translate(0, 0, 200);
  //fill("red");

  background(230);

  //change angle mode to degreese
  angleMode(DEGREES);

  //draw the d20
  push();

  //rotate down half of the exterior dihedral angle to the main face
  //rotateX(d20.ANGLE / 2);

  if (DEBUG.ROT) {
    //rotate the d20
    rotateX(d20.rotX);
    d20.rotX += 1;
    rotateY(d20.rotY);
    d20.rotY += 1;
    rotateZ(d20.rotZ);
    d20.rotZ += 1;
  }

  //log the rot angle measures to the console
  if (DEBUG.ANGLELOG) {
    console.log(d20.rotX + ", " + d20.rotY + ", " + d20.rotZ);
  }

  if (DEBUG.AXIS) {
    //draw lines for axes
    push();
    strokeWeight(5);

    //y axis
    stroke("green");
    line(0, 400, 0, 0, -400, 0);

    //x axis
    stroke("red");
    line(400, 0, 0, -400, 0, 0);

    //z axis
    stroke("blue");
    line(0, 0, 400, 0, 0, -400);

    pop();
  }

  debugMode();

  //render the d20 with different triangles so that each one can display a different texture
  stroke("black");
  scale(100);
  //normalMaterial();

  let tries = [];
  
  //for every vertex
  for (let i = 0; i < d20.vrt.length; i += 3) {
    
    //check if every vertex
    for (let test = 0; test < d20.vrt.length; test += 3) {
      beginShape(TRIANGLE_STRIP);
      
      //has a vertex a distance of 2 away from itself
      if (
        sqrt(
          pow(d20.vrt[i] - d20.vrt[test], 2) +
            pow(d20.vrt[i + 1] - d20.vrt[test + 1], 2) +
            pow(d20.vrt[i + 2] - d20.vrt[test + 2], 2)) ==
            2 ) {
        
        
          
        
        //and has another vertex a distance of 2 away from itself
        for (let test2 = 0; test2 < d20.vrt.length; test2 += 3) {
      if (
        sqrt(
          pow(d20.vrt[i] - d20.vrt[test2], 2) +
            pow(d20.vrt[i + 1] - d20.vrt[test2 + 1], 2) +
            pow(d20.vrt[i + 2] - d20.vrt[test2 + 2], 2)) ==
            2 && sqrt(pow(d20.vrt[test] - d20.vrt[test2], 2) +
            pow(d20.vrt[test + 1] - d20.vrt[test2 + 1], 2) +
            pow(d20.vrt[test + 2] - d20.vrt[test2 + 2], 2)) == 2) {
        
        let draw = true;
        //and that triangle hasn't already been drawn
        for (let check = 0; check < tries.length; check++){
        if (tries[check]=i){
        if ( 
          (check % 3 == 0 &&
            (tries[check + 1] == test ||
              test2 ||
              tries[check + 2] == test ||
              test2)) ||
          (check % 3 == 1 &&
            (tries[check - 1] == test ||
              test2 ||
              tries[check + 1] == test ||
              test2)) ||
          (check % 3 == 2 &&
            (tries[check - 2] == test ||
              test2 ||
              tries[check - 1] == test ||
              test2))
        ) {
          draw = false;
          console.log(draw);
          }

      }
        }
          if (draw){
          //if so, create a triangle that is a face of the icosahedron
          vertex(d20.vrt[i], d20.vrt[i+1], d20.vrt[i+2], 0, 0);
        vertex(d20.vrt[test], d20.vrt[test+1], d20.vrt[test+2], 1, 0);
        vertex(d20.vrt[test2], d20.vrt[test2+1], d20.vrt[test2+2], 0.5, 1);
          tries.push(i);
          tries.push(test);
          tries.push(test2);
          }
       
        }
        }
      
    }
      endShape(CLOSE);
    }
      
    
  }

  pop();
  orbitControl();
}
