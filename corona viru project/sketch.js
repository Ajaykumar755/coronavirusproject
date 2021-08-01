
var wait = -1;
var easy = 1;
var end = 0;
var medium=2;
var hard = 3
var gameState = wait;
var score = 0;
function preload() {
  //pre-load images
  groundImage = loadImage("background.jpg");
  playerImage = loadAnimation(
    "run1.png",
    "run2.png",
    "run3.png",
    "run4.png",
    "run5.png",
    "run6.png",
    "run7.png"
  );
  mask = loadImage("mask.png");
  vaccine = loadImage("vaccine.png");
  corona = loadImage("corona.png");
  coronas = loadImage("corona2.png");
  playerend = loadImage("boy.1.jpg");
  playerStand = loadImage("run1.png");
  touchSound = loadSound("touch.wav")
  gameOverSound = loadSound("gameover.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //create sprites here
  ground = createSprite(width/2, height/2);
  ground.addImage(groundImage);
  ground.scale = 0.8;
  ground.velocityX = -5;

  player = createSprite(width/5, height/1.5, 20, 20);
  player.addAnimation("running", playerImage);
  player.scale = 0.2;

  //playerStand1 = createSprite(200, 300, 20, 20);

  invisibleground = createSprite(width/2, 380, 600, 20);
  invisibleground.visible = false;

  var rand = Math.round(random(1, 100));
  console.log(rand);

  vaccineGroup = createGroup();
  maskGroup = createGroup();
  coronaGroup = createGroup();
  corona1Group = createGroup();

  player.setCollider("rectangle", 0, 0, 10, player.height);
  player.debug = false;
}

function draw() {
  background(300);

  console.log(ground.x);
  if (gameState === easy) {
    if (ground.x < 80) {
      ground.x = ground.width / 4;
    }
    if (keyDown("space") && player.y >= 300) {
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(invisibleground);
    player.y = World.mouseY;

    spawnClouds();
    if (player.isTouching(coronaGroup) || player.isTouching(corona1Group)) {
      gameState = end;
      gameOverSound.play()
      //player.changeAnimation("collided",playerend);
    }

    if (player.isTouching(vaccineGroup)) {
      vaccineGroup.destroyEach();
      score = score + 1;
      touchSound.play()
    }
    if (player.isTouching(maskGroup)) {
      maskGroup.destroyEach();
      score = score + 1;
      touchSound.play()
    }
  } else if (gameState === end) {
    ground.velocityX = 0;
    player.velocityY = 0;
    //coronaGroup.velocityX=0
    //corona1Group.velocityX=0

    coronaGroup.setLifetimeEach(-1);
    corona1Group.setLifetimeEach(-1);

    maskGroup.setLifetimeEach(-1);
    vaccineGroup.setLifetimeEach(-1);

    coronaGroup.setVelocityXEach(0);
    corona1Group.setVelocityXEach(0);

    maskGroup.setVelocityXEach(0);
    vaccineGroup.setVelocityXEach(0);

    player.changeAnimation("collided", playerend);

    maskGroup.destroyEach();
    vaccineGroup.destroyEach();
  }
  if (gameState === medium) {
    if (ground.x < 80) {
      ground.x = ground.width / 4;
    }
    if (keyDown("m") && player.y >= 300) {
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(invisibleground);
    player.y=World.mouseY

    spawnmedium();
    if (player.isTouching(coronaGroup) || player.isTouching(corona1Group)) {
      gameState = end;
      //player.changeAnimation("collided",playerend);
    }

    if (player.isTouching(vaccineGroup)) {
      vaccineGroup.destroyEach();
      score = score + 1;
    }
    if (player.isTouching(maskGroup)) {
      maskGroup.destroyEach();
      score = score + 1;
    }
  } else if (gameState === end) {
    ground.velocityX = 0;
    player.velocityY = 0;
    //coronaGroup.velocityX=0
    //corona1Group.velocityX=0

    coronaGroup.setLifetimeEach(-1);
    corona1Group.setLifetimeEach(-1);

    maskGroup.setLifetimeEach(-1);
    vaccineGroup.setLifetimeEach(-1);

    coronaGroup.setVelocityXEach(0);
    corona1Group.setVelocityXEach(0);

    maskGroup.setVelocityXEach(0);
    vaccineGroup.setVelocityXEach(0);

    player.changeImage( playerend);

    maskGroup.destroyEach();
    vaccineGroup.destroyEach();
  }
  if (gameState === hard) {
    if (ground.x < 80) {
      ground.x = ground.width / 4;
    }
    if (keyDown("h") && player.y >= 300) {
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(invisibleground);
    player.y=World.mouseY

    spawnhard();
    if (player.isTouching(coronaGroup) || player.isTouching(corona1Group)) {
      gameState = end;
      //player.changeAnimation("collided",playerend);
    }

    if (player.isTouching(vaccineGroup)) {
      vaccineGroup.destroyEach();
      score = score + 1;
    }
    if (player.isTouching(maskGroup)) {
      maskGroup.destroyEach();
      score = score + 1;
    }
  } else if (gameState === end) {
    ground.velocityX = 0;
    player.velocityY = 0;
    //coronaGroup.velocityX=0
    //corona1Group.velocityX=0

    coronaGroup.setLifetimeEach(-1);
    corona1Group.setLifetimeEach(-1);

    maskGroup.setLifetimeEach(-1);
    vaccineGroup.setLifetimeEach(-1);

    coronaGroup.setVelocityXEach(0);
    corona1Group.setVelocityXEach(0);

    maskGroup.setVelocityXEach(0);
    vaccineGroup.setVelocityXEach(0);

    player.changeImage( playerend);

    maskGroup.destroyEach();
    vaccineGroup.destroyEach();
  }
  // else if (gameState===wait){
  //rect(0,0,600,400)

  drawSprites();
  if (gameState === -1) {
    ground.velocityX = 0;
    fill("0");
    stroke("black");
    strokeWeight(10);

    textSize(30);
    text("Help Aravind in escaping from Corona", 50, 100);
    text("To play easy press e", 270, 250);
    text("To play medium press m", 270, 300);
    text("To play hard press h", 270, 350);
  } else {
    fill("0");
    stroke("black");
    strokeWeight(10);
    textSize(30);

    text("Score: " + score, 250, 50);
  }
  if (keyDown("e")) {
    gameState = 1;
  }
  if(keyDown("m")){
    gameState = 2
  }
  if(keyDown("h")){
    gameState=3
  }
  if (keyDown("r")) {
    reset();
  }
  if (gameState === end) {
    fill("green");
    stroke("yellow");
    strokeWeight(10);
    textSize(30);
    text("To restart press r", 200, 100);
  }
}
function spawnmedium() {
  // write your code here
  if (frameCount % 100 === 0) {
    mask1 = createSprite(600, 500);
    mask1.addImage(mask);
    mask1.velocityX = -6;
    mask1.scale = 0.2;
    mask1.y = Math.round(random(10, 350));

    maskGroup.add(mask1);
  }
  if (frameCount % 135 === 0) {
    vaccine1 = createSprite(600, 300);
    vaccine1.addImage(vaccine);
    vaccine1.velocityX = -6;
    vaccine1.scale = 0.3;
    vaccine.y = Math.round(random(50, 350));

    vaccineGroup.add(vaccine1);
  }
  if (frameCount % 140 === 0) {
    corona1 = createSprite(600, 300);
    corona1.addImage(corona);
    corona1.velocityX = -12;
    corona1.scale = 0.3;
    corona1.y = Math.round(random(0, 400));

    coronaGroup.add(corona1);
  }

  if (frameCount % 150 === 0) {
    corona3 = createSprite(600, 300);
    corona3.addImage(coronas);
    corona3.velocityX = -17;
    corona3.scale = 0.2;
    corona3.y = Math.round(random(50, 350));

    corona1Group.add(corona3);
  }
}

function reset() {
  gameState = -1;
  //gameOver.visible = false;
  //restart.visible = false;

  coronaGroup.destroyEach();
  corona1Group.destroyEach();

  //trex.changeAnimation("running",trex_running);

  score = 0;
}
function spawnClouds() {
  // write your code here
  if (frameCount % 112 === 0) {
    mask1 = createSprite(600, 500);
    mask1.addImage(mask);
    mask1.velocityX = -5;
    mask1.scale = 0.2;
    mask1.y = Math.round(random(10, 350));

    maskGroup.add(mask1);
  }
  if (frameCount % 150 === 0) {
    vaccine1 = createSprite(600, 300);
    vaccine1.addImage(vaccine);
    vaccine1.velocityX = -5;
    vaccine1.scale = 0.3;
    vaccine.y = Math.round(random(50, 350));

    vaccineGroup.add(vaccine1);
  }
  if (frameCount % 150 === 0) {
    corona1 = createSprite(600, 300);
    corona1.addImage(corona);
    corona1.velocityX = -10;
    corona1.scale = 0.3;
    corona1.y = Math.round(random(0, 400));

    coronaGroup.add(corona1);
  }

  if (frameCount % 150 === 0) {
    corona3 = createSprite(600, 300);
    corona3.addImage(coronas);
    corona3.velocityX = -15;
    corona3.scale = 0.2;
    corona3.y = Math.round(random(50, 350));

    corona1Group.add(corona3);
  }
}
function spawnhard() {
  // write your code here
  if (frameCount % 70 === 0) {
    mask1 = createSprite(600, 500);
    mask1.addImage(mask);
    mask1.velocityX = -8;
    mask1.scale = 0.2;
    mask1.y = Math.round(random(10, 350));

    maskGroup.add(mask1);
  }
  if (frameCount % 115 === 0) {
    vaccine1 = createSprite(600, 300);
    vaccine1.addImage(vaccine);
    vaccine1.velocityX = -8;
    vaccine1.scale = 0.3;
    vaccine.y = Math.round(random(50, 350));

    vaccineGroup.add(vaccine1);
  }
  if (frameCount % 120 === 0) {
    corona1 = createSprite(600, 300);
    corona1.addImage(corona);
    corona1.velocityX = -14;
    corona1.scale = 0.3;
    corona1.y = Math.round(random(0, 400));

    coronaGroup.add(corona1);
  }

  if (frameCount % 130 === 0) {
    corona3 = createSprite(600, 300);
    corona3.addImage(coronas);
    corona3.velocityX = -19;
    corona3.scale = 0.2;
    corona3.y = Math.round(random(50, 350));

    corona1Group.add(corona3);
  }
}


