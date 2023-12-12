let clickCount = 0;

function toggleCell(row, col) {
  toggleSingleCell(row, col);
  toggleSingleCell(row - 1, col);
  toggleSingleCell(row + 1, col);
  toggleSingleCell(row, col - 1);
  toggleSingleCell(row, col + 1);

  checkWin();
  updateClickCount();
}

function toggleSingleCell(row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`);
  if (cell) {
    cell.classList.toggle("is-off");
  }
}

function checkWin() {
  const allCells = document.querySelectorAll(".cell");
  const allOff = [...allCells].every((cell) =>
    cell.classList.contains("is-off")
  );

  if (allOff) {
    displayWinMessage();
  }
}

function updateClickCount() {
  if (!document.querySelector(".win-message")) {
    clickCount++;
    document.getElementById("clickCount").innerText = clickCount;
  }
}

function displayWinMessage() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
        <div class="modal-content">
            <p>Hurrah! You Won!</p>
            <button id="restartButton">Restart Game</button>
        </div>
    `;

  document.body.appendChild(modal);

  document.getElementById("restartButton").addEventListener("click", () => {
    // Refresh the page to restart the game
    window.location.reload();
  });

  // If the user clicks outside the modal, close it without refreshing
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
      initializeBoard();
      clickCount = 0;
      document.getElementById("clickCount").innerText = clickCount;
    }
  });
}

function initializeBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  clickCount = 0;
  document.getElementById("clickCount").innerText = clickCount;

  // Create a 5x5 grid with all cells turned off initially
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${i}-${j}`;
      cell.addEventListener("click", () => toggleCell(i, j));

      board.appendChild(cell);
    }
  }

  // Simulate random clicks on the board to create a solvable puzzle
  for (let i = 0; i < 10; i++) {
    const randomRow = Math.floor(Math.random() * 5);
    const randomCol = Math.floor(Math.random() * 5);
    toggleCell(randomRow, randomCol);
  }
}

window.addEventListener("load", initializeBoard);
