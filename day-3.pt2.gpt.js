// Advent of Code - Day 3, Part Two
// Using ONLY the sample input given in the description.

const fs = require('fs');

let input = fs.readFileSync("day-3.data.txt", "utf8").trim().replaceAll('\r', '').split('\n');

const PICK_DIGITS = 12;

/**
 * Return the lexicographically largest subsequence of length `pick`
 * from the digit-string `line`, preserving order.
 */
function maxJoltageForBank(line, pick = PICK_DIGITS) {
    const n = line.length;
    if (pick > n) {
        throw new Error(`Cannot pick ${pick} digits from only ${n} digits.`);
    }

    let toRemove = n - pick; // how many digits we must remove
    const stack = [];

    for (let i = 0; i < n; i++) {
        const d = line[i];

        // While we still can remove digits and the last digit in the stack
        // is smaller than the current digit, pop it to make the number larger.
        while (toRemove > 0 && stack.length > 0 && stack[stack.length - 1] < d) {
            stack.pop();
            toRemove--;
        }

        stack.push(d);
    }

    // If we still have digits to remove (e.g. string is non-increasing),
    // remove them from the end.
    while (toRemove > 0) {
        stack.pop();
        toRemove--;
    }

    // Take only the first `pick` digits (stack might be longer in some cases).
    return stack.slice(0, pick).join('');
}

// Compute per-bank maximum joltages and the total.
let total = 0n;
const results = input.map((line) => {
    const bestStr = maxJoltageForBank(line, PICK_DIGITS);
    const bestVal = BigInt(bestStr);
    total += bestVal;
    return { line, bestStr, bestVal };
});

// Output for validation
for (const r of results) {
    console.log(`Bank: ${r.line}`);
    console.log(`  Best 12-digit joltage: ${r.bestStr} (${r.bestVal})`);
}
console.log('---');
console.log('Total output joltage:', total.toString());
// 45160423406761
