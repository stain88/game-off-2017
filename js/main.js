// canvas settings
var canvas;
var CANVAS_HEIGHT = 640;
var CANVAS_WIDTH = 800;

// paddle settings
var player_Y;
var PADDLE_HEIGHT = 80;
var PADDLE_WIDTH = 20;

// ball settings
var ball_X;
var ball_Y;
var ball_direction_X;
var ball_direction_Y;
var ball_speed_X;
var ball_speed_Y;
var BALL_RADIUS = 20;

function setup() {
  canvas = createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
  canvas.parent('game-container');
  background('#2dd5e3');

  player_Y = (CANVAS_HEIGHT / 2) - (PADDLE_HEIGHT / 2);
  ball_X = CANVAS_WIDTH / 2;
  ball_Y = CANVAS_HEIGHT / 2;
  ball_direction_X = (Math.random() < 0.7) ? -1 : 1;
  ball_direction_Y = (Math.random() < 0.5) ? -1 : 1;
  ball_speed_X = ball_direction_X * Math.floor(Math.random() * 6 + 3);
  ball_speed_Y = ball_direction_Y * Math.floor(Math.random() * 4 + 2);
}

function draw() {
  clear();
  draw_background();
  check_for_movement();
  draw_player_paddle();
  move_ball();
}

function draw_background() {
  background('#2dd5e3');
}

function check_for_movement() {
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player_Y -= 5;
    player_Y = max(player_Y, 0);
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player_Y += 5;
    player_Y = min(player_Y, CANVAS_HEIGHT - PADDLE_HEIGHT);
  }
}

function draw_player_paddle() {
  rect(20, player_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function move_ball() {
  ball_X += ball_speed_X;
  if (ball_X - BALL_RADIUS < 0 || ball_X + BALL_RADIUS > CANVAS_WIDTH) {
    ball_speed_X *= -1;
  }
  ball_Y += ball_speed_Y;
  if (ball_Y - BALL_RADIUS < 0 || ball_Y + BALL_RADIUS > CANVAS_HEIGHT) {
    ball_speed_Y *= -1;
  }
  ellipse(ball_X, ball_Y, BALL_RADIUS, BALL_RADIUS);
}
