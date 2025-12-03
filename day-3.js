const fs = require('fs');

// Read the entire input file as one line
// Adjust filename as needed
let input = fs.readFileSync("day-3.data.txt", "utf8").trim();
/*input = `987654321111111
811111111111119
234234234234278
818181911112111`;*/

const processLines = () => {
    return input.replaceAll('\r', '').split('\n').filter(v => v)
}
const getFirstMaxValueWithIndex = (line, startingFrom = 0, ignoreLastN = 0) => {
    const numbers = line.split('').map(v => +v);
    let numbersToCheck = numbers.length - ignoreLastN;
    const maxNr = Math.max(...numbers.slice(startingFrom, numbersToCheck));
    // ignore last number because double-digit is always larger any ways.
    let i = startingFrom;


    for (i; i < numbersToCheck; i++) {
        if (numbers[i] === maxNr) {
            return {nr: maxNr, index: i}
        }
    }
}
const debug = [];
const processLine = (line) => {
    // Never start from last digit.
    const firstDigit = getFirstMaxValueWithIndex( line, 0, 1 );
    const secondDigit = getFirstMaxValueWithIndex( line, firstDigit.index + 1);


    if (!firstDigit?.nr || !secondDigit?.nr) {
        console.log(firstDigit);
    }
    debug.push({nr: parseInt(firstDigit.nr + '' + secondDigit.nr, 10), input: line, firstDigit, secondDigit});
    return firstDigit.nr + '' + secondDigit.nr;
}
const run = () => {
    const lines = processLines();
    const result = lines.map(processLine)
    let sum = 0;
    debug.forEach((v) => {
        sum += v.nr;
    });

    return result.reduce((acc, curr) => {
        return acc + parseInt(curr, 10);
    }, 0);
}
// answer is 17445
console.log('Answer is: ', run());
