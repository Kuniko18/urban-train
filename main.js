// array for playground
let Playground = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,1,0,1,0,0,0,3,1],
  [1,0,0,0,1,0,0,1,1,1],
  [1,0,1,0,1,1,0,1,1,1],
  [1,0,1,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,1],
  [1,0,1,0,1,0,0,0,0,1],
  [1,0,1,0,1,1,1,1,0,1],
  [1,2,1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1],
];
let playerCube;
let gameOver = false;

function setup() {
  createCanvas(400,400);
  background(0);
//check rows one by one 
  for(let row = 0; row < Playground.length; row++) {
    let isWall = false;
    let isPlayer = false;
    let isFinish = false;                
    //check columns one by one
    for(let col = 0; col < Playground[row].length; col++) {
      if(Playground[col][row] == 1) {
        isWall = true;
      } else if (Playground[col][row] == 2) {
        isPlayer = true;
        playerCube = [col, row];
      } else if (Playground[col][row] == 3) {
        isFinish = true;
      }
      //assign to every row, col a new instance of class cube
      Playground[col][row] = new Cube(row, col, isWall, isPlayer, isFinish);
      isWall = false;
      isPlayer = false;
      isFinish = false;
    }
  }
}

function draw() {
  for(let col = 0; col < Playground.length; col++) {
    for(let row = 0; row < Playground[col].length; row++) {
      Playground[col][row].show();
    }
  }

  if(gameOver) {
    textAlign(CENTER);
    textSize(32);
    fill(255,0,0);
    text("CONGRATULATIONS!", width/2, height/2);
  }
}

function movement(colDir, rowDir) {
  if (!Playground[playerCube[0]+colDir][playerCube[1]+rowDir].isWall) {
    Playground[playerCube[0]][playerCube[1]].isPlayer = false;
    Playground[playerCube[0]+colDir][playerCube[1]+rowDir].isPlayer = true;
    playerCube[0] = playerCube[0] + colDir;
    playerCube[1] = playerCube[1] + rowDir;
  }
  if(Playground[playerCube[0]][playerCube[1]].isFinish) {
    gameOver = true;
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    movement(-1,0);
  } else if (keyCode == DOWN_ARROW) {
    movement(1,0);
  } else if (keyCode == LEFT_ARROW) {
    movement(0,-1);
  } else if (keyCode == RIGHT_ARROW) {
    movement(0,1);
  }
}

class Cube {
  constructor(_x, _y, _isWall, _isPlayer, _isFinish) {
    this.wh = 40;
    this.x = _x * this.wh;
    this.y = _y * this.wh;
    this.isWall = _isWall;
    this.isPlayer = _isPlayer;
    this.isFinish = _isFinish;
  }

  show(){
    if(this.isWall) {
      fill(255);
      stroke(0);
    } else if(this.isFinish) {
      fill(0,255,0);
      stroke(255);
    } else if(this.isPlayer) {
      fill(0,0,255);
      stroke(255);
    } else {
      fill(0);
      stroke(255);
    }
    
    rect(this.x, this.y, this.wh, this.wh);
  }
}
