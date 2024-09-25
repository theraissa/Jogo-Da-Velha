const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
    } else if (gameState.includes('') === false) {
        statusDisplay.textContent = 'Empate!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Vez do jogador ${currentPlayer}`;
    }
};

const checkWinner = () => {
    return winningConditions.some((condition) => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
};

const restartGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Vez do jogador ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

statusDisplay.textContent = `Vez do jogador ${currentPlayer}`;
