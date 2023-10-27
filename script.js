const sudoku = document.getElementById('sudoku');
const doneButton = document.getElementById('done-button');

const numRows = 9;
const numCols = 9;

const enteredValues = [];

for (let i = 0; i < numRows; i++) {
    enteredValues[i] = [];
    for (let j = 0; j < numCols; j++) {
        enteredValues[i][j] = 0;
    }
}

// const enteredValues = new Array(9).fill(null).map(() => new Array(9).fill(null));

function populateSudokuGrid() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('input');
            cell.classList.add('sudoku-cell');
            cell.type = 'number';
            cell.min = 1;
            cell.max = 9;

            cell.addEventListener('change', () => {
                const value = parseInt(cell.value);
                if (value > 9) {
                    alert("Please enter a number from 1 to 9.");
                    cell.value = 9; // Limit the input to 9
                }
                enteredValues[row][col] = parseInt(cell.value) || 0;
            });

            sudoku.appendChild(cell);
        }
    }
}

doneButton.addEventListener('click', () => {
    console.log(enteredValues);
});

populateSudokuGrid();
