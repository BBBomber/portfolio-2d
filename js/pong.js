// Get canvas and context
const canvas = document.getElementById("pong-game");
const ctx = canvas.getContext("2d");

// Get overlays and buttons
const startMenu = document.getElementById("start-menu");
const startButton = document.getElementById("start-button");
const quitButton = document.getElementById("quit-button");
const restartButton = document.getElementById("restart-button");
const finalScore = document.getElementById("final-score");
const quitGameButton = document.getElementById("quit-game");

// Load sound effects
const bounceSound = new Audio("sounds/bounce.wav");
const scoreSound = new Audio("sounds/score.wav");

// Ensure sounds play only once per collision
bounceSound.preload = "auto";
scoreSound.preload = "auto";

// Game state
let isGameRunning = false; // Flag to check if game is running

// Ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 550, // Increase this speed for faster movement
  velocityX: 300, // Set a higher initial velocityX for faster horizontal movement
  velocityY: 200, // Set a higher initial velocityY for faster vertical movement
  color: "white",
};
// Paddle object
const paddleWidth = 10;
const paddleHeight = 50;

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

// Draw a rectangle (for paddles, net, etc.)
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// Draw a circle (for the ball)
function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

// Draw the net in the middle of the canvas
function drawNet() {
  for (let i = 0; i < canvas.height; i += 15) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
  }
}

// Draw everything in the game
function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "black"); // Clear the canvas
  drawNet(); // Draw the middle net
  drawRect(player.x, player.y, player.width, player.height, player.color); // Player paddle
  drawRect(
    computer.x,
    computer.y,
    computer.width,
    computer.height,
    computer.color
  ); // Computer paddle
  drawCircle(ball.x, ball.y, ball.radius, ball.color); // Ball

  // Display the scores
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

function movePlayerPaddle(deltaTime) {
  const paddleSpeed = 400; // Increase the paddle speed for faster movement
  if (upPressed && player.y > 0) {
    player.y -= paddleSpeed * deltaTime;
  } else if (downPressed && player.y < canvas.height - player.height) {
    player.y += paddleSpeed * deltaTime;
  }
}

function moveComputerPaddle(deltaTime) {
  const paddleCenter = computer.y + computer.height / 2;
  const aiSpeed = 350; // Increase AI paddle speed for faster reaction
  if (paddleCenter < ball.y - 35) {
    computer.y += aiSpeed * deltaTime;
  } else if (paddleCenter > ball.y + 35) {
    computer.y -= aiSpeed * deltaTime;
  }

  // Ensure the paddle stays within the canvas
  if (computer.y < 0) {
    computer.y = 0;
  } else if (computer.y + computer.height > canvas.height) {
    computer.y = canvas.height - computer.height;
  }
}

function moveBall(deltaTime) {
  // Log deltaTime to ensure it's valid
  console.log("DeltaTime:", deltaTime);

  // Ensure deltaTime is not NaN or too small (avoid division by zero or tiny values)
  if (isNaN(deltaTime) || deltaTime < 0.001) {
    deltaTime = 0.016; // Approximate frame time for 60 FPS
  }

  // Update ball position
  ball.x += ball.velocityX * deltaTime;
  ball.y += ball.velocityY * deltaTime;

  // Ensure ball's position doesn't become NaN
  if (isNaN(ball.x) || isNaN(ball.y)) {
    console.error("Ball position became NaN, resetting ball.");
    resetBall();
  }

  // Bounce off top and bottom walls
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
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

function handleCollisions() {
  // Player paddle
  if (paddleCollision(player)) {
    ball.velocityX = -ball.velocityX;

    // Adjust the velocityY based on where it hit the paddle
    let collidePoint = ball.y - (player.y + player.height / 2);
    collidePoint = collidePoint / (player.height / 2);
    let angleRad = (Math.PI / 4) * collidePoint;
    let direction = ball.velocityX > 0 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    // Move the ball slightly away from the paddle to avoid getting stuck
    ball.x = player.x + player.width + ball.radius;

    bounceSound.currentTime = 0;
    bounceSound.play();
  }

  // Computer paddle
  if (paddleCollision(computer)) {
    ball.velocityX = -ball.velocityX;

    // Adjust the velocityY based on where it hit the paddle
    let collidePoint = ball.y - (computer.y + computer.height / 2);
    collidePoint = collidePoint / (computer.height / 2);
    let angleRad = (Math.PI / 4) * collidePoint;
    let direction = ball.velocityX > 0 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    // Move the ball slightly away from the paddle to avoid getting stuck
    ball.x = computer.x - ball.radius;

    bounceSound.currentTime = 0;
    bounceSound.play();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  // Ensure that ball's direction is randomized a little after reset to make it less predictable
  ball.velocityX = ((Math.random() > 0.5 ? 1 : -1) * ball.speed) / 2; // Ensure velocity matches speed
  ball.velocityY = ((Math.random() > 0.5 ? 1 : -1) * ball.speed) / 2; // Ensure velocity matches speed
}

// Check for scoring
function checkScore() {
  if (ball.x - ball.radius < 0) {
    computer.score++;
    ball.speed += 20;
    scoreSound.currentTime = 0; // Reset sound
    scoreSound.play(); // Play score sound
    resetBall();
    checkGameOver();
  } else if (ball.x + ball.radius > canvas.width) {
    player.score++;
    ball.speed += 20;
    scoreSound.currentTime = 0; // Reset sound
    scoreSound.play(); // Play score sound
    resetBall();
    checkGameOver();
  }
}

// Check if game over
function checkGameOver() {
  const maxScore = 5;
  if (player.score >= maxScore || computer.score >= maxScore) {
    isGameRunning = false;
    showGameOver();
  }
}

// Show Game Over Overlay
function showGameOver() {
  finalScore.textContent = `Final Score - Player: ${player.score} | Computer: ${computer.score}`;
  document.getElementById("game-over").style.display = "flex";
  quitGameButton.style.display = "none";
}

// Hide Overlays and Start Game
function startGame() {
  console.log("Start Game button clicked"); // Debugging output
  player.score = 0;
  computer.score = 0;
  // Reset paddle positions
  player.y = (canvas.height - paddleHeight) / 2;
  computer.y = (canvas.height - paddleHeight) / 2; // Reset the computer paddle position
  //
  ball.speed = 550;
  resetBall();
  isGameRunning = true;
  startMenu.style.display = "none";
  document.getElementById("game-over").style.display = "none";
  quitGameButton.style.display = "block";
  lastTime = 0;
  console.log("Game loop starting..."); // Debugging output
  gameLoop();
}

// Quit Game and Show Start Menu
function quitGame() {
  isGameRunning = false; // Stop the game loop
  startMenu.style.display = "flex"; // Show start menu again
  quitGameButton.style.display = "none"; // Hide quit button
  document.getElementById("game-over").style.display = "none"; // Hide game over
}

// Restart Game from Game Over
function restartGame() {
  document.getElementById("game-over").style.display = "none";
  startGame();
}

// Game loop with delta time
let lastTime = 0; // Global variable to track the last time

function gameLoop(timestamp) {
  if (!isGameRunning) {
    console.log("Game is not running, stopping loop."); // Debugging output
    return;
  }

  if (!lastTime) lastTime = timestamp;
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  console.log("Ball Position:", ball.x, ball.y); // Track ball position
  moveBall(deltaTime);
  movePlayerPaddle(deltaTime);
  moveComputerPaddle(deltaTime);
  handleCollisions();
  checkScore();
  draw();

  requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
  const container = document.getElementById("pong-container");
  const canvas = document.getElementById("pong-game");

  // Set canvas size to match container
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  // Ensure the canvas size is an even number of pixels
  canvas.width = canvas.width - (canvas.width % 2);
  canvas.height = canvas.height - (canvas.height % 2);
}

// Event listeners for buttons
startButton.addEventListener("click", startGame);
quitButton.addEventListener("click", quitGame);
restartButton.addEventListener("click", restartGame);
quitGameButton.addEventListener("click", quitGame);
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

window.addEventListener("keydown", function (e) {
  if (
    isGameRunning &&
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
  ) {
    e.preventDefault(); // Prevent scrolling only when the game is running
  }
});

// Initial draw to show the canvas cleared
draw();
