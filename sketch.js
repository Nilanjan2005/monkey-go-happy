var PLAY = 1;
var END = 0;
var gameState = PLAY;
var rand;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime,score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,600);
  
    
  monkey = createSprite(100,445)
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale = 0.15;
  
  ground = createSprite(400,505,500,5);
  ground.x = ground.width/2;
  ground.velocityX = -4;

  invisibleGround =createSprite(400,505,500,5)
  invisibleGround.visible = true;
 
  obstacleGroup = new Group();
  bananaGroup = new Group();
 
}


function draw() {

  background(rgb(255,255,255));
 
 if (gameState === PLAY){

  if(keyDown("space")&& monkey.y>= 100 ) {
    monkey.velocityY = -12;
  }

  if(ground.x<0){
    ground.x = ground.width/2
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground)

  var rand = Math.round(random(200,250));
  
  Food();
  Obstacles();
   
if( obstacleGroup.collide(monkey)){
 gameState = END;
     
 }
      survivalTime = 0;
   stroke("white");
   textSize(20);
   fill("white");
   text("score :"+ score,500,50);
   
  stroke("black");
    textSize(20);
   fill("black");
   survivalTime = Math.round(frameCount/frameRate())
   text("survivalTime:",100,50)
   
   
}
   drawSprites()

if (gameState === END){
  ground.velocityX = 0;
  monkey.velocityX = 0;
}
}
function Food (){
  if(frameCount % 80 === 0 ){
  banana = createSprite(300,200)
    banana.y = Math.round(random(120,220));
  banana.addImage("banana",bananaImage)
  banana.scale = 0.10;
    banana.velocityX = -5;
  banana.lifeTime = 100;
    bananaGroup.add(banana);
}
}
function Obstacles(){
 if (frameCount%300 === 0){ 
   obstacle = createSprite(300,450);
   obstacle.y = Math.round(random(450,455))
   obstacle.addImage("obstacle",obstacleImage);
   obstacle.velocityX = -3;
   obstacle.scale = 0.25;
   obstacle.lifeTime = 100;
   obstacleGroup.add(obstacle);
 }
}



