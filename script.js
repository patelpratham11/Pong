//creating canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//setting up ball object
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
//setting up paddle object
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleDx = 7;
//booleans for keystrokes
var rightPressed;
var leftPressed;
//down keys
function keyDownHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = true;
  }
  else if(event.keyCode == 37) {
    leftPressed = true;
  }
}
//up keys
function keyUpHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = false;
  }
  else if(event.keyCode == 37) {
    leftPressed = false;
  }
}
//handling up and down keys
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
//drawing the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}
//drawing the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}
//drawing the entire gameloop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if(
    y + dy < ballRadius ||
    (
      y + dy > canvas.height - ballRadius - paddleHeight &&
      x + dx > paddleX &&
      x + dx < paddleX + paddleWidth
    )
  ) {
    dy = -dy;

  } else if (y + dy > canvas.height) {
    location.reload();

  }

  if(rightPressed && (paddleX + paddleWidth) < canvas.width) {
    paddleX += paddleDx;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= paddleDx;
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
