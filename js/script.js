const gameState = {
  level: 1,
  steps: 0,
  time: 0,
  player: { row: 1, col: 1 },
  exit: { row: 8, col: 8 },
  maze: [],
  timer: null,
};

const mazePatterns = [
  // Level 1
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  //  Level 2
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  // Level 3
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  //  Level 4
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  // Level 5
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  //  Level 6
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
];

function initGame() {
  const patternIndex = gameState.level - 1;
  if (patternIndex >= mazePatterns.length) {
    document.getElementById("message").textContent =
      "🎉 You finished all levels!";
    return;
  }

  gameState.maze = JSON.parse(JSON.stringify(mazePatterns[patternIndex]));
  gameState.steps = 0;
  gameState.time = 0;
  gameState.player = { row: 1, col: 1 };
  gameState.exit = { row: 8, col: 8 };

  renderMaze();
  updateStats();

  clearInterval(gameState.timer);
  gameState.timer = null;
  
  document.getElementById(
    "message"
  ).textContent = `Level ${gameState.level} started!`;
}

function renderMaze() {
  const mazeEl = document.getElementById("maze");
  mazeEl.style.gridTemplateColumns = `repeat(10, 1fr)`;
  mazeEl.innerHTML = "";
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if (gameState.maze[r][c] === 1) {
        cell.classList.add("wall");
        cell.textContent = "🧱";
      } else {
        cell.classList.add("path");
        if (r === gameState.player.row && c === gameState.player.col) {
          cell.classList.add("player");
          cell.textContent = "🙂";
        } else if (r === gameState.exit.row && c === gameState.exit.col) {
          cell.classList.add("exit");
          cell.textContent = "🚩";
        }
      }
      mazeEl.appendChild(cell);
    }
  }
}

function updateStats() {
  document.getElementById("time").textContent = gameState.time;
  document.getElementById("steps").textContent = gameState.steps;
}

function move(dir) {
  let { row, col } = gameState.player;
  if (dir === "up") row--;
  if (dir === "down") row++;
  if (dir === "left") col--;
  if (dir === "right") col++;

  if (gameState.maze[row][col] === 0) {
    gameState.player = { row, col };
    gameState.steps++;
    renderMaze();
    updateStats();

    if (row === gameState.exit.row && col === gameState.exit.col) {
      clearInterval(gameState.timer);
      gameState.timer = null;
      document.getElementById("message").textContent = "🎉 Level Complete!";
      setTimeout(() => {
        gameState.level++;
        initGame();
      }, 1500);
    }
  } else if (gameState.maze[row][col] === 1) {
    clearInterval(gameState.timer);
    document.getElementById("message").textContent =
      "💀 You Died! Restarting level...";
    setTimeout(() => {
      resetGame();
    }, 1500);
  }

  if (!gameState.timer) {
    gameState.timer = setInterval(() => {
      gameState.time++;
      updateStats();
    }, 1000);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") move("up");
  if (e.key === "ArrowDown") move("down");
  if (e.key === "ArrowLeft") move("left");
  if (e.key === "ArrowRight") move("right");
});

function resetGame() {
  initGame();
}

function giveHint() {
  const { row, col } = gameState.player;
  const { row: exitRow, col: exitCol } = gameState.exit;

  let hintMsg = "";

  if (row < exitRow) hintMsg += "⬇️ Go down ";
  if (row > exitRow) hintMsg += "⬆️ Go up ";
  if (col < exitCol) hintMsg += "➡️ Go right ";
  if (col > exitCol) hintMsg += "⬅️ Go left ";

  if (!hintMsg) hintMsg = "🎉 You're already at the exit!";
  document.getElementById("message").textContent = "Hint: " + hintMsg;
}

//reset btn for replay the game or level
document.getElementById("replayBtn").addEventListener("click", () => {
  resetGame();
});

//hint btn for show hint message for player
document.getElementById("hintBtn").addEventListener("click", () => {
  giveHint();
});

document.addEventListener("DOMContentLoaded", initGame);
