window.onload = function() {
    const matrixTable = document.getElementById('matrixTable');
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `cell-${i}-${j}`;
            input.min = 1;
            input.max = 9;
            input.placeholder = "0";
            input.required = true;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        matrixTable.appendChild(row);
    }
    console.log('Table has been generated!');
};

function getMatrixValues() {
    let matrix = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            let value = parseInt(cell.value) || 0;
            row.push(value);
        }
        matrix.push(row);
    }
    console.log(matrix);
    return matrix;
}

function isValid(matrix, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (matrix[row][i] === num) {
            return false;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (matrix[i][col] === num) {
            return false;
        }
    }
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(matrix) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (matrix[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(matrix, row, col, num)) {
                        matrix[row][col] = num;
                        if (solveSudoku(matrix)) {
                            return true;
                        }
                        matrix[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function updateTable(matrix) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.value = matrix[i][j];
        }
    }
}

function solve() {
    let matrix = getMatrixValues();
    if (solveSudoku(matrix)) {
        updateTable(matrix);
    } else {
        alert("No solution exists for the given Sudoku puzzle.");
    }
}
