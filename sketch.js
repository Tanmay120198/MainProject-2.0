var p1, p2, asteroid1, asteroid2, asteroid3;
var blast, blastImage, space, spaceImage;
var spaceShip, spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser, asteroidGroup, laserGroup;
var explosionSound, laserSound, explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline, canvas, endline2;

function preload() {
  spaceImage = loadImage("space.png");
  spaceShipImage = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  asteroid1 = loadImage("as1.png");
  asteroid2 = loadImage("as2.png");
  asteroid3 = loadImage("as3.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  space = createSprite(width / 2, height / 2, 30, 20);
  space.addImage(spaceImage);
  space.scale = 2
  space.velocityY = (5 + score / 10);

  spaceShip = createSprite(650, 650);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.4;

  p1 = createSprite(250, 600);
  p1.setCollider("rectangle", 70, -27, 5, 265, 156);
  p1.visible = false;
  p1.debug = true;
  p2 = createSprite(250, 600);
  p2.setCollider("rectangle", -70, -27, 5, 265, 24);
  p2.visible = false;


  asteroidGroup = new Group;
  laserGroup = new Group;

  endline = createSprite(250, 700, 600, 5);
  endline.visible = false;
  endline2 = createSprite(1050, 700, 600, 5);
  endline2.visible = false;
}

function draw() {
  background(0);

  if (gameState === play) {

    // camera.position.x= spaceShip.x;
    // camera.position.y = spaceShip.y;

    if (space.y > 800) {
      space.y = 300;
    }

    shoot = shoot - 1;

    if (keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x, spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8;
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();

      shoot = laser.y;
    }

    if (keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if (keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    if (keyDown("up")) {
      spaceShip.y = spaceShip.y - 10;
      p1.y = p1.y - 10;
      p2.y = p2.y - 10;
    }
    if (keyDown("down")) {
      spaceShip.y = spaceShip.y + 10;
      p1.y = p1.y + 10;
      p2.y = p2.y + 10;
    }


    if (asteroidGroup.isTouching(spaceShip) /*|| asteroidGroup.isTouching(p1)*/) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x, spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }

    if (asteroidGroup.isTouching(laserGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    asteroids();
    drawSprites();

    stroke("white");
    fill("white");
    textSize(30);
    text("Score : " + score, 50, 60)

    if (asteroidGroup.isTouching(endline) || asteroidGroup.isTouching(endline2)) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x, spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 20;
      spaceShip.destroy();
      explosionSound.play();
      gameState = end;
    }

  }
  else if (gameState === end) {
    space.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!", 430, 200);
    text("The asteroids destroyed the planet", 430, 280);
    text("Your final score: " + score, 430, 350);
    noStroke();
    textSize(20)
    text("Press 'F5' to Play again", 50, 720);
    console.log(width / 2);

  }


  if (gameState === instruction) {
    stroke("white");
    fill("white");
    textFont("trebuchetMS")
    textSize(50);
    text("------SPACE SHOOTERS------", canvas.width / 2 - 300, canvas.height / 2 - 300);
    text("ENJOY THE GAME!", canvas.width / 2 - 300, canvas.height / 2 + 100);
    stroke("yellow");
    fill("yellow");
    textSize(35);
    textFont("Apple Chancery");
    text("year 2500 .....", canvas.width / 2 - 300, canvas.height / 2 - 250);
    text(" Some asteroids are coming towords Earth.", canvas.width / 2 - 300, canvas.height / 2 - 210);
    text("  You are a space fighter.", canvas.width / 2 - 300, canvas.height / 2 - 170);
    text("  Help the people and Earth !", canvas.width / 2 - 300, canvas.height / 2 - 130);
    text("  press 'space' to shoot.", canvas.width / 2 - 300, canvas.height / 2 - 90);
    text("  use right and left arrows to move.", canvas.width / 2 - 300, canvas.height / 2 - 50);
    text("  press 's' to start game.", canvas.width / 2, canvas.height / 2 - 10);

    if (keyDown("s")) {
      gameState = play;
    }
  }
}



function asteroids() {
  if (frameCount % 110 === 0) {

    var asteroid = createSprite(Math.round(random(50, width - 50)), -20);
    asteroid.velocityY = (6 + 2 * (score / 10));

    if (score > 2) {
      asteroid.velocityY += 1;
    }
    if (score > 6) {
      asteroid.velocityY += 2;
    }
    if (score > 12) {
      asteroid.velocityY += 3;
    }
    if (score > 16) {
      asteroid.velocityY += 4;
    }
    if (score > 18) {
      asteroid.velocityY += 5;
    }
    if (score > 20) {
      asteroid.velocityY += 6;
    }
    if (score > 22) {
      asteroid.velocityY += 7;
    }
    if (score > 24) {
      asteroid.velocityY += 8;
    }
    if (score > 26) {
      asteroid.velocityY += 9;
    }
    if (score > 30) {
      asteroid.velocityY += 10;
    }


    asteroid.lifetime = 100;
    asteroid.scale = random(0.4, 0.5);


    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: asteroid.addImage(asteroid1);
        asteroid.setCollider("circle", -80, 10, 160);
        break;
      case 2: asteroid.addImage(asteroid2);
        asteroid.setCollider("circle", 50, 0, 150);
        break;
      case 3: asteroid.addImage(asteroid3);
        asteroid.setCollider("circle", 0, 0, 170)
      default: break;
    }


    asteroidGroup.add(asteroid);
  }
}
