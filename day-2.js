import fs from "fs";

let input = fs.readFileSync("day-2.data.txt", "utf8");
// input = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';

const parseInput = () => {
    return input.split(',').map((input) => {
        const parts = input.split('-');
        return {
            start: parseInt( parts[0].trim(), 10),
            end: parseInt( parts[1].trim(), 10),
        };
    });
}
let answer = 0;
const testForRepetition = (number, numberStr) => {
    let patternLength = 1; // <- comment out for part 2
    let nrHalfLength = numberStr.length / 2;
    //let patternLength = nrHalfLength; <- uncomment for part 1
    while (patternLength <= nrHalfLength ) {
        if (numberStr.length % patternLength !== 0) {
            // pattern cant repeat exactly N times
            patternLength++;
            continue;
        }
        let isValidPattern = true;
        let patternDigitNr = 0;
        for (patternDigitNr = 0; patternDigitNr < patternLength; patternDigitNr++) {
            const patternDigit = numberStr[patternDigitNr];
            let checkingDigitNr = patternDigitNr + patternLength;
            while (true) {
                // all digits of the pattern must repeat till the end.
                if (patternDigit !== numberStr[checkingDigitNr]) {
                    isValidPattern = false;
                    break;
                }
                checkingDigitNr += patternLength;
                if (!numberStr[checkingDigitNr]) {
                    // digit checked till the end, all good
                    break;
                }
            }
            if (isValidPattern === false) {
                // no need to check the repetition of other digits
                break;
            }
        }
        if (isValidPattern) {
            answer += number;
            break;
        }
        patternLength++;
    }
}
const run = () => {
    const startTime = Date.now();
    const ranges = parseInput();
    let largestNumber = 0;
    ranges.forEach((range) => {
        if (range.end > largestNumber) {
            largestNumber = range.end;
        }
    });
    let i = 0;
    for (i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        for (let checkIndex = range.start; checkIndex <= range.end; checkIndex++) {
            testForRepetition(checkIndex, String(checkIndex))
        }
    }
    console.log('answer is', answer, 'time taken', Date.now() - startTime);
}
run();
