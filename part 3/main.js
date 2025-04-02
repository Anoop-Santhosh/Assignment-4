// Setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
// Ball class definition
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
// Draw the ball
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
  // ball position and handle wall collisions
    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        // Update position
        this.x += this.velX;
        this.y += this.velY;
    }

    // collisions with other balls
    collisionDetect() {
        for (const ball of balls) {
            if (this !== ball) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

// Create balls array
const balls = [];
// Populate with balls
while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        // Ensure ball is drawn at least one ball width away from edge
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-5, 5),
        random(-5, 5),
        randomRGB(),
        size
    );

    balls.push(ball);
}
// Animation loop
function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
    // Update and draw all balls
    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
    requestAnimationFrame(loop);
}
// Start the animation
loop();
// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
