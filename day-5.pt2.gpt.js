// Advent of Code - Day 5: Cafeteria (Part 2)
// Run with: node solve2.js < input.txt

const fs = require("fs");
const input = fs.readFileSync('day-5.data.txt', "utf8").trimEnd();

// Only the first section (before blank line) matters
const [rangesPart] = input.split(/\r?\n\r?\n/);

// Parse ranges: "a-b" → [a, b]
const ranges = rangesPart
    .split(/\r?\n/)
    .filter(Boolean)
    .map(line => line.split("-").map(Number));

// Sort ranges by start
ranges.sort((a, b) => a[0] - b[0]);

// Merge overlapping or adjacent ranges
const merged = [];
for (const [start, end] of ranges) {
    if (!merged.length) {
        merged.push([start, end]);
        continue;
    }

    const last = merged[merged.length - 1];

    if (start <= last[1] + 1) {
        // Overlapping or touching → merge
        last[1] = Math.max(last[1], end);
    } else {
        // Disjoint → new range
        merged.push([start, end]);
    }
}

// Count how many integers are covered
let totalFresh = 0;
for (const [start, end] of merged) {
    totalFresh += end - start + 1;
}

console.log(totalFresh);
