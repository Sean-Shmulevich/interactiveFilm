/**
 * requires p5.js
 * try out at https://editor.p5js.org
 */

let ball = {
    x: 300,
    y: 150,
    radius: 3,
    speed: {
        x: 5,
        y: 0
    },
    draw: function () {
        circle(this.x, this.y, this.radius * 2);
    },
    reset: function () {
        this.x = width / 2;
        this.y = height / 2;
        this.speed.x = 5;
        this.speed.y = 0;
        this.play = true;
    }
};

let player1 = {
    x: 10,
    y: 150,
    radius: 30,
    reset: function () {
        this.y = height / 2;
    },
    position: function (y) {
        this.y = min(height, max(y, 0));
    },
    draw: function () {
        line(this.x, this.y - this.radius, this.x, this.y + this.radius);
    }
}

let player2 = {
    x: 590,
    y: 150,
    radius: 30,
    reset: function () {
        this.y = height / 2;
    },
    position: function (y) {
        this.y = min(height, max(y, 0));
    },
    draw: function () {
        line(this.x, this.y - this.radius, this.x, this.y + this.radius);
    }
}

function setup() {
    createCanvas(600, 300);
    stroke(255);
    strokeWeight(10);
    fill(255);

    game.reset();
}

let game = {
    over: false,
    reset: function () {
        this.over = false;
        ball.reset();
        player1.reset();
        player2.reset();
    },
    tick: function () {
        if (this.over === false) {
            // y: keep ball inside of vertical bounds
            if (ball.y < 10 || ball.y > height - 10) {
                ball.speed.y *= -1;
            }
            ball.y += ball.speed.y;

            // x: player 2
            if (ball.x + ball.radius >= player2.x) {
                ball.speed.x *= -1;
            }

            // x: player 1
            if (ball.x - ball.radius <= player1.x) {
                if (ball.y > player1.y - player1.radius &&
                    ball.y < player1.y + player1.radius) {
                    // player 1 hits the ball

                    // bounce back
                    ball.speed.x *= -1;
                    // get ball-paddle angle
                    let angle = ball.y - player1.y;
                    ball.speed.y = angle / 9;
                    ball.speed.x = map(abs(angle), 0, player1.radius, 3, 9);

                } else {
                    // player misses the ball
                    this.over = true;
                }
            }
        }
        if (ball.x < -100) {
            game.reset();
        }
        ball.x += ball.speed.x;

        ball.draw();
    }

};

function draw() {
    if (game.over === false) {
        background(0);
    } else {
        background(255, 0, 0);
    }

    player1.position(mouseY);
    player1.draw();

    player2.position(ball.y);
    player2.draw();

    game.tick();
}