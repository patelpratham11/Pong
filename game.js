//creating canvas
alert("Click to start");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//accessing the html scores
var scoreOne = document.getElementById("one");
var scoreTwo = document.getElementById("two");
//setting defaults
var one = 0;
var two = 0;
var goal = 20;
//setting up ball object
var x = canvas.width/2;
var y = canvas.height-30;
var dx = Math.floor((Math.random() * 7) + 3);//random velocity x
var dy = Math.floor((Math.random() * 7) + 3);//random velocity y
var ballRadius = 10;
//setting up paddle object
var paddleHeightOne = (canvas.height - 75)/2;
var paddleHeightTwo = (canvas.height - 75)/2;
var paddleWidth = 10;
var paddleOneY = 0;
var paddleTwoY = canvas.width;
var paddleDY = 7;
//setting up switches
var wUp;
var sDown;
var upArrow;
var downArrow;

//handling down keys
function keyDownHandler(event){
  if(event.code == "KeyW"){
    wUp = true;
  }
  if (event.code == "KeyS"){
    sDown = true;
  }
  if (event.code == "ArrowUp"){
    upArrow = true;
  }
  if(event.code == "ArrowDown"){
    downArrow = true;
  }
}
//handling up key
function keyUpHandler(event){
  if(event.code == "KeyW"){
    wUp = false;
  }
  if (event.code == "KeyS"){
    sDown = false;
  }
  if (event.code == "ArrowUp"){
    upArrow = false;
  }
  if(event.code == "ArrowDown"){
    downArrow = false;
  }
}
//looking for any key presses or releases
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

//drawing the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#a29bfe";
  ctx.fill();
  ctx.closePath();
}
// drawing the paddle
function drawPaddleOne(){
  ctx.beginPath();
  ctx.rect(0, paddleHeightOne, 10, 75);
  ctx.fillStyle = "#ff7675";
  ctx.fill();
  ctx.closePath();
}
//paddle 2 drawing
function drawPaddleTwo(){
  ctx.beginPath();
  ctx.rect(canvas.width-10, paddleHeightTwo, 10, 75);
  ctx.fillStyle = "#81ecec";
  ctx.fill();
  ctx.closePath();
}
//drawing the entire gameloop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddleOne();
  drawPaddleTwo();
  x += dx;
  y += dy;
//if it hits the walls, we need to send the ball back at a random velocity
  if(y+dy>canvas.height){
    dy = -Math.floor((Math.random() * 5) + 3);
  }
  if (y+dy<0){
    dy = Math.floor((Math.random() * 5) + 3);
  }
//updating scores
  if(x+dx>canvas.width){
    one++
    document.getElementById("one").innerHTML = "Score Player One: "+one;
    x = 0;
    y = 0;
    dx = Math.floor((Math.random() * 7) + 3);
    dy = Math.floor((Math.random() * 7) + 3);
  }
  if(x+dx<0){
    two++
    document.getElementById("two").innerHTML = "Score Player Two: "+two;
    x = 0;
    y = 0;
    dx = Math.floor((Math.random() * 7) + 3);
    dy = Math.floor((Math.random() * 7) + 3);
  }
//allows the paddles to loop over to the other side
  if(paddleHeightOne>canvas.height){
    paddleHeightOne = 0;
  }
  if(paddleHeightTwo>canvas.height){
    paddleHeightTwo = 0;
  }
  if(paddleHeightOne<0){
    paddleHeightOne = canvas.height;
  }
  if(paddleHeightTwo<0){
    paddleHeightTwo = canvas.height;
  }
//if it touches the paddle, we need to send the ball back at a random speed
 if((y+dy)<paddleHeightOne+75 && (y+dy)>paddleHeightOne){
   if((x+dx)<paddleWidth){
     dx = Math.floor((Math.random() * 6) + 3);
     dy = Math.floor((Math.random() * -3) + 7);
   }
 }
 if((y+dy)<paddleHeightTwo+75 && (y+dy)>paddleHeightTwo){
   if((x+dx)>canvas.width-paddleWidth){
     dx = -Math.floor((Math.random() * 6) + 3);
     dy = -Math.floor((Math.random() * -3) + 7);
   }
 }
 //movements according to key presses
  if(sDown){
    paddleHeightOne += 7;
  }
  if(wUp){
    paddleHeightOne -= 7;
  }
  if(downArrow){
    paddleHeightTwo += 7;
  }
  if(upArrow){
    paddleHeightTwo -= 7;
  }
//alerting who is the winner
  if(one == goal){
    location.reload();
    alert("THE WINNER IS PLAYER ONE!");
    one = 0;
    location.reload();
  }
  if(two == goal){
    location.reload();
    alert("THE WINNER IS PLAYER TWO!");
    two = 0;
    location.reload();
  }

//game loop
  requestAnimationFrame(draw);
}

// requestAnimationFrame(draw);
