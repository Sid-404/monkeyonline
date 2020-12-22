 
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var score;
var survivalTime=0;
var ground; 
var PLAY=1;
var END=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(800,400);  
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;

  foodGroup = new Group();
  obstacleGroup=new Group();
}


function draw() {
  background("lightblue");
  fill("black");
  text("Survival Time: "+survivalTime,500,50);

  ground.x=ground.width/2;  
  monkey.collide(ground);
  
  if(keyDown("space") && monkey.y>=313){
    monkey.velocityY=-13;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  fruits();
  obstacles();
  drawSprites(); 
  
  if(obstacleGroup.isTouching(monkey)){ 
    ground.velocityX = 0; 
    monkey.velocityY = 0;                                                       obstacleGroup.setVelocityXEach(0); 
    foodGroup.setVelocityXEach(0); 
    obstacleGroup.setLifetimeEach(-1); 
    foodGroup.setLifetimeEach(-1); 
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
}

function fruits(){
  if (frameCount%80===0){
    banana=createSprite(600,250,100,100);
    banana.addImage("banana",bananaImage);
    banana.y=Math.round(random(200,250));
    banana.velocityX=-4
    banana.scale=0.075;
    banana.lifetime=250;
    foodGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount%200===0){
    obstacle=createSprite(600,325,100,100);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX=-4;
    obstacle.lifetime=250;
    obstacle.scale=0.15;
    obstacleGroup.add(obstacle);
  }
}



