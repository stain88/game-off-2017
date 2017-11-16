// canvas settings
var canvas;
const CANVAS_HEIGHT = 640;
const CANVAS_WIDTH = 800;
var background_color;

// paddle settings
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 20;
var player_Y;
var player_speed;
var enemy_Y;
var enemy_speed;

// ball settings
const BALL_RADIUS = 20;
var ball_X;
var ball_Y;
var ball_direction_X;
var ball_direction_Y;
var ball_speed_X;
var ball_speed_Y;

function setup() {

  // Set up canvas
  canvas = createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
  canvas.parent('game-container');
  background_color = '#2dd5e3';

  // Set up player paddle
  player_Y = (CANVAS_HEIGHT / 2) - (PADDLE_HEIGHT / 2);
  player_speed = 5;

  // Set up ball
  ball_X = CANVAS_WIDTH / 2;
  ball_Y = CANVAS_HEIGHT / 2;
  ball_direction_X = (Math.random() < 0.7) ? -1 : 1;
  ball_direction_Y = (Math.random() < 0.5) ? -1 : 1;
  ball_speed_X = ball_direction_X * Math.floor(Math.random() * 6 + 3);
  ball_speed_Y = ball_direction_Y * Math.floor(Math.random() * 4 + 2);

  // Set up enemy paddle
  enemy_Y = (CANVAS_HEIGHT / 2) - (PADDLE_HEIGHT / 2);
  enemy_speed = 5;
}

function draw() {
  clear();
  draw_background();
  check_for_movement();
  draw_player_paddle();
  move_ball();
  draw_enemy_paddle();
}

function draw_background() {
  background(background_color);
}

function check_for_movement() {
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player_Y -= player_speed;
    player_Y = max(player_Y, 0);
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player_Y += player_speed;
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

function draw_enemy_paddle() {
  var height_diff_with_ball = ball_Y - (enemy_Y + PADDLE_HEIGHT / 2);
  if (height_diff_with_ball >= 5) {
    enemy_Y += enemy_speed;
    enemy_Y = min(enemy_Y, CANVAS_HEIGHT - PADDLE_HEIGHT);
  } else if (height_diff_with_ball <= -5) {
    enemy_Y -= enemy_speed;
    enemy_Y = max(enemy_Y, 0);
  }
  rect(CANVAS_WIDTH - PADDLE_WIDTH - 20, enemy_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
}
