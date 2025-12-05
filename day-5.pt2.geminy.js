const fs = require('fs');

/**
 * Solves Part Two of the Cafeteria puzzle.
 * @param {string} input - The raw string content of the input file.
 * @returns {number} - The total count of fresh ingredient IDs.
 */
function solvePartTwo(input) {
    // Split the input into two sections based on the double newline.
    // Part Two only concerns the first section (the ranges).
    const sections = input.trim().split('\n\n');
    const rangesPart = sections[0];

    // Parse the lines into range objects { start, end }
    const ranges = rangesPart
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            const [start, end] = line.split('-').map(Number);
            return { start, end };
        });

    // Sort ranges by their start position to facilitate merging
    ranges.sort((a, b) => a.start - b.start);

    // Merge overlapping intervals
    const mergedRanges = [];

    for (const range of ranges) {
        if (mergedRanges.length === 0) {
            mergedRanges.push(range);
        } else {
            const lastRange = mergedRanges[mergedRanges.length - 1];

            // Check for overlap
            // Since the list is sorted by start, we only need to check if
            // the current range starts before (or exactly when) the last one ends.
            if (range.start <= lastRange.end) {
                // There is an overlap, merge them by extending the end of the last range
                lastRange.end = Math.max(lastRange.end, range.end);
            } else {
                // No overlap, push the current range as a new entry
                mergedRanges.push(range);
            }
        }
    }

    // Calculate the total number of IDs covered by the merged ranges
    let totalFreshCount = 0;
    for (const range of mergedRanges) {
        // Since ranges are inclusive, the count is end - start + 1
        totalFreshCount += (range.end - range.start + 1);
    }

    return totalFreshCount;
}

// --- Execution ---

try {
    // Read input from 'input.txt'
    const input = fs.readFileSync('day-5.data.txt', 'utf8');
    const result = solvePartTwo(input);

    console.log(`Total fresh ingredient IDs: ${result}`);
} catch (err) {
    if (err.code === 'ENOENT') {
        console.error("Error: 'input.txt' not found. Please create the file with your puzzle input.");
    } else {
        console.error("An error occurred:", err);
    }
}
