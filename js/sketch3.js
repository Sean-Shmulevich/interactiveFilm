// Audio Reactive Program

// Clap in your hand or make sounds to create new particules. (Push)
// Right click to delete the last created particule. (Splice)


var balls = []; // Particules array
var mic; // Microphone library


function setup() {
    createCanvas(windowWidth-800, windowHeight-300);

    mic = new p5.AudioIn();
    mic.start(); // Load the library 

    for (i = 0; i < 0; i++) {
        balls[i] = new ball();
    } // create balls array

}


function mousePressed() {

    //balls.push(new ball(random(0, width), height)); // Add a new ball object
    balls.splice(balls.length - 1, 1); // Delete the last ball object

}

function draw() {

    background(0, 0, 0, 10);

    var vol = mic.getLevel();
    if (vol > 0.1) {
        balls.push(new ball(random(0, width), height));
    } // Create new ball object when the audio threshold level is crossed

    var r = map(mouseY, 0, height, 0, 255);
    var g = map(mouseX, 0, width, 0, 255);
    var b = map(mouseY, 0, height, 0, 255);
    fill(r, g, 255 - b);
    stroke(r, g, 255 - b); // Color according to mouse position

    for (i = 0; i < balls.length; i++) {
        balls[i].display();
        balls[i].move();
    } // incrementation 

}


function ball(X, Y) { // ball object

    this.x = random(0, width);
    this.y = height;

    this.display = function () {

        line(this.x, this.y, mouseX, mouseY);
        ellipse(this.x, this.y, 20, 20);
    }
    this.move = function () {
        this.x = this.x + random(-0.5, 0.5);
        this.y = this.y - 1;
        if (this.y > 0) {
            this.y = this.y - 1;
        } else {
            this.y = height;
        }
    }

}

function getLocalStream() {
    navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
            window.localStream = stream; // A
            window.localAudio.srcObject = stream; // B
            window.localAudio.autoplay = true; // C
        })
        .catch((err) => {
            console.error(`you got an error: ${err}`);
        });
}
