/*
  Data and machine learning for artistic practice
  Week 3
  
  Facial detection on an image
  
  
  Goal:
  - To complete the game you simply have to choose who you think is being scanned
  
  
  
  
*/

let faceapi,
  detections,
  beginScan = false, //when true detections will be drawn on screen 
  choiceNum, //stores users choice
  person_selected, //stores which person is used for the detector
  img, //stores image
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9;

// these are our options for detecting faces, provided by ml5.js
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
};

function preload() {
  // load image
  //the images are the last 9 persidents for the USA
  img = loadImage("assets/images/46.jpg");
  img2 = loadImage("assets/images/45.jpg");
  img3 = loadImage("assets/images/44.jpg");
  img4 = loadImage("assets/images/43.jpg");
  img5 = loadImage("assets/images/42.jpg");
  img6 = loadImage("assets/images/41.jpg");
  img7 = loadImage("assets/images/40.jpg");
  img8 = loadImage("assets/images/39.jpg");
  img9 = loadImage("assets/images/38.jpg");
  font = loadFont("assets/font/PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(845, 630);
  textFont(font);
  // load the faceapi model - with modelReady() callback
  faceapi = ml5.faceApi(detection_options, modelReady);
  
  //picks a number between and the number chosen is the person selected
  person_selected = int(random(1, 10));
  choiceNum = 0;

}

function draw() {
  background(0);
  
  //selects which person is being detected
  selector(1);
  
  //draws a white square to cover the image that is being detected
  push();
  fill(255);
  rect(0, 0, 200, 200);
  pop();

  if (beginScan) {
    // if we have detections, draw them on the image
    if (detections) {
      drawBox(detections);
      drawLandmarks(detections);
    }
  }

  //loads the right side images 
  loadImages();
  //loads the UI
  UI();
  //allows the user to select their guess
  user_choice();
  //draws the end screen
  endScreen();
}

// callback for when ml5.js has loaded the model
function modelReady() {
  console.log("Model is ready...");

  // ask ml5 to detect a single face in this image - gotResults() callback
  //faceapi.detectSingle(img, gotResults);
  
  //selects the image that is being detected
  selector(2);
}

// ml5.js has determined if there's a face
function gotResults(err, result) {
  // check if ml5.js returned an error - if so print to console and stop
  if (err) {
    console.log(err);
    return;
  }

  // if it gets here we are okay, so store results in the detections variable, this is an OBJECT of detections - see the console
  console.log(result);
  detections = result;
}

// *** Draw our elements on the image, a box and face feature locations ***
function drawBox(detections) {
  const alignedRect = detections.alignedRect;
  const { _x, _y, _width, _height } = alignedRect._box;

  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);
  rect(_x, _y, _width, _height);
}

function drawLandmarks(detections) {
  /* 
      In this example we use forEach(), this is a quick way of looping through the objects in an array. It will in this case return each value in the array sequentially as the local variable "item".
      
      In this case, it's equivilent of doing this:
      for (let i=0; i<detections.parts.mouth.length; i++) {
        let item = detections.parts.mouth.length[i];
        
        //...
      }
      
      or 
      
      for (let item in detections.parts.mouth.length) {
        //...
      }
    */

  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);

  push();
  // mouth
  beginShape();
  detections.parts.mouth.forEach((item) => {
    vertex(item._x, item._y);
  });
  endShape(CLOSE);

  // nose
  beginShape();
  detections.parts.nose.forEach((item) => {
    vertex(item._x, item._y);
  });
  endShape(CLOSE);

  // left eye
  beginShape();
  detections.parts.leftEye.forEach((item) => {
    vertex(item._x, item._y);
  });
  endShape(CLOSE);

  // right eye
  beginShape();
  detections.parts.rightEye.forEach((item) => {
    vertex(item._x, item._y);
  });
  endShape(CLOSE);

  // right eyebrow
  beginShape();
  detections.parts.rightEyeBrow.forEach((item) => {
    vertex(item._x, item._y);
  });
  endShape();

  // left eye
  beginShape();
  detections.parts.leftEyeBrow.forEach((item) => {
    vertex(item._x, item._y);
  });
  endShape();

  pop();
}

function mousePressed() {
  //begins the scan once the mouse is pressed
  if (!beginScan) {
    beginScan = true;
  }
}


//this function is used to draw the UI
function UI() {
  push();
  fill(255);
  stroke(0);
  textSize(11);
  if (!beginScan) 
    text("Click Here to Begin!", 5, 220, 200);

  
  if (beginScan) {  
      text("Guess Who? ", 5, 220, 210);
  }
  pop();
}

//
function selector(input)
{
  //places the selected image at the top left and resizes it
  if (input == 1){
    
    
    if(person_selected == 1){
        img.resize(200, 200);
        image(img, 0, 0);
    }
  
    if(person_selected == 2){
        img2.resize(200, 200);
        image(img2, 0, 0);
    }
  
   if(person_selected == 3){
        img3.resize(200, 200);
        image(img3, 0, 0);
    }
    
    if(person_selected == 4){
        img4.resize(200, 200);
        image(img4, 0, 0);
    }
    
    if(person_selected == 5){
        img5.resize(200, 200);
        image(img5, 0, 0);
    }
    
    if(person_selected == 6){
        img6.resize(200, 200);
        image(img6, 0, 0);
    }
    
    if(person_selected == 7){
        img7.resize(200, 200);
        image(img7, 0, 0);
    }
    
    if(person_selected == 8){
        img8.resize(200, 200);
        image(img8, 0, 0);
    }
    
    if(person_selected == 9){
        img9.resize(200, 200);
        image(img9, 0, 0);
    }
    
    
    
  }
  
  //selects the image thats being used to detect
  if (input == 2)
  {
    
    
    faceapi.detectSingle(img, gotResults);
    
     if(person_selected == 1){
        faceapi.detectSingle(img, gotResults);
     }
    
     if(person_selected == 2){
       faceapi.detectSingle(img2, gotResults);
     }
    
     if(person_selected == 3){
       faceapi.detectSingle(img3, gotResults);
     }
    
     if(person_selected == 4){
       faceapi.detectSingle(img4, gotResults);
     }
    
     if(person_selected == 5){
       faceapi.detectSingle(img5, gotResults);
     }
    
     if(person_selected == 6){
       faceapi.detectSingle(img6, gotResults);
     }
    
     if(person_selected == 7){
       faceapi.detectSingle(img7, gotResults);
     }
    
     if(person_selected == 8){
       faceapi.detectSingle(img8, gotResults);
     }
    
     if(person_selected == 9){
       faceapi.detectSingle(img9, gotResults);
     }
    
    
    
  }

  
}

//places the images on the right hand side
function loadImages()
{
  image(img, 215, 0, 200, 200);
  image(img2, 430, 0, 200, 200);
  image(img3, 645, 0, 200, 200);
  image(img4, 215, 215, 200, 200);
  image(img5, 430, 215, 200, 200);
  image(img6, 645, 215, 200, 200);
  image(img7, 215, 430, 200, 200);
  image(img8, 430, 430, 200, 200);
  image(img9, 645, 430, 200, 200);
}

//function allows the user to select an image on the right hand side
function user_choice()
{
  
  const iWidth = 200,
        iHeight = 200,
        x1 = 215,
        x2 = 430,
        x3 = 645,
        y1 = 0,
        y2 = 215,
        y3 = 430;
  
 
  //checks if the mouse position is over img
   if (mouseX >= x1 &&
    mouseX <= x1 + iWidth &&
    mouseY >= y1 &&
    mouseY <= y1 + iHeight ) 
  {
    push();
    stroke(255,0,0);
    strokeWeight(5);
    rect(x1,y1,iWidth,iHeight);
    pop();
    
    if (mouseIsPressed) {
      choiceNum = 1;
    }
    
    
  }
  
   //checks if the mouse position is over img2
   if (mouseX >= x2 &&
    mouseX <= x2 + iWidth &&
    mouseY >= y1 &&
    mouseY <= y1 + iHeight ) 
  {
    push();
    stroke(255,0,0);
    strokeWeight(5);
    rect(x2,y1,iWidth,iHeight);
    pop();
    
    if (mouseIsPressed) {
      choiceNum = 2;
    }
    
  }
  
   //checks if the mouse position is over img3
   if (mouseX >= x3 &&
    mouseX <= x3 + iWidth &&
    mouseY >= y1 &&
    mouseY <= y1 + iHeight ) 
  {
    push();
    stroke(255,0,0);
    strokeWeight(5);
    rect(x3,y1,iWidth,iHeight);
    pop();
    
    if (mouseIsPressed) {
      choiceNum = 3;
    }
    
  }
  
   //checks if the mouse position is over img4
  if (mouseX >= x1 &&
    mouseX <= x1 + iWidth &&
    mouseY >= y2 &&
    mouseY <= y2 + iHeight ) 
  {
    push();
    stroke(255,0,0);
    strokeWeight(5);
    rect(x1,y2,iWidth,iHeight);
    pop();
    
    if (mouseIsPressed) {
      choiceNum = 4;
    }
    
  }
  
   //checks if the mouse position is over img5
  if (mouseX >= x2 &&
    mouseX <= x2 + iWidth &&
    mouseY >= y2 &&
    mouseY <= y2 + iHeight ) 
  {
    push();
    stroke(255,0,0);
    strokeWeight(5);
    rect(x2,y2,iWidth,iHeight);
    pop();
    
    if (mouseIsPressed) {
      choiceNum = 5;
    }
    
  }
  
   //checks if the mouse position is over img6
  if (mouseX >= x3 &&
    mouseX <= x3 + iWidth &&
    mouseY >= y2 &&
    mouseY <= y2 + iHeight ) 
  {
    push();
    stroke(255,0,0);
    strokeWeight(5);
    rect(x3,y2,iWidth,iHeight);
    pop();
    
    if (mouseIsPressed) {
      choiceNum = 6;
    }
    
  }
  
  
     //checks if the mouse position is over img7
  if (mouseX >= x1 &&
    mouseX <= x1 + iWidth &&
    mouseY >= y3 &&
    mouseY <= y3 + iHeight ) 
  {
    push();
    stroke(255,0,0);
    strokeWeight(5);
    rect(x1,y3,iWidth,iHeight);
    pop();
    
    if (mouseIsPressed) {
      choiceNum = 7;
    }
    
  }
  
   //checks if the mouse position is over img8
  if (mouseX >= x2 &&
    mouseX <= x2 + iWidth &&
    mouseY >= y3 &&
    mouseY <= y3 + iHeight ) 
  {
    push();
    stroke(255,0,0);
    strokeWeight(5);
    rect(x2,y3,iWidth,iHeight);
    pop();
    
    if (mouseIsPressed) {
      choiceNum = 8;
    }
    
  }
  
   //checks if the mouse position is over img9
  if (mouseX >= x3 &&
    mouseX <= x3 + iWidth &&
    mouseY >= y3 &&
    mouseY <= y3 + iHeight ) 
  {
    push();
    stroke(255,0,0);
    strokeWeight(5);
    rect(x3,y3,iWidth,iHeight);
    pop();
    
    if (mouseIsPressed) {
      choiceNum = 9;
    }
    
  }
  
}

//draws the end screen
function endScreen()
{
  
  //if the users choice is not equal to the person selected draw this
  if(choiceNum != 0 && choiceNum != person_selected)
  {
    push();
    noStroke()
    fill(0);
    rect(0,0,width,height);
    fill(255,0,0)
    textSize(32)
    text("Game Over", width/3,height/2-25);
    text("Refresh to try again!", width/10,height/2+25);
    noFill();
    pop();
  }
  
  //if the users choice is equal to the person selected draw this
  if(choiceNum != 0 && choiceNum == person_selected)
  {
    push();
    noStroke()
    fill(0);
    rect(0,0,width,height);
    fill(0,255,0)
    textSize(32)
    text("You Won!", width/3,height/2-25);
    text("Refresh to try again!", width/10,height/2+25);
    noFill();
    pop();
  }
  
  
}
