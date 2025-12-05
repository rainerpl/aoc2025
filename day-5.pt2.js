const fs = require('fs');
let input = fs.readFileSync("day-5.data.txt", "utf8").trim();

const processInput = (input) => {
    input = input.replaceAll('\r', '').split(/\n{2}/).filter(v => v);
    const ranges = input[0].split('\n').filter(v => v).map((v) => {
        const parts = v.split('-').filter(v => v);
        return {
            start: +parts[0],
            end: +parts[1],
            dist: (parts[1]) - (parts[0]),
        }
    });
    return ranges.sort((r1, r2) => {
        return r1.dist > r2.dist ? -1 : 1;
    });
}
const countedRanges = [];
const resolveOverlap = (range) => {
    let i;
    for (i = 0; i < countedRanges.length; i++) {
        const r = countedRanges[i];
        if (range.start >= r.start && range.end <= r.end) {
            range.start = 0;
            range.end = 0;
            return;
        } else if (range.start >= r.start && range.start <= r.end && range.end > r.end) {
            range.start = r.end + 1;
        } else if (range.start < r.start && range.end >= r.start && range.end <= r.end) {
            range.end = r.start - 1;
        }
    }
    countedRanges.push(range);
}
const run = () => {
    const ranges = processInput(input);
    let total = 0;
    let i;
    for (i = 0; i < ranges.length; i++) {
        resolveOverlap(ranges[i])
    }
    ranges.filter(r => (!(!r.start && !r.end))).forEach((range) => {
        total += (range.end - range.start) + 1;
    })
    console.log('Total fresh ingredients:', total); // 342018167474526 <- right answer
}
run()
