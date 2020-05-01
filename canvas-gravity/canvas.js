const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const colors = ['#366FD6', '#1DAF00', '#F2E527', '#F2A428', '#F23845'];
var gravity = 1,
    friction = 0.7;
var numberOfCircle = 400,
    maximumSize = 20,
    minimumSize = 8;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

addEventListener('resize', function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
})
addEventListener('click', function() {
  init();
})

function Ball (x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }
  this.update = function() {
    if(this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0 ) {
      this.dx = -this.dx;
    }
    this.y += this.dy;
    this.x += this.dx;
    this.draw();
  }
}

var ballArray = [];
function init() {
  ballArray = [];
  for (let i = 0; i < numberOfCircle; i++) {
    var radius = randomIntFromRange(minimumSize, maximumSize);
    var x = randomIntFromRange(0 + radius, canvas.width - radius);
    var y = randomIntFromRange(0, canvas.height - radius);
    var dx = randomIntFromRange(-2, 2);
    var dy = randomIntFromRange(-2, 2);
    var color = randomColor(colors);
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

init();
animate();