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
                if (value < 1 || value > 9) {
                    alert("Please enter a number from 1 to 9.");
                    cell.value = ''; // Clear the input
                } else if (!cellCheck(row, col, value)) {
                    alert("This number violates Sudoku rules.");
                    cell.value = ''; // Clear the input
                } else {
                    cell.classList.add('num_color');
                    enteredValues[row][col] = value;
                }
            });

            sudoku.appendChild(cell);
        }
    }
}


function cellCheck(row, col, val) {
    for (let i = 0; i < 9; i++) {
        if (enteredValues[row][i] === val) {
            return false;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (enteredValues[i][col] === val) {
            return false;
        }
    }

    let r = Math.floor(row / 3) * 3;
    let c = Math.floor(col / 3) * 3;
    for (let i = r; i < r + 3; i++) {
        for (let j = c; j < c + 3; j++) {
            if (i >= 0 && i < 9 && j >= 0 && j < 9 && enteredValues[i][j] === val) {
                return false;
            }
        }
    }
    return true;
}


function solve() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (i >= 0 && i < 9 && j >= 0 && j < 9 && enteredValues[i][j] === 0) {
                for (let val = 1; val <= 9; val++) {
                    if (cellCheck(i, j, val)) {
                        enteredValues[i][j] = val;
                        if (solve()) {
                            return true;
                        }
                        enteredValues[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true; // Indicates that the puzzle is solved
}



function isSudokuSolved() {
    // Check if the Sudoku grid is completely filled
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (enteredValues[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

populateSudokuGrid();
doneButton.addEventListener('click', () => {
    // enteredValues[3][3] = 5;
    solve();
    populateSudokuGridWithValues();
    console.log(enteredValues);
});


function populateSudokuGridWithValues() {
    const cells = document.getElementsByClassName('sudoku-cell');
    let index = 0;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            cells[index].value = enteredValues[row][col].toString();
            index++;
        }
    }
}
