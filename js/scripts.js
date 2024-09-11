document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("life-canvas");
  const ctx = canvas.getContext("2d");

  let grid;
  let updateSpeed = 200; // Default speed in milliseconds
  const speedControl = document.getElementById("speed-control");
  const playPauseBtn = document.getElementById("play-pause-btn");

  let gameInterval;
  let isPaused = false; // To track if the game is paused
  const cellSize = 8; // Smaller cell size for more grid cells
  let cols, rows;

  // Initialize the canvas to fill the screen
  function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / cellSize);
    rows = Math.floor(canvas.height / cellSize);
    grid = createGrid(); // Create the grid when resizing
  }

  // Create the grid (with random initial state)
  function createGrid() {
    const arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < rows; j++) {
        arr[i][j] = Math.floor(Math.random() * 2); // Random 0 or 1
      }
    }
    return arr;
  }

  // Create an empty grid (all cells dead)
  function createEmptyGrid() {
    const arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < rows; j++) {
        arr[i][j] = 0; // All cells are dead
      }
    }
    return arr;
  }

  // Draw the grid on the canvas
  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * cellSize;
        const y = j * cellSize;
        if (grid[i][j] === 1) {
          ctx.fillStyle = "#5F9EA0"; // Change to your desired color
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }
  }

  // Get the next state of the grid (Conway's rules)
  function getNextState() {
    const newGrid = createEmptyGrid();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const neighbors = countNeighbors(grid, i, j);
        if (grid[i][j] === 0 && neighbors === 3) {
          newGrid[i][j] = 1; // Cell becomes alive
        } else if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
          newGrid[i][j] = 0; // Cell dies
        } else {
          newGrid[i][j] = grid[i][j]; // Cell remains the same
        }
      }
    }
    return newGrid;
  }

  // Count neighbors for Conway's Game of Life
  function countNeighbors(grid, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const col = (x + i + cols) % cols;
        const row = (y + j + rows) % rows;
        count += grid[col][row];
      }
    }
    count -= grid[x][y]; // Subtract the cell itself from the count
    return count;
  }

  // Game loop for Conway's Game of Life
  function gameLoop() {
    if (!isPaused) {
      grid = getNextState(); // Update the grid state
      drawGrid(); // Render the updated grid
    }
  }

  // Add a live cell on click
  canvas.addEventListener("click", function (e) {
    const x = Math.floor(e.clientX / cellSize);
    const y = Math.floor(e.clientY / cellSize);
    grid[x][y] = 1; // Make the clicked cell alive
    drawGrid(); // Immediately update the grid
  });

  // Speed control event listener
  speedControl.addEventListener("input", function (e) {
    const speedValue = e.target.value;

    if (speedValue == 0) {
      isPaused = true;
      playPauseBtn.textContent = "Play";
    } else {
      const reversedSpeed = 1000 - speedValue; // Flip the speed value
      updateSpeed = Math.max(reversedSpeed, 10); // Ensure a minimum speed
      isPaused = false; // If speed is > 0, unpause
      playPauseBtn.textContent = "Pause";
      clearInterval(gameInterval); // Clear the previous interval
      gameInterval = setInterval(gameLoop, updateSpeed); // Set new speed
    }
  });

  // Reset Automata: Generates a new random grid
  document.getElementById("reset-btn").addEventListener("click", function () {
    grid = createGrid(); // Create a new random grid
    drawGrid(); // Render the new grid
  });

  // Clear Automata: Clears all cells and pauses the game
  document.getElementById("clear-btn").addEventListener("click", function () {
    grid = createEmptyGrid(); // Create an empty grid
    drawGrid(); // Render the empty grid
    isPaused = true; // Pause the game
    //speedControl.value = 0; // Set the speed control to 0 (paused)
    playPauseBtn.textContent = "Play";
    clearInterval(gameInterval); // Stop the game loop
  });

  // Play/Pause Button logic
  playPauseBtn.addEventListener("click", function () {
    isPaused = !isPaused;
    playPauseBtn.textContent = isPaused ? "Play" : "Pause";

    if (!isPaused) {
      clearInterval(gameInterval);
      gameInterval = setInterval(gameLoop, updateSpeed); // Resume the game
    } else {
      clearInterval(gameInterval); // Pause the game loop
    }
  });

  // Initialize canvas size and start the game
  updateCanvasSize();
  window.addEventListener("resize", updateCanvasSize); // Resize handler

  // Start Conway's Game of Life at the default speed
  gameInterval = setInterval(gameLoop, updateSpeed);
});
