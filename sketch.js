var monkey, monkeyRunning
var ground
var banana, bananasGroup
var obstacle, obstaclesGroup
var score
var gameState = PLAY
var PLAY
var END

function dropBanana() {
  var rand = Math.round(random(50, 100));
  if (frameCount % 80 === 0) {
    banana = createSprite(610, rand, 20, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(3 + score / 20);
    banana.scale = 0.09;
    banana.lifetime = 220;
    bananasGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(610, 160, 20, 20);
    obstacle.velocityX = -(4 + score / 20);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacle.addImage("obstacle", obstacleImage);
    obstaclesGroup.add(obstacle);
  }
}

function resetScore() {
  score = 0;
  gameState = PLAY;
}

function preload() {
  monkeyRunning = loadAnimation("sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  monkeyTripped = loadImage("sprite_0.png ");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


}

function setup() {
  createCanvas(600, 200);

  monkey = createSprite(50, 100, 20, 20);
  monkey.addAnimation("running", monkeyRunning);
  monkey.scale = 0.09;
  monkey.x = 50;
  monkey.depth = monkey.depth + 2;

  ground = createSprite(100, 180, 610, 5)
  ground.velocityX = -3;

  obstaclesGroup = createGroup();
  bananasGroup = createGroup();

  monkey.debug = true;
  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);

}

function draw() {

  background("white");

  monkey.collide(ground);

  if (gameState === PLAY) {
    text("Survival " + "Time: " + score, 250, 40);
    text.depth = text.depth + 1;

    ground.velocityX = -2;
    if (ground.x > 0) {
      ground.x = ground.width / 2;
    }

    score = Math.round(frameCount / 20);

    if (keyDown("space") && monkey.y > 149) {
      monkey.velocityY = -14;
    }

    if (monkey.isTouching(bananasGroup)) {
      bananasGroup.destroyEach();
    }

    if (monkey.isTouching(obstaclesGroup)) {
      gameState = END;
      bananasGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
      ground.velocityX = 0;
      bananasGroup.setLifetimeEach(0);
      obstaclesGroup.setLifetimeEach(0);
      score = 1 + Math.round(frameCount / 20) - 20
  }
}

  monkey.velocityY = monkey.velocityY + 1;

  dropBanana();

  spawnObstacles();

  drawSprites();

}