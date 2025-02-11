const board = document.getElementById("board");
const winnerText = document.getElementById("winner");
const restartButton = document.getElementById("restartButton");
const menu = document.getElementById("menu");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let gameMode = ""; // 'friend' or 'ai'

function startGame(mode) {
    gameMode = mode;
    menu.style.display = "none"; // Hide the menu
    board.style.display = "grid"; // Show the board
    restartButton.style.display = "inline-block"; // Show restart button
    createBoard();
}

function createBoard() {
    board.innerHTML = "";
    cells.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.innerText = value || "";
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (!cells[index] && !checkWinner()) {
        cells[index] = currentPlayer;
        createBoard();
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (gameMode === "ai" && currentPlayer === "O") {
                setTimeout(aiMove, 500); // AI moves after a short delay
            }
        }
    }
}

function aiMove() {
    let emptyCells = cells.map((value, index) => value === null ? index : null).filter(v => v !== null);
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        cells[randomIndex] = "O";
        createBoard();
        checkWinner();
        currentPlayer = "X";
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            winnerText.innerText = `Winner: ${cells[a]}`;
            return true;
        }
    }
    if (!cells.includes(null)) {
        winnerText.innerText = "It's a Draw!";
        return true;
    }
    return false;
}

function resetGame() {
    cells = Array(9).fill(null);
    currentPlayer = "X";
    winnerText.innerText = "";
    createBoard();
}

