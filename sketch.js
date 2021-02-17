var backImage, backgr;
var player, player_running, playerS;
var banana, bananaImage, foodGroup;
var obstacle, obstacleImage, obstacleGroup;
var score;
var ground, ground_img;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  monkeyS = loadAnimation("Monkey_01.png");
}

function setup() {
  createCanvas(800, 400);

  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width / 2;
  ground.visible = false;

  score = 0;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(0);

  if (gameState === PLAY) {

    if (backgr.x < 100) {
      backgr.x = backgr.width / 2;
    }

    if (keyDown("space") && player.y < 330) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    player.setCollider("circle", 0, 0, 300);

    player.collide(ground);

    if (player.isTouching(foodGroup)) {
      score = score + 1;
      player.scale+=0.02;
      foodGroup.destroyEach();
    }

    if (player.isTouching(obstacleGroup)) {
      gameState = END;
    }
  }
  else if (gameState === END) {
    player.addAnimation("monk", monkeyS);
    player.changeAnimation("monk", monkeyS);
    player.x = 250;
    player.y = 180;
    obstacleGroup.setVelocityEach(0, 0);
    foodGroup.setVelocityEach(0, 0);
    backgr.setVelocity(0, 0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }

  drawSprites();

  if (gameState === END) {
    fill("black");
    stroke("black");
    textSize(40);
    textFont("Times New Roman");
    text("GAME OVER", 290, 200)
  }

  fill("black");
  stroke("black");
  textSize(25);
  textFont("Times New Roman");
  text("Score: " + score, 350, 30);

  Banana();
  Obstacles();

}

function Banana() {
  if (frameCount % 250 === 0) {
    banana = createSprite(800, 180, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 300;
    banana.y = random(140, 200);
    banana.setCollider("circle", 0, 0, 250);
    foodGroup.add(banana);
  }
}

function Obstacles(){
  
  if(frameCount % 180 === 0){
    obstacle = createSprite(800, 340, 20, 20);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -8;
    obstacle.lifetime = 300;
    obstacle.setCollider("circle", 0, 0, 250);
    obstacleGroup.add(obstacle);
  }
  
}