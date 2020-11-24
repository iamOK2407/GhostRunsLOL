var ghost,ghostJump,ghostStand;
var tower,towerImage;
var door,doorImage,climber,climberImage;
var doorGroup,climberGroup,gridGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameoverImage,gameover;

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  ghostStand=loadAnimation("ghoststanding.png");
  ghostJump=loadAnimation("ghostjumping.png");
  climberImage=loadImage("climber.png");
  gameoverImage=loadImage("gameover.png");

}

function setup(){
  createCanvas(400,400);

  tower=createSprite(200,200);
  tower.addImage(towerImage);
  tower.velocityY=0.45;
  
  ghost=createSprite(340,185,5,5);
  ghost.addAnimation("stands",ghostStand);
  ghost.addAnimation("jump",ghostJump);
  ghost.scale=0.35;
  
  lava=createSprite(200,400,400,9);
  lava.visible=false;
  
  gameover=createSprite(200,200);
  gameover.addImage(gameoverImage)
  gameover.scale=1.5;
  

doorGroup=createGroup();
climberGroup=createGroup();
  gridGroup=createGroup();


}

function draw(){

  if(gameState==PLAY){
  doorf();
    gameover.visible=false;
    
  if(keyDown("space")){
    ghost.velocityY=-12;
    ghost.changeAnimation()
  }
  ghost.velocityY=ghost.velocityY+2
  
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+4;
  }
  
   if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-4;
  }
 
    if(ghost.isTouching(climberGroup)){
      ghost.velocityY=0;
    }
  
  
  if(ghost.isTouching(lava) || ghost.isTouching(gridGroup)){
    gameState=END;
    tower.velocityY=0;
  }
  
  
  
  
  if(tower.y>400){
    tower.y=200;
  }



  }
    
  if(gameState==END){
    gameover.visible=true;
    ghost.destroy();
  }
    
    
    
    
    
drawSprites();
}

function doorf(){
  if(frameCount%230===0){
    console.log(frameCount)
    door=createSprite(random(40,360),-50)
    door.addImage(doorImage);
    door.velocityY=1;
    door.scale=0.77;
    climber=createSprite(door.x,9);
    climber.addImage(climberImage);
    climber.scale=0.77;
    climber.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth+=1
    ghost.depth=climber.depth;
    ghost.depth+=1
    doorGroup.add(door);
    climberGroup.add(climber);
    grid=createSprite(door.x,10)
    grid.width=climber.width;
    grid.height=2;
    grid.velocityY=1; 
    grid.debug=true;
    gridGroup.add(grid);
  
  }
}



