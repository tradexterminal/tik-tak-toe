let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const gameBoardElement = document.querySelector('.board');
const gameOverMessageElement = document.querySelector('.game-over');

gameBoardElement.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cell')) return;

    const cellIndex = e.target.dataset.index;
    if (board[cellIndex] !== '') return;

    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer === 'X' ? 'X' : 'O';

    checkForWin();
    changePlayer();

    if (gameOver()) {
        gameOverMessageElement.textContent = `Game Over! Player ${getWinner()} wins!`;
    }
});

document.getElementById('new-game-button').addEventListener('click', () => {
    resetGame();
});

function checkForWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        if (
            board[combination[0]] === currentPlayer &&
            board[combination[1]] === currentPlayer &&
            board[combination[2]] === currentPlayer
        ) {
            return true;
        }
    }

    return false;
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function gameOver() {
    for (const cell of board) {
        if (cell === '') return false;
    }
    return true;
}

function getWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        if (
            board[combination[0]] === currentPlayer &&
            board[combination[1]] === currentPlayer &&
            board[combination[2]] === currentPlayer
        ) {
            return currentPlayer;
        }
    }

    if (board.every(cell => cell !== '')) {
        return 'Tie';
    }

    return null;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameBoardElement.innerHTML = '';
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = '';
        if (index % 3 === 0 && index !== 0) {
            gameBoardElement.appendChild(document.createElement('div')).classList.add('board-row');
        }
        if (index % 3 === 2 && index !== 6) {
            gameBoardElement.appendChild(document.createElement('div')).classList.add('board-row');
        }
        cell.dataset.index = index;
    });
}
