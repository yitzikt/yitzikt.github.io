let selectedCells = [];
const cells = document.body.querySelectorAll('.cell');

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function () {
        // Ignore if the cell is blank (has no dataset value)
        if (!this.dataset.value) return;
        // clicking the selected should deselect it
        if(this.classList.contains('selected')){
            this.classList.remove('selected');
            selectedCells = [];
            return;
        }
        //  checking if move is valid
        if (selectedCells.length === 1) {
            const { row: firstRow, column: firstColumn, value: firstValue } = selectedCells[0].dataset;
            const { row: thisRow, column: thisColumn, value: thisValue } = this.dataset;
            if (Number(thisValue) + Number(firstValue) > 15) {
                return
            }
            // checking that it's in a neighboring cell
            if (!(thisColumn === firstColumn || thisRow === firstRow)) {
                return;
            }
            if (!(Math.abs(thisColumn - firstColumn) === 1 || (Math.abs(thisRow - firstRow) === 1))) {
                return;
            }
        }

        if (selectedCells.length < 2 && !this.classList.contains('selected')) {
            this.classList.add('selected');
            selectedCells.push(this);
        } else if (this.classList.contains('selected')) {
            this.classList.remove('selected');
            selectedCells = selectedCells.filter(c => c !== this);
        }

        if (selectedCells.length === 2) {
            const [firstCell, secondCell] = selectedCells;
            const firstValue = parseInt(firstCell.dataset.value, 10);
            const secondValue = parseInt(secondCell.dataset.value, 10);
            const sum = firstValue + secondValue;

            const rectFirst = firstCell.getBoundingClientRect();
            const rectSecond = secondCell.getBoundingClientRect();
            const translateX = rectFirst.left - rectSecond.left;
            const translateY = rectFirst.top - rectSecond.top;

            secondCell.style.transform = `translate(${translateX}px, ${translateY}px)`;

            setTimeout(() => {
                firstCell.dataset.value = sum;
                firstCell.textContent = sum;
                secondCell.dataset.value = '';
                secondCell.textContent = '';
                secondCell.style.transform = ''; // Reset the transform property to clear the animation

                selectedCells.forEach(cell => cell.classList.remove('selected'));
                selectedCells = [];
                highlight15();
                checkForWin();
            }, 300);  // Duration of the transition in the CSS
        }
    });
});


function highlight15(){
    cells.forEach(cell => {
        if(Number(cell.dataset.value) === 15){
            cell.classList.add('fifteen');
        }
    })
}

function checkForWin() {
    const values = Array.from(cells).map(cell => parseInt(cell.dataset.value, 10) || 0);
    if (values.filter(num => num === 15).length === 3) {
        alert('congrats you won!!!!!!!!')

        let diagonalTopRight = 0;
        let diagonalTopLeft = 0;
        for (let i = 0; i < 3; i++) {
            let rows = 0;
            let columns = 0;
            for (let j = 0; j < 3; j++) {
                rows += values[i + j];
                columns += values[i * 3 + i];
            }
            diagonalTopRight += i * 3 + 3 - i;
            diagonalTopLeft += i * 3 + i;
            if (rows === 45 || columns === 45) {
                alert('Congratulations, you won! double');
                break;
            }
        }
        // resetGame();
    }
}


function generateRandomArray(size) {
    const originalArray = Array.from({ length: size }, (_, index) => index + 1);
    for (let i = originalArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [originalArray[i], originalArray[j]] = [originalArray[j], originalArray[i]];
    }
    return originalArray;
}

function resetGame() {
    const randomNums = generateRandomArray(9);
    // const randomNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // const randomNums = [1, 2, 3, 4, 7, 6, 5, 8, 9];
    // const randomNums = [2, 1, 3, 4, 7, 6, 9, 8, 5];
    cells.forEach((cell, index) => {
        cell.textContent = randomNums[index];
        cell.dataset.value = randomNums[index];
        cell.classList.remove('selected');
        cell.classList.remove('fifteen');
        selectedCells = [];
    });

}

resetGame();
