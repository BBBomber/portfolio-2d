// Get canvas and context
const canvas = document.getElementById("pong-game");
const ctx = canvas.getContext("2d");

// Ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 7,
  velocityX: 5,
  velocityY: 5,
  color: "white",
};

// Paddle object
const paddleWidth = 10;
const paddleHeight = 100;

const player = {
  x: 0, // Left side
  y: (canvas.height - paddleHeight) / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  score: 0,
};

const computer = {
  x: canvas.width - paddleWidth, // Right side
  y: (canvas.height - paddleHeight) / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  score: 0,
};

// Draw a rectangle
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// Draw a circle
function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

// Draw the net
function drawNet() {
  for (let i = 0; i < canvas.height; i += 15) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
  }
}

// Draw everything
function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "black"); // Clear the canvas
  drawNet();
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(
    computer.x,
    computer.y,
    computer.width,
    computer.height,
    computer.color
  );
  drawCircle(ball.x, ball.y, ball.radius, ball.color);

  // Draw the scores
  ctx.fillStyle = "white";
  ctx.font = "32px Arial";
  ctx.fillText(player.score, canvas.width / 4, 50);
  ctx.fillText(computer.score, (3 * canvas.width) / 4, 50);
}

// Player control
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key === "ArrowDown") {
    downPressed = true;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "ArrowUp") {
    upPressed = false;
  } else if (e.key === "ArrowDown") {
    downPressed = false;
  }
});

// Move player paddle
function movePlayerPaddle() {
  if (upPressed && player.y > 0) {
    player.y -= 8;
  } else if (downPressed && player.y < canvas.height - player.height) {
    player.y += 8;
  }
}

// Simple AI to move the computer paddle
function moveComputerPaddle() {
  const centerOfPaddle = computer.y + computer.height / 2;

  if (centerOfPaddle < ball.y) {
    computer.y += 5; // Move down
  } else if (centerOfPaddle > ball.y) {
    computer.y -= 5; // Move up
  }
}

// Check if the ball hits a paddle
function paddleCollision(paddle) {
  return (
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.x + ball.radius > paddle.x &&
    ball.y + ball.radius > paddle.y &&
    ball.y - ball.radius < paddle.y + paddle.height
  );
}

// Handle ball-paddle collision
function handleCollisions() {
  // Player paddle
  if (paddleCollision(player)) {
    ball.velocityX = -ball.velocityX;
  }

  // Computer paddle
  if (paddleCollision(computer)) {
    ball.velocityX = -ball.velocityX;
  }
}

// Move ball
function moveBall() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // Bounce on top and bottom walls
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }
}

// Reset ball
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
}

// Check for scoring
function checkScore() {
  if (ball.x - ball.radius < 0) {
    computer.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    player.score++;
    resetBall();
  }
}

// Game loop
function gameLoop() {
  moveBall();
  movePlayerPaddle();
  moveComputerPaddle();
  handleCollisions();
  checkScore();
  draw();

  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
