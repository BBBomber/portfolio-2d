// Snake Game Variables
let snakeCanvas = document.getElementById("snake-game");
let snakeCtx = snakeCanvas.getContext("2d");
let snake = [{ x: 200, y: 200 }];
let food = { x: 300, y: 300 };
let currentDirection = { x: 0, y: 0 }; // The current movement direction of the snake
let nextDirection = { x: 0, y: 0 }; // The next movement direction based on keypress
let snakeSpeed = 5; // Speed in cells per second
let snakeSize = 20;
let snakeIsRunning = false;
let snakeLastTime = 0; // Renamed lastTime to snakeLastTime
let timeAccumulator = 0; // Time between movement
let moveInterval = 1 / snakeSpeed; // Time between each movement in seconds

// Get overlays
const startMenu = document.getElementById("snake-start-menu");
const gameOver = document.getElementById("snake-game-over");
// Get buttons
const startButton = document.getElementById("snake-start-button");
const quitButton = document.getElementById("snake-quit-button");
const restartButton = document.getElementById("snake-restart-button");
const quitGameButton = document.getElementById("snake-quit-game");

const scoreSound = new Audio("sounds/bite.wav");
scoreSound.preload = "auto";

// Start Snake Game
export function startSnakeGame() {
  console.log("Starting Snake game..."); // Debugging output
  snake = [{ x: 200, y: 200 }];
  snakeSize = 20;
  currentDirection = { x: snakeSize, y: 0 }; // Start moving right
  nextDirection = { x: snakeSize, y: 0 }; // Next direction will also be right
  snakeIsRunning = true;
  startMenu.style.display = "none";
  quitGameButton.style.display = "block";
  snakeLastTime = 0; // Reset snakeLastTime
  timeAccumulator = 0; // Reset time accumulator
  // Properly start the game loop by passing the timestamp from requestAnimationFrame
  requestAnimationFrame(snakeGameLoop);
}

export function quitGame() {
  snakeIsRunning = false; // Stop the game loop
  startMenu.style.display = "flex"; // Show start menu again
  quitGameButton.style.display = "none"; // Hide quit button
  gameOver.style.display = "none"; // Hide game over
}

export function restartGame() {
  gameOver.style.display = "none"; // Hide game over
  startSnakeGame();
}

// Snake Game Loop with delta time
function snakeGameLoop(timestamp) {
  if (!snakeIsRunning) {
    console.log("Game is not running, stopping loop."); // Debugging output
    return;
  }

  // Calculate delta time
  if (!snakeLastTime || isNaN(snakeLastTime)) {
    console.log("Resetting snakeLastTime"); // Log if it's reset
    snakeLastTime = timestamp; // Initialize it to the current timestamp
  }

  const deltaTime = (timestamp - snakeLastTime) / 1000; // Convert to seconds

  if (isNaN(deltaTime) || deltaTime < 0) {
    console.error("Invalid deltaTime:", deltaTime); // Log the error
    snakeLastTime = timestamp; // Reset the timestamp if it's invalid
    return; // Skip this frame if deltaTime is invalid
  }

  snakeLastTime = timestamp;
  timeAccumulator += deltaTime;
  // Move the snake if enough time has passed
  while (timeAccumulator > moveInterval) {
    // Apply the nextDirection if it's not opposite of currentDirection
    if (
      nextDirection.x !== -currentDirection.x ||
      nextDirection.y !== -currentDirection.y
    ) {
      currentDirection = nextDirection;
    }

    moveSnake();

    timeAccumulator -= moveInterval; // Reduce accumulated time
  }

  // Draw everything
  drawSnake();
  drawFood();
  // Check for game over
  if (isGameOver()) {
    gameOver.style.display = "flex";
    snakeIsRunning = false;
    quitGameButton.style.display = "none";
    return;
  }

  // Continue the game loop
  requestAnimationFrame(snakeGameLoop);
}

// Move Snake
function moveSnake() {
  let head = {
    x: snake[0].x + currentDirection.x,
    y: snake[0].y + currentDirection.y,
  };

  snake.unshift(head); // Add new head
  if (head.x === food.x && head.y === food.y) {
    scoreSound.currentTime = 0; // Reset sound
    scoreSound.play(); // Play score sound
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

// Event Listeners
startButton.addEventListener("click", startSnakeGame);
quitButton.addEventListener("click", quitGame);
restartButton.addEventListener("click", restartGame);
quitGameButton.addEventListener("click", quitGame);

// Event listener for controlling the snake's direction
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (currentDirection.y === 0) {
        nextDirection = { x: 0, y: -snakeSize };
      }
      break;
    case "ArrowDown":
      if (currentDirection.y === 0) {
        nextDirection = { x: 0, y: snakeSize };
      }
      break;
    case "ArrowLeft":
      if (currentDirection.x === 0) {
        nextDirection = { x: -snakeSize, y: 0 };
      }
      break;
    case "ArrowRight":
      if (currentDirection.x === 0) {
        nextDirection = { x: snakeSize, y: 0 };
      }
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
