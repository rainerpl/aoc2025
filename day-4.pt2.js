const fs = require('fs');
let input = fs.readFileSync("day-4.data.txt", "utf8").trim();

const processInput = (input) => {
    return input.replaceAll('\r', '').split('\n').filter(v => v).map(row => row.split(''));
}

const inputRows = processInput(input);
const inputCopy = processInput(input);
const checkValuesFromGridIndex = (col, row) => {
    const searchAreaSize = 3;
    const distanceFromCenter = (searchAreaSize - 1) / 2;
    if (inputRows[row][col] !== '@') {
        // no roll here at all
        return false;
    }
    let currentRowIndex = row - distanceFromCenter;
    let endingRowIndex = row + distanceFromCenter;
    let nrOfRolls = 0;
    while (currentRowIndex <= endingRowIndex ) {
        let currentColIndex = col - distanceFromCenter;
        let endingColIndex = col + distanceFromCenter;
        while (currentColIndex <= endingColIndex ) {

            if (currentColIndex !== col || currentRowIndex !== row) {
                // adjacent block
                if (inputRows[currentRowIndex] && inputRows[currentRowIndex][currentColIndex] === '@') {
                    nrOfRolls += 1;
                    inputCopy[currentRowIndex][currentColIndex] = 'x';
                } else if (inputCopy[currentRowIndex] ) {
                    inputCopy[currentRowIndex][currentColIndex] = '-';
                }
            } else {
                inputCopy[currentRowIndex][currentColIndex] = 'o';
            }
            currentColIndex++;
        }
        currentRowIndex++;
    }
    if (nrOfRolls < 4) {
        inputRows[row][col] = '.'
        return true;
    }
    return false;
}

const removeRolls = () => {
    let count = 0;
    inputRows.forEach((row, rowIndex) => {
        let colIndex = 0;
        for (colIndex = 0; colIndex < row.length; colIndex++) {
            const res = checkValuesFromGridIndex(colIndex,rowIndex);
            if (res) {
                count += 1;
            }
        }
    });
    return count;
    // console.log(' Count is: ', count);
}
const runUntilEnd = () => {
    let breaker = 100000;
    let rollsRemovedTotal = 0;
    while (breaker > 0) {
        breaker--;
        const rollsRemoved = removeRolls();
        if (!rollsRemoved) {
            break;
        }
        rollsRemovedTotal += rollsRemoved;
    }
    console.log('rollsRemovedTotal', rollsRemovedTotal)
}
runUntilEnd();
//checkValuesFromGridIndex(1,1)
//console.log(' Count is: ', inputCopy);
