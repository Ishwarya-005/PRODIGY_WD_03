let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;
  if (cell.textContent === '') {
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}