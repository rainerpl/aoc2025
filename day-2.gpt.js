const fs = require('fs');

// Read the entire input file as one line
// Adjust filename as needed
let input = fs.readFileSync("day-2.data.txt", "utf8").trim();

/**
 * Checks if a number is of the form XX
 * (string repeated twice).
 */
function isDoublePattern(n) {
    const s = String(n);
    const len = s.length;
    if (len % 2 !== 0) return false; // must be even length

    const half = len / 2;
    const first = s.slice(0, half);
    const second = s.slice(half);
    return first === second;
}

let total = 0;

// Split by commas, ignore empty trailing piece if any
for (const part of input.split(',')) {
    const piece = part.trim();
    if (!piece) continue;

    const [startStr, endStr] = piece.split('-');
    const start = Number(startStr);
    const end = Number(endStr);

    for (let id = start; id <= end; id++) {
        if (isDoublePattern(id)) {
            total += id;
        }
    }
}

console.log('Sum of invalid IDs:', total);
