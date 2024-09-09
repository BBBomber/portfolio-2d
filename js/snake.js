// Snake Game Variables
let snakeCanvas = document.getElementById("snake-game");
let snakeCtx = snakeCanvas.getContext("2d");
let snake = [{ x: 200, y: 200 }];
let food = { x: 300, y: 300 };
let direction = { x: 0, y: 0 };
let snakeSpeed = 10;
let snakeSize = 20;
let snakeIsRunning = false;

// Start Snake Game
function startSnakeGame() {
  snake = [{ x: 200, y: 200 }];
  direction = { x: snakeSize, y: 0 };
  snakeIsRunning = true;
  document.getElementById("snake-start-menu").style.display = "none";
  document.getElementById("snake-quit-game").style.display = "block";
  snakeGameLoop();
}

document
  .getElementById("snake-restart-button")
  .addEventListener("click", function () {
    // Reset game state
    snake = [{ x: 200, y: 200 }];
    direction = { x: snakeSize, y: 0 };
    food = { x: 300, y: 300 };
    snakeIsRunning = true;

    // Hide the game over screen and restart the game loop
    document.getElementById("snake-game-over").style.display = "none";
    snakeGameLoop();
  });

document
  .getElementById("snake-quit-button")
  .addEventListener("click", function () {
    snakeIsRunning = false; // Stop the game
    document.getElementById("snake-game-over").style.display = "none"; // Hide the game over screen
    document.getElementById("snake-start-menu").style.display = "flex"; // Show the start menu again
  });

// Snake Game Loop
function snakeGameLoop() {
  if (!snakeIsRunning) {
    document.getElementById("snake-quit-game").style.display = "none"; // Hide quit button when the game stops
    return;
  }

  // Move the snake
  moveSnake();

  // Check for game over
  if (isGameOver()) {
    document.getElementById("snake-game-over").style.display = "flex";
    snakeIsRunning = false;
    document.getElementById("snake-quit-game").style.display = "none"; // Hide quit button when the game ends
    return;
  }

  // Draw everything
  drawSnake();
  drawFood();

  setTimeout(snakeGameLoop, 1000 / snakeSpeed); // Control speed
}

// Move Snake
function moveSnake() {
  let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  snake.unshift(head); // Add new head
  if (head.x === food.x && head.y === food.y) {
    generateFood(); // Eat food and generate new one
  } else {
    snake.pop(); // Remove the tail
  }
}

// Check if Game Over
function isGameOver() {
  let head = snake[0];
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= snakeCanvas.width ||
    head.y >= snakeCanvas.height
  ) {
    return true; // Snake hit wall
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true; // Snake hit itself
    }
  }
  return false;
}

// Draw Snake
function drawSnake() {
  snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height); // Clear the canvas
  snake.forEach((segment) => {
    snakeCtx.fillStyle = "green";
    snakeCtx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });
}

// Draw Food
function drawFood() {
  snakeCtx.fillStyle = "red";
  snakeCtx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// Generate New Food
function generateFood() {
  food.x =
    Math.floor(Math.random() * (snakeCanvas.width / snakeSize)) * snakeSize;
  food.y =
    Math.floor(Math.random() * (snakeCanvas.height / snakeSize)) * snakeSize;
}

// Event Listeners for Snake Game
document
  .getElementById("snake-start-button")
  .addEventListener("click", startSnakeGame);
document
  .getElementById("snake-quit-game")
  .addEventListener("click", () => location.reload());
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -snakeSize };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: snakeSize };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -snakeSize, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: snakeSize, y: 0 };
      break;
  }
});

function resizeCanvas() {
  const container = document.getElementById("snake-container");
  const canvas = document.getElementById("snake-game");

  // Set canvas size to match container
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  // Ensure the canvas size is an even number of pixels
  canvas.width = canvas.width - (canvas.width % 2);
  canvas.height = canvas.height - (canvas.height % 2);
}

window.addEventListener("keydown", function (e) {
  if (
    snakeIsRunning &&
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
  ) {
    e.preventDefault(); // Prevent scrolling only when the game is running
  }
});

window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);
