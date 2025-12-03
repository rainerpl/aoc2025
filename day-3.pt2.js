const fs = require('fs');

let input = fs.readFileSync("day-3.data.txt", "utf8").trim();
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
const processLine = (line) => {
    let i;
    const digits = [];
    let digitStr = '';
    let indexTracker = 0;
    for (i = 0; i < 12; i++) {
        const res = getFirstMaxValueWithIndex( line, indexTracker, 11 - digits.length);
        indexTracker = res.index + 1;
        digitStr += res.nr;
        digits.push(res);
    }
    return digitStr;
}
const run = () => {
    const lines = processLines();
    const result = lines.map(processLine)
    return result.reduce((acc, curr) => {
        return acc + parseInt(curr, 10);
    }, 0);
}
console.log('Answer is: ', run());
