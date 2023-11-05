let grid = [];
let total = 0;

function startGame() {
    // Reset the grid and total
    grid = [];
    total = 0;

    // Create a blank grid
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', i);
        square.onclick = () => addToGrid(i);
        gridContainer.appendChild(square);
    }

    // Display the result
    updateResult();

    // Roll the die and add the first number to the grid
    addToGrid(getRandomNumber());
}

function addToGrid(index) {
    const square = document.querySelector(`.square[data-index="${index}"]`);
    if (square.innerHTML === '') {
        const number = getRandomNumber();
        square.innerHTML = number;
        grid[index] = number;

        // Display the result
        updateResult();
    }
}

function updateResult() {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Total: ${calculateTotal()}`;
}

function calculateTotal() {
    total = grid.reduce((acc, val) => acc + (val || 0), 0);
    return total;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}
