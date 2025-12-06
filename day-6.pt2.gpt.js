const fs = require("fs");
const raw = fs.readFileSync('day-6.data.txt', "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trimEnd();

const lines = raw.split("\n");
const height = lines.length;
const width = Math.max(...lines.map(l => l.length));

const grid = lines.map(l => l.padEnd(width, " "));

const blocks = [];
let col = 0;

while (col < width) {
    let emptyCol = true;
    for (let r = 0; r < height; r++) {
        if (grid[r][col] !== " ") {
            emptyCol = false;
            break;
        }
    }
    if (emptyCol) {
        col++;
        continue;
    }
    const start = col;
    while (col < width) {
        let isSpaceCol = true;
        for (let r = 0; r < height; r++) {
            if (grid[r][col] !== " ") {
                isSpaceCol = false;
                break;
            }
        }
        if (isSpaceCol) break; // end of this problem block
        col++;
    }
    const end = col - 1;
    blocks.push([start, end]);
}
let grandTotal = 0n;

for (const [start, end] of blocks) {
    const opSlice = grid[height - 1].slice(start, end + 1);
    const opMatch = opSlice.match(/[+*]/);
    if (!opMatch) continue; // or throw if you want strictness
    const op = opMatch[0];
    const nums = [];
    for (let c = end; c >= start; c--) {
        let digits = "";
        for (let r = 0; r < height - 1; r++) {
            const ch = grid[r][c];
            if (ch >= "0" && ch <= "9") {
                digits += ch;
            }
        }
        if (digits.length > 0) {
            nums.push(BigInt(digits));
        }
    }
    let value;
    if (op === "+") {
        value = 0n;
        for (const n of nums) value += n;
    } else {
        value = 1n;
        for (const n of nums) value *= n;
    }
    grandTotal += value;
}
console.log(grandTotal.toString());
