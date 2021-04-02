var Play;
var end=0;
var gamestate = Play;
var monkey , monkey_running
var ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var banaGroup,obsGroup;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(400,400);
  score = 0;
  
  monkey =createSprite(40,340,20,20);
  monkey.addAnimation("1",monkey_running);
  monkey.scale=0.12;
  
  ground=createSprite(-10,380,900,10);
  
  banaGroup = new Group();
  obsGroup = new Group();
}


function draw() {
background("cyan");
  if(gamestate===Play){
  bana()
  stone()
    monkey.x=40;

  if(keyDown("space") && monkey.y>250){
    monkey.velocityY=-18;
  }
  monkey.velocityY = monkey.velocityY + 0.8

  if (banaGroup.isTouching(monkey)){
    score = score+1
    banaGroup.destroyEach()
  }
    if(obsGroup.isTouching(monkey)){
      gamestate=end
    }
  }else if(gamestate===end){
    monkey.x=-50
    banaGroup.setVelocityXEach(0);

    banaGroup.setLifetimeEach(-1);
    obsGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);
    text("GAME OVER",160,200);
    text("Press (R) to Reset",150,240);
    if(keyDown("r")){
      banaGroup.destroyEach();
      obsGroup.destroyEach();
      gamestate=Play;
      score=0;
    }
  }
  drawSprites();
  text("score:"+score,350,20);
  monkey.collide(ground);
}

function bana(){
  if(frameCount % 110 === 0){
  banana = createSprite(420,Math.round(random(200,350)),10,10)
  banana.velocityX=-4;
  banana.addImage("2",bananaImage);
  banana.scale=0.06
  banana.lifetime=200;
  banaGroup.add(banana);
}
}
function stone(){
  if (frameCount % 110 === 0){
  obstacle = createSprite(420,340,20,20);
  obstacle.velocityX=-(3+score/10);
  obstacle.addImage("3",obstaceImage);
  obstacle.scale = 0.2;
  obstacle.lifetime = 200;
    obsGroup.add(obstacle);
  }
}





