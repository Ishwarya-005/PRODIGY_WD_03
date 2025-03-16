let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const xWinsElement = document.getElementById('x-wins');
const oWinsElement = document.getElementById('o-wins');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');
const gameState = Array(9).fill('');
let xWins = 0;
let oWins = 0;

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', resetGame);

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] === '') {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
      updateStatus(`${currentPlayer} wins!`);
      updateWins(currentPlayer);
      winnerMessage.textContent = `${currentPlayer} wins!`; 
      
      disableCells(); 
    } else if (gameState.every(cell => cell !== '')) {
      updateStatus("It's a draw!");
      winnerMessage.textContent = "It's a draw!"; 
      disableCells(); 
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function updateStatus(message) {
  statusText.textContent = message;
}

function updateWins(winner) {
  if (winner === 'X') {
    xWins++;
    xWinsElement.textContent = xWins;
  } else if (winner === 'O') {
    oWins++;
    oWinsElement.textContent = oWins;
  }
}

function disableCells() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleCellClick); 
  });
}

function resetGame() {
  gameState.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleCellClick); 
  });
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  winnerMessage.textContent = ''; 
}