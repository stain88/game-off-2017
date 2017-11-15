var canvas;
var CANVAS_HEIGHT = 640;
var CANVAS_WIDTH = 800;
var playerY;
var PADDLE_HEIGHT = 80;
var PADDLE_WIDTH = 20;

function setup() {
  canvas = createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
  canvas.parent('game-container');
  background('#2dd5e3');

  playerY = 240;
}

function draw() {
  clear();
  draw_background();
  check_for_movement();
  draw_player_paddle();
}

function draw_background() {
  background('#2dd5e3');
}

function check_for_movement() {
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    playerY -= 5;
    playerY = max(playerY, 0);
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    playerY += 5;
    playerY = min(playerY, CANVAS_HEIGHT - PADDLE_HEIGHT);
  }
}

function draw_player_paddle() {
  rect(20, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
}
