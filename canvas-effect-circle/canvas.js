let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

var numberOfCircle = 1000;
var interactivity = 40;
var maxRadius = 40,
    minRadius;
var colorArray = ['#366FD6', '#1DAF00', '#F2E527', '#F2A428', '#F23845'];
var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, (Math.PI * 2), false);
        c.strokeStyle = "black";
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
            this.dx = -this.dx;
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
            this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        //Interactivity
        if (mouse.x - this.x < interactivity && mouse.x - this.x > -interactivity && mouse.y - this.y < interactivity && mouse.y - this.y > -interactivity) {
            if (this.radius < maxRadius)
                this.radius += 1;
        } else if(this.radius > this.minRadius)
            this.radius -= 1;
        this.draw();
    }
}

let circleArray = [];
function init() {
    circleArray = [];
    for (var i = 0 ; i < numberOfCircle ; i++ ) {
        var radius = Math.random() * 2 + 2;
        var x = Math.random() * (innerWidth - radius * 2) + radius,
            y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = ((Math.random() - 0.5)),
            dy = ((Math.random() - 0.5));
        // let circle = new Circle(x, y, dx, dy, radius);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}
init();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0 ; i < circleArray.length ; i++ )
        circleArray[i].update();
}
animate();