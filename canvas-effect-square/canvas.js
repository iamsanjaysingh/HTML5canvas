let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var numberOfSquare = 1000;
var interactivity = 40;
var probability = 0.5;
var maxSide = 50,
    minSide = 35;
var colorArray = ['#366FD6', '#1DAF00', '#F2E527', '#F2A428', '#F23845'];
var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('resize', function(event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Square(x, y, dx, dy, side, direction) {
    this.x = x;
    this.y = y;
    this.dx = dx + dy;
    this.dy = dy + dx;
    this.side = side;
    this.minSide = side;
    this.direction = direction;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    if (this.dy < 0 || this.dx < 0) {
        this.dy -= .5;
        this.dx -= .5;
    } else {
        this.dy += .5;
        this.dx += .5;
    }

    this.draw = function () {
        c.beginPath();
        c.fillRect(this.x, this.y, this.side, this.side);    
        c.fillStyle = this.color;
    }

    this.update = function () {
        if (this.x + this.side > innerWidth || this.x < 0)
            this.dx = -this.dx;
        if (this.y + this.side > innerHeight || this.y < 0)
            this.dy = -this.dy;
        if (this.direction)
            this.y += this.dy;
        else
            this.x += this.dx;
        //interactivity
        if (mouse.x - this.x < interactivity && mouse.x - this.x > -interactivity && mouse.y - this.y < interactivity && mouse.y - this.y > -interactivity) {
            if (this.side < maxSide)
                this.side += 1;
        } else if(this.side > this.minSide)
            this.side -= 1;
        this.draw();
    }
}

var squareArray = [];
function init() {
    squareArray = [];
    for (var i = 0 ; i < numberOfSquare ; i++) {
        var side = Math.random() * 5 + 1;
        var x = Math.random() * (innerWidth - side * 2) + side,
            y = Math.random() * (innerHeight - side * 2) + side;
        var dx = (Math.random() - 0.5),
            dy = (Math.random() - 0.5);
        var direction = Math.random() >= probability;
        squareArray.push(new Square(x, y, dx, dy, side, direction));
    }
}
init();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0 ; i < squareArray.length ; i++)
        squareArray[i].update();
}
animate();