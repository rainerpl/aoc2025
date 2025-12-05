// Advent of Code - Day 5: Cafeteria (Part 1)
// Run with: node solve.js < input.txt

const fs = require("fs");
const input = fs.readFileSync('day-5.data.txt', "utf8").trimEnd();
const [rangesPart, idsPart] = input.split(/\r?\n\r?\n/);
const ranges = rangesPart
    .split(/\r?\n/)
    .filter(Boolean)
    .map(line => {
        const [start, end] = line.split("-").map(Number);
        return [start, end];
    });
const ids = idsPart
    .split(/\r?\n/)
    .filter(Boolean)
    .map(Number);
function isFresh(id, ranges) {
    return ranges.some(([start, end]) => id >= start && id <= end);
}
let freshCount = 0;
for (const id of ids) {
    if (isFresh(id, ranges)) {
        freshCount++;
    }
}
console.log(freshCount);
