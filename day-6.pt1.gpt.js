// Advent of Code 2025 - Day 6: Trash Compactor (Part 1)
// Run with: node solve.js < input.txt

const fs = require("fs");

// Read everything from stdin, normalize line endings, but keep spaces
const raw = fs.readFileSync('day-6.data.txt', "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trimEnd();

const lines = raw.split("\n");
const height = lines.length;
const width = Math.max(...lines.map(l => l.length));

// Pad all lines to equal width so we can index by column safely
const grid = lines.map(l => l.padEnd(width, " "));

// Find contiguous column blocks (each is one problem)
const blocks = [];
let col = 0;

while (col < width) {
    // Is this column completely empty (all spaces)?
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

    // Start of a block
    const start = col;
    while (col < width) {
        let isSpaceCol = true;
        for (let r = 0; r < height; r++) {
            if (grid[r][col] !== " ") {
                isSpaceCol = false;
                break;
            }
        }
        if (isSpaceCol) break; // end of block
        col++;
    }
    const end = col - 1;
    blocks.push([start, end]);
}

// Evaluate each block
let grandTotal = 0n;

for (const [start, end] of blocks) {
    const nums = [];

    // All rows except last: numbers
    for (let r = 0; r < height - 1; r++) {
        const slice = grid[r].slice(start, end + 1);
        const m = slice.match(/\d+/);
        if (m) {
            nums.push(BigInt(m[0]));
        }
    }

    // Last row: operation (+ or *)
    const opSlice = grid[height - 1].slice(start, end + 1);
    const opMatch = opSlice.match(/[+*]/);
    if (!opMatch) continue; // or throw if you want strictness
    const op = opMatch[0];

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
