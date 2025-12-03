// save as solve-day3.js (for example)
// usage: node solve-day3.js path/to/input.txt

const fs = require("fs");
const path = require("path");

function maxTwoDigitFromLine(line) {
    const digits = line.trim().split("").map(ch => parseInt(ch, 10));
    const n = digits.length;
    let maxVal = -1; // track best 2-digit number (0..99)

    // brute force: try all pairs (i < j), preserving order
    for (let i = 0; i < n; i++) {
        const tens = digits[i];
        if (Number.isNaN(tens)) continue;

        for (let j = i + 1; j < n; j++) {
            const ones = digits[j];
            if (Number.isNaN(ones)) continue;

            const val = tens * 10 + ones;
            if (val > maxVal) {
                maxVal = val;
            }
        }
    }

    // if line is malformed or too short, maxVal could stay -1
    if (maxVal < 0) {
        throw new Error(`Could not form any 2-digit number from line: "${line}"`);
    }

    return maxVal;
}

function main() {
    const raw = fs.readFileSync("day-3.data.txt", "utf8").trim();

    const lines = raw
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l.length > 0);

    let total = 0;
    for (const line of lines) {
        const maxForLine = maxTwoDigitFromLine(line);
        total += maxForLine;
    }

    console.log("Total output joltage:", total);
}

main();
