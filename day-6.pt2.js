const fs = require('fs');
let input = fs.readFileSync("day-6.data.txt", "utf8")
const LAST_COL_LENGTH = 3; // I'll hard code this because my IDE keeps fighting with whitespaces, and I don't bother
const processInput = () => {
    input = input.replaceAll('\r', '').split(/\n/).filter(v => v);
    const data = {rows: [], cols: [], operators: []}
    const operatorLine = input.filter(i => i.includes('*') ||i.includes('+'))[0];
    const operatorLineIndex = input.indexOf(operatorLine);
    let colPatterns = operatorLine.matchAll(/\* *|\+ */gi);
    colPatterns = [...colPatterns];
    input.splice(operatorLineIndex, 1);
    input.forEach((rowStr, rowIndex) => {
        const row = [];
        colPatterns.forEach((colPattern, colPatternIndex) => {
            const isLastCol = colPatternIndex === colPatterns.length - 1;
            const offset = isLastCol ? 0 : -1;
            const numStartIndex = colPattern.index;
            const numLen = isLastCol ? LAST_COL_LENGTH : colPattern[0].length + offset;
            const numStr = rowStr.slice(numStartIndex, numStartIndex + numLen);
            row.push(numStr);
        });
        data.rows.push(row);
    });
    const nrOfCols = data.rows[0].length;
    let colNr;
    for (colNr = 0; colNr < nrOfCols; colNr++) {
        const col = [];
        data.rows.forEach((row, rowIndex) => {
            col.push(row[colNr]);
        });
        data.cols.push(col);
    }
    data.parsedCols = [];
    data.cols.forEach((colArray) => {
        const numLen = colArray[0].length;
        const newCol = [];
        let i;
        for (i = numLen - 1; i > -1; i--) {
            const num = [];
            colArray.forEach((numStr) => {
                const digit = numStr[i];
                if (digit !== undefined) {
                    num.push(digit);
                }
            })
            newCol.push(Number(num.join('')));
        }
        data.parsedCols.push(newCol);
    });

    const calc = (n1, n2, operator) => {
        switch (operator) {
            case '+': return n1 + n2;
            case '*': return n1 * n2;
        }
    }
    const operators = operatorLine.split(/ +/gi);
    const totals = data.parsedCols.map((numbers, colIndex) => {
        const operator = operators[colIndex];
        let total = numbers.shift();
        while (numbers.length) {
            let num = numbers.shift();
            total = calc(total, num, operator);
        }
        return total;
    });
    console.log('Answer is', totals.reduce((sum, nr) => { return sum + nr }, 0)); // 9029931401920 <- correct answer
}
processInput();

