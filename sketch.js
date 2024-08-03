//variáveis da aparência da bolinha
let ballX = 300;
let ballY = 200;
let ballDia = 13;
let ballRai = ballDia / 2
//variáveis da velocidade da bolinha
let ballXSpd = 5;
let ballYSpd = 5;

//variáveis da aparência da raquete
let raqueteX = 5
let raqueteY = 150
let raqueteWidth = 10
let raqueteHeight = 90
//variáveis da aparência do oponente
let opRaqueteX = 585;
let opRaqueteY = 150
let opRaqueteYSpd;
//variáveis da função da raquete
let colidiu = false

//variáveis do placar
let points = 0;
let opPoints = 0;

//variáveis de sons
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(20);
  viewBall()
  ballMove()
  borderCheck()
  viewRaquete(raqueteX,raqueteY)
  viewRaquete(opRaqueteX,opRaqueteY)
  raqueteMove()
  libraryRaqueteCheckBall(raqueteX,raqueteY)
  libraryRaqueteCheckBall(opRaqueteX,opRaqueteY)
  opRaqueteMove()
  showPlacar()
  goal()
  ballUnstuck()
}

function viewBall(){
   circle(ballX,ballY,ballDia)
}

function ballMove(){
  ballX += ballXSpd;
  ballY += ballYSpd;
}

function borderCheck(){
   if(ballX + ballRai > width || ballX - ballRai < 0){
    ballXSpd *= -1;
  }
  
  if(ballY + ballRai > height || ballY - ballRai < 0){
    ballYSpd *= -1;
  }
}

function viewRaquete(x,y){
  rect(x,y,raqueteWidth,raqueteHeight)
}

function raqueteMove(){
  if (keyIsDown(87)){
    raqueteY -= 10;
  }
  if(keyIsDown(83)){
    raqueteY += 10;
  }
}

function raqueteCheckBall(){
  if (ballX - ballRai < raqueteX + raqueteWidth && ballY - ballRai < raqueteY + raqueteHeight && ballY + ballRai > raqueteY){
    ballXSpd += 0.2;
    ballXSpd *= -1;
    raqueta.play();
  }
}

function libraryRaqueteCheckBall(x, y){
  colidiu = collideRectCircle(x,y,raqueteWidth,raqueteHeight,ballX,ballY,ballRai);
  if (colidiu){
    ballXSpd *= -1;
    raquetada.play();
  }
}

function opRaqueteMove(){
  if (keyIsDown(UP_ARROW)){
    opRaqueteY -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    opRaqueteY += 10;
  }
}

function showPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16)
  fill(color(68, 178, 63))
  rect(150,10,40,20)
  fill(255)
  text(points,170,26 );
  fill(color(68, 178, 63))
  rect(450,10,40,20)
  fill(255)
  text(opPoints, 470, 26)
}

function goal(){
  if (ballX > 590){
    points += 1;
    ponto.play();
  }
  if (ballX < 10){
    opPoints += 1;
    ponto.play();
  }
}

function ballUnstuck(){
  if (ballX - ballRai < 0){
    ballX = 300
    ballY = 200
  }
  if (ballX + ballRai > 600){
    ballX = 300
    ballY = 200
  }
}

//fim :)