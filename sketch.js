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
  ORBIT: false,
  //rotate with the keyboard
  ROTK: false,
};

let RATIO;

//variable to store face to roll to
var roll = undefined;
//speed to roll at (how many turns per total angle)
const ROLLSPEED = 150;

//variable for color picker
let diceColor;
//variable for font size
let fontSize;
//variable for font color
let fontColor;
//button for updating changes to the dices attributes
let editButton;

//create a dice object template
class dice {
  constructor(ANGLE, SIDES, FACES) {
    this.txtr = [];
    this.SIDES = SIDES;
    this.rotX = 0;
    this.rotY = 0;
    this.rotZ = 0;
    this.ANGLE = ANGLE;
    this.vrt = [];
    this.faceRots = FACES;
  }
}

//initialize dice variables
let d12 = new dice(0);
let d20 = new dice(138.189685, 20, [
  0, -20.9051575, 0, //1 angles
0, 20.9051575, 0, //2 angles
  41.810315, 0, 0, //3 angles
  41.810315, -41.810315, 0, //4 angles
  41.810315, 41.810315, 0, //5 angles
  146.3361025, 106.83194875, 125.43094500000001, //6 angles
  125.43094500000001, 159.0948425, 125.43094500000001, //7 angles
  196.50848050000002, 117.2845275, 125.43094500000001, //8 angles
  188.1464175, -20.9051575, 188.1464175, // 9 angles
  177.69383875, 20.9051575, 188.1464175, //10 angles
  229.95673250000002, -62.715472500000004, 146.3361025, //11 angles
  229.95673250000002, -41.810315, 188.1464175, //12 angles
  229.95673250000002, -41.810315, 104.5257875, //13 angles
  -292.672205, -146.3361025, 167.24126, //14 angles
  -334.48252, -125.43094500000001, 83.62063, //15 angles
  -334.48252, -125.43094500000001, 167.24126, //16 angles
  -271.7670475, -125.43094500000001, 83.62063, //17 angles
  -271.7670475, -334.48252, 292.672205, //18 angles
  -271.7670475, 418.10315, -250.86189000000002, //19 angles
  -355.3876775, -83.62063, 167.24126 //20 angles
]);







function setup() {
  //create canvas w/ webgl so that 3d can be used
  createCanvas(500, 700, WEBGL);
  RATIO = (1 + sqrt(5)) / 2;
  
  
  //COLOR MANIPULATION
  //variables
  //color picker for dice
  diceColor = createColorPicker('#19809b');
  //color picker for font
  fontColor = createColorPicker('#000000');
  //font size slider
  fontSize = createSlider(15, 75, 30, 0.5);
  //create edit button
  editButton = createButton('change!');
  
  
  
  
  //2D DRAWING!
  //create different graphics for each side with different numbers
  //some more information about this code
  //https://p5js.org/reference/#/p5/createGraphics
  for (let i = 0; i < d20.SIDES; i++){
    push();
    rectMode(CENTER);
    d20.txtr[i]  = createGraphics(512, 512);
    
    //draw the text
    d20.txtr[i].background(diceColor.color());

    d20.txtr[i].stroke(fontColor.color());
    d20.txtr[i].textSize(fontSize.value());
    d20.txtr[i].textFont("times-new-roman-bold-italic");
    d20.txtr[i].text(i+1, d20.txtr[i].width/2, d20.txtr[i].height/2+50);
    //draw a border with a traingle with a point at each uv coordinate
        d20.txtr[i].noFill();
    d20.txtr[i].triangle(d20.txtr[i].width*0.5, d20.txtr[i].height*0, d20.txtr[i].width*0, d20.txtr[i].height*1, d20.txtr[i].width*1, d20.txtr[i].height*1);
    
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
  
  
  
  //2D DRAWING
  //update textures for the dice
  editButton.mousePressed(function updateTextures(){
      for (let i = 0; i < d20.SIDES; i++){
    push();
    rectMode(CENTER);
    //draw the text
    d20.txtr[i].background(diceColor.color());

    d20.txtr[i].stroke(fontColor.color());
    d20.txtr[i].textSize(fontSize.value());
    d20.txtr[i].textFont("times-new-roman-bold-italic");
    d20.txtr[i].text(i+1, d20.txtr[i].width/2, d20.txtr[i].height/2+50);
    //draw a border with a traingle with a point at each uv coordinate
        d20.txtr[i].noFill();
    d20.txtr[i].triangle(d20.txtr[i].width*0.5, d20.txtr[i].height*0, d20.txtr[i].width*0, d20.txtr[i].height*1, d20.txtr[i].width*1, d20.txtr[i].height*1);
  
    pop();
    }
  })
  

  background(230);

  
  //change angle mode to degrees
  angleMode(DEGREES);

  
  
  //3D DRAWING
  //draw the d20
  push();
  
  translate(0, -100, 0);
  
  

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
  
  //change the rotation of the d20
  if (DEBUG.ROTK && keyIsPressed) {
    
    switch(keyCode){
        
    case RIGHT_ARROW:
        d20.rotY -= d20.ANGLE;
      case LEFT_ARROW:
        d20.rotY += d20.ANGLE;
      case UP_ARROW:
        d20.rotX -= d20.ANGLE;
      case DOWN_ARROW:
        d20.rotX += d20.ANGLE;

    
    }
    
    switch(key){
        case '.':
        d20.rotZ -= d20.ANGLE;
      case ',':
        d20.rotZ += d20.ANGLE;
    }
    
  }
  
  
  

  //log the rot angle measures to the console
  if (DEBUG.ANGLELOG && key == 'p' && keyIsPressed) {
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
  
  
  //rolling the dice
  //if the roll variable has been updated
  if (!(roll==undefined) ){
    
    //spin ROLLSPEED times to equal the variable for the side
    if (abs(d20.rotX) < abs(d20.faceRots[(roll-1)*3]) ){
      d20.rotX+=d20.faceRots[(roll-1)*3]/ROLLSPEED;
    }
    if (abs(d20.rotY) < abs(d20.faceRots[(roll-1)*3+1]) ){
      d20.rotY+=d20.faceRots[(roll-1)*3+1]/ROLLSPEED;
    }
    if (abs(d20.rotZ) < abs(d20.faceRots[(roll-1)*3+2]) ){
      d20.rotZ+=d20.faceRots[(roll-1)*3+2]/ROLLSPEED;
    }
    
  }
  
  if (!roll){
    push();
    textSize(100);
    textFont('Helvetica');
    text('hello!', 50, 50);
    pop();
  }
  
  
  //update the rotation of the d20
    rotateX(d20.rotX);
    rotateY(d20.rotY);
    rotateZ(d20.rotZ);
  
  
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
        
            
          vertex(d20.vrt[i], d20.vrt[i+1], d20.vrt[i+2], 0, 1);
        vertex(d20.vrt[test], d20.vrt[test+1], d20.vrt[test+2], 0.5, 0);
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

//check if r is pressed for rolling the dice
function keyPressed(){
    if (key == 'r'){
      d20.rotX = 0;
      d20.rotY = 0;
      d20.rotZ = 0;
      roll = floor(random(1, 21));
      console.log(roll);
      console.log(d20.faceRots[(roll-1)*3]);
       console.log(d20.faceRots[(roll-1)*3+1]);
       console.log(d20.faceRots[(roll-1)*3+2]);
      
    }
  }