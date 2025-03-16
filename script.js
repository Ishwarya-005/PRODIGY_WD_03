let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const gameState = Array(9).fill('');
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] === '') {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      alert(`${currentPlayer} wins!`);
      resetGame();
    } else if (gameState.every(cell => cell !== '')) {
      alert("It's a draw!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function resetGame() {
  gameState.fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
}