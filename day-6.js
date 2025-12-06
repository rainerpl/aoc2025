const fs = require('fs');
let input = fs.readFileSync("day-6.data.txt", "utf8").trim();
const processInput = () => {
    input = input.replaceAll('\r', '').split(/\n/).filter(v => v);
    const data = {rows: [], cols: [], operators: []}
    const firstRow = input[0].split(/ +/).filter(v => v);
    firstRow.forEach((row) => {
        data.cols.push([]);
    });
    input.forEach((rowStr, index) => {
        let rowStrArray = rowStr.split(/ +/).filter(v => v);

        if (isNaN(Number(rowStrArray[0]))) {
            rowStrArray.forEach((operator, colIndex) => {
                data.operators.push(operator);
            });
        } else {
            const row = rowStrArray.map(v => +v);
            data.rows.push(row);
            row.forEach((operator, colIndex) => {
                data.cols[colIndex].push(operator);
            });
        }
    });
    return data;
}
const calc = (n1, n2, operator) => {
    switch (operator) {
        case '+': return n1 + n2;
        case '-': return n1 - n2;
        case '*': return n1 * n2;
        case '/': return n1 / n2;
    }
}
const run = () => {
    const data = processInput();
    const results = data.cols.map((col, colIndex) => {
        const operator = data.operators[colIndex];
        const column = col.slice();
        let total = column.shift();
        let num = column.shift();
        while (num !== undefined) {
            total = calc(total, num, operator);
            num = column.shift();
        }
        return total;
    });
    const totalSum = results.reduce((sum, val) => sum + val, 0);
    console.log('Answer:', totalSum); // 4693419406682 <- right answer
}

run();
