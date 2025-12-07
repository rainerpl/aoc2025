const fs = require("fs");
const raw = fs.readFileSync('day-7.data.txt', "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trimEnd();
const lines = raw.split("\n");
const H = lines.length;
const W = Math.max(...lines.map(l => l.length));

const grid = lines.map(l => l.padEnd(W, "."));
let startRow = -1;
let startCol = -1;
for (let r = 0; r < H; r++) {
    const idx = grid[r].indexOf("S");
    if (idx !== -1) {
        startRow = r;
        startCol = idx;
        break;
    }
}

const dp = Array.from({ length: H }, () => Array(W).fill(0n));

if (startRow + 1 < H) {
    dp[startRow + 1][startCol] = 1n;
}
for (let r = startRow + 1; r < H - 1; r++) {
    for (let c = 0; c < W; c++) {
        const count = dp[r][c];
        if (count === 0n) continue;
        const cell = grid[r][c];
        if (cell === "^") {
            const nr = r + 1;
            if (c - 1 >= 0) dp[nr][c - 1] += count;
            if (c + 1 < W) dp[nr][c + 1] += count;
        } else {
            const nr = r + 1;
            dp[nr][c] += count;
        }
    }
}
let totalTimelines = 0n;
const lastRow = H - 1;
for (let c = 0; c < W; c++) {
    const count = dp[lastRow][c];
    if (count === 0n) continue;
    const cell = grid[lastRow][c];
    if (cell === "^") {
        totalTimelines += count * 2n;
    } else {
        totalTimelines += count;
    }
}
console.log(totalTimelines.toString());
