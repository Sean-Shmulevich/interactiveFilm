let video;

let img;
let smallPoint, largePoint;

function preload() {
  img = loadImage('assets/Chernobyl.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pointillize = 7; // increase the pointillize factor
  imageMode(CENTER);
  noStroke();
  background(255);
  startTime = millis(); // record start time
  img.loadPixels();

  getDarker = false; // flag to indicate whether to darken the dot color
    
  dotSize = 0; // initial dot size
}

//first the dots are dawn and after 10 seconds they start to get larger until 20 seconds
//after 20 seconds they start to get smaller again but also darker; for 4 seconds until 24 seconds
//1000 dots are drawn each frame of the draw function loop
//after 24 seconds the loop is broken out of into the next sketch

function draw() {
  let elapsedTime = millis() - startTime; // calculate elapsed time

  //the opacity of the dot is determined by the mouseX position
  let opacity = map(mouseX, 0, width, 10, 255);

  if (elapsedTime > 10000 && elapsedTime < 20000 && dotSize <= 30) { // after 10 seconds
    dotSize += 0.1; // gradually increase the dot size
  }
  else if (elapsedTime > 20000 && elapsedTime < 24000){
    dotSize -= 0.2;
    getDarker = true;
  }

  let dotsPerFrame = 1000; // generate a larger number of dots in each frame
  for (let i = 0; i < dotsPerFrame; i++) {

    if (elapsedTime >= 24000){
      //remove the sketch
      //break out of the loop early and go to the next sketch.
      remove();
      window.location = "faces.html"; 
    }

    let x = floor(random(img.width));
    let y = floor(random(img.height));
    //150 is the image offset to show more of the bottom of the image
    let pix = img.get(x, y+85);
    //determined based off mouse position
    pix[3] = opacity;
    if(getDarker){
      pix[0] *= 0.2;
      pix[1] *= 0.2;
      pix[2] *= 0.2;
    }
    fill(pix, 10);
    ellipse(x, y, pointillize+dotSize, pointillize+dotSize);
  }
}
