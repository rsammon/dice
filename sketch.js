//different settings for debugging
const DEBUG = {
  //have d20 rotate so that all sides can be seen
  ROT: false,
  //log rot values to console
  ANGLELOG: false,
  //display x, y, and z axes
  AXIS: false,
  //log details when drawing faces of d20
  DRAWLOG: false,
  //orbit mode and debug mode
  //more info here: https://p5js.org/reference/#/p5/orbitControl
  //and here: https://p5js.org/reference/#/p5/debugMode
  ORBIT: true,
};

let RATIO;

//create a dice object template
class dice {
  constructor(ANGLE, SIDES) {
    this.txtr = [];
    this.SIDES = SIDES;
    this.rotX = 0;
    this.rotY = 0;
    this.rotZ = 0;
    this.ANGLE = ANGLE;
    this.vrt = [];
  }
}

//initialize dice variables
let d12 = new dice(0);
let d20 = new dice(138.189685, 20);


//load models for use
function preload() {
  
  //obtained from here:
  //https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg
  //d20.txtr = loadImage("assets/cat.jpg");
}

function setup() {
  //create canvas w/ webgl so that 3d can be used
  createCanvas(500, 500, WEBGL);
  RATIO = (1 + sqrt(5)) / 2;
  
  //create different graphics for each side with different numbers
  //some more information about this code
  //https://p5js.org/reference/#/p5/createGraphics
  for (let i = 0; i < d20.SIDES; i++){
    push();
    rectMode(CENTER);
    d20.txtr[i]  = createGraphics(500, 500);
    d20.txtr[i].background('#19809b');
    d20.txtr[i].stroke('#9b3419');
    d20.txtr[i].textSize(30);
    d20.txtr[i].textFont("times-new-roman-bold-italic");
    d20.txtr[i].text(i+1, d20.txtr[i].width/2, d20.txtr[i].height/2+40);
    pop();
  }

  //assign the verticies of the d20
  //verticies from here: https://en.wikipedia.org/wiki/Regular_icosahedron#Cartesian_coordinates
  d20.vrt = [
    0,1,RATIO,
    0,-1,RATIO,
    0,1,-RATIO,
    0,-1,-RATIO,

    1,RATIO,0,
    -1,RATIO,0,
    1,-RATIO,0,
    -1,-RATIO,0,

    RATIO,0,1,
    RATIO,0,-1,
    -RATIO,0,1,
    -RATIO,0,-1,
  ];
  
}

//for logging things to the console without repeating every loop
let log = false;

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

  
  
  //render the d20 with different triangles so that each one can display a different texture
  //scale up the d20
  scale(100);
  
  //sets the texture mode to normal so that it can display with u v coordinates
  textureMode(NORMAL);
  
  //initialize/reset the matrix for the 
  let tries = [];
  
  let sideI = 0;
   
  //for every vertex
  for (let i = 0; i < d20.vrt.length; i += 3) {
    
    //check if every vertex
    for (let test = 0; test < d20.vrt.length; test += 3) {
      
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
          
        if (tries[check] == i){
          
        if (
          //if the vertecies index value in the tries contains all 3 in the same place, then it will not draw triangle
          //calculated using the check value minus the distance it is from the first vertex in the list plus however much it needs to move forward
           ( tries[ check-(check%3)] == test && (tries[ check-(check%3) + 1] == test2 || tries[ check-(check%3) + 2]== test2) ) ||
           ( tries[ check-(check%3) +1 ] == test && (tries[ check-(check%3)] == test2 || tries[ check-(check%3) + 2]== test2) ) ||
           ( tries[ check-(check%3) +2 ] == test && (tries[ check-(check%3)] == test2 || tries[ check-(check%3) + 1]== test2) )
          ) {
          
          
          draw = false;
          }
      }
        }
        
          if (draw){
          //if so, create a triangle that is a face of the icosahedron 
          //(The last 2 coordinates are uv coordinates (which are necessary for textures))
          //information on u v coordinates: https://stackoverflow.com/questions/3314219/how-do-u-v-coordinates-work
             texture(d20.txtr[sideI]);
            
            
          beginShape(TRIANGLE_STRIP);
        
            
          vertex(d20.vrt[i], d20.vrt[i+1], d20.vrt[i+2], 0.5, 0);
        vertex(d20.vrt[test], d20.vrt[test+1], d20.vrt[test+2], 0, 1);
        vertex(d20.vrt[test2], d20.vrt[test2+1], d20.vrt[test2+2], 1, 1);
             
          tries.push(i);
          tries.push(test);
          tries.push(test2);
          
          sideI++;
          endShape(CLOSE);
           
if (!log && DEBUG.DRAWLOG){
    console.log('face drawn!');
  console.log(sideI);
  console.log('v1:' + i + ' v2:' + test + ' v3:' + test2);
  console.log(tries);
  }         
          }}}}}}
  
  
  if (!log && DEBUG.DRAWLOG){
    console.log(tries);
  }
  

  pop();
  
  //there for helping with debugging textures etc
  if (DEBUG.ORBIT){orbitControl();debugMode();}
    
  //for logging things to the console without repeating every draw loop
  log = true;
}
