const fs = require('fs');
let input = fs.readFileSync("day-5.data.txt", "utf8").trim();
const processInput = (input) => {
    input = input.replaceAll('\r', '').split(/\n{2}/).filter(v => v);
    const ranges = input[0].split('\n').filter(v => v).map((v) => {
        const parts = v.split('-').filter(v => v);
        return {
            start: +parts[0],
            end: +parts[1],
        }
    });
    return {ranges, ids: input[1].split('\n').map(v => +v).filter(v => v !== undefined)}
}
const data = processInput(input);
const checkIdInRange = (id) => {
    let i;
    for (i = 0; i < data.ranges.length; i++) {
        if (id >= data.ranges[i].start && id <= data.ranges[i].end) {
            return true;
        }
    }
}
const run = () => {
    const freshIngredients = data.ids.filter(checkIdInRange);
    console.log(freshIngredients.length, ' ingredients are fresh'); // 643 <- right answer
}
run()
